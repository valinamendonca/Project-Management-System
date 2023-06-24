# Project-Management-System Project Setup


## Prerequisites

Before setting up the project, ensure that you have the following prerequisites installed:

- Node.js (v18.13.0)
- Database software: MySQL


## Installation

1. Clone the repository, open cmd
   
` git clone  https://github.com/valinamendonca/project-management-system.git `

2. Open 2 terminals and navigate to client and server
   
` cd client `

` cd server `

3. Install the nodemodules in both the terminals
   
` npm i `


## Databases setup

1. Create a new mysql database
2. Locate the .env.example in the server directory, rename it to .env and update the database configuration variables.


## API Key Setup

1. Visit https://www.npmjs.com/package/nodemailer and create an account.
2. Update the API configuration variables in the .env file and save it.


# Starting the Application

To start the application, run the following command in both the terminals:

` npm start ` 


# Login Credentials
 
 Admin Dashboard
 - Username: "admin"
 - Password: "admin"

Employee and Project Manager
- can be created by the admin
- default password is demo