const Ticket = require("../models/ticketModel");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid"); // Import uuid to generate unique names
const { sendTicket } = require("../bot/components/ticketManagements/ticketManagement");

const createTicket = async (req, res) => {
  try {
    // Extract data from the request body
    const { username, company, email, number, type, subject, description, files } = req.body;

    // Check if base64 encoded images are attached
    let ticketFiles = [];
    if (files && files.length > 0) {
      // Decode and save images as files on the server
      files.forEach((base64String, index) => {
        const filename = `${uuidv4()}.png`; // Generate a unique file name
        const binaryData = Buffer.from(base64String, "base64"); // Decode base64 string to binary data
        const imagePath = `uploads/${filename}`; // Path where the image will be saved on the server
        fs.writeFileSync(imagePath, binaryData);
        ticketFiles.push(imagePath);
      });
    }

    // Create a new instance of Ticket using request data
    const newTicket = new Ticket({
      username,
      company,
      email,
      number,
      type,
      subject,
      description,
      files: ticketFiles,
    });

    // Save the ticket to the database
    const savedTicket = await newTicket.save();

    
    if (savedTicket) {
      sendTicket({
        ticket: savedTicket,
        files,
        ticketid: savedTicket._id.toString()
      });

      res.status(201).json(savedTicket);
    } else {
      res
        .status(500)
        .json({ error: "Error saving ticket to database" });
    }

    // Respond with the created ticket
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createTicket,
};
