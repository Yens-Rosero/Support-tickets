
# basic-usage-python 🚀

It is a rest API in nodeJS with express that I created to add user tickets to report technical or support failures, add this to a mongo database, along with a group of images that will be the evidence of the failure, along with that also start a flow in Camunda to handle the issue of notices with mail and allocation of these same , also added a feature so that when there is a ticket, add this by means of a bot discord  ✨🌟


## Features 🌟

-Ticket Registration: Allows users to register new tickets by providing information such as user name, company, email, number, ticket type, subject and fault description.

-Fault Image Management: Allows images describing the fault to be attached. These images can be encoded in base64 and then decoded and saved as files on the server.

-Ticket Submission: After registering a new ticket, you can automatically send the ticket information through some means, such as a notification system or a bot, for further management.

-HTTP Responses: Handles different HTTP responses to indicate success or failure of the ticket registration process, using status codes such as 201 for success and 500 for internal server errors.

-Error Handling: Implements error handling to catch any exceptions that occur during the ticket registration process and returns appropriate error messages to inform the user of potential problems.

-Database Storage: Uses some database to store logged tickets, which allows retrieval and management of stored tickets at a later time.

-Data Validation: Performs validations of the data provided by the user to ensure that it is in the correct format and meets the necessary requirements before registering the ticket.
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`BOTTOKEN` : Discord bot requirement

`BOTCLIENTID` : Discord bot requirement

`BOTSUPPORTCHANNELNAME` : Discord bot requirement

`MONGO_URI` : URI MONGO

