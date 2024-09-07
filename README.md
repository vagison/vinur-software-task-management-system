This file describes the installation process of the Task Management System API for the test task at Vinur Software and provides instructions for using the API with Postman.
============================================================================================================================================================================

## Pre-installation Setup
1. Create a MongoDB cluster to serve as the database. In the .env file, assign the variables listed in .env.dist with your credentials.

## Installation
To install the API, follow these steps:
1. Clone the repository: ```git clone https://github.com/vagison/vinur-software-task-management-system.git```
2. Navigate to the project directory: ```cd vinur-software-task-management-system```
3. Install the dependencies: ```npm i```

## Running
To run the API, follow these steps:
1. To start the compiled application located in the dist directory using Node you have to run the following commands:

    ```npm run build```
   
    ```npm start```
2. Alternatively to run the app in the development mode with nodemon you have to run the following command: ```npm run dev```
3. To clean the dist directory, you can use the following command: ```npm run clean```

## Environment Configuration
Create a .env file in the root of the project using the variables from .env.dist, and configure the environment variables accordingly.

## API description
The root directory contains the src folder, where the entire codebase of the project is placed.

app.js is the entry point of the app. It starts the server, initiates the the database connection and more:

The folder structure of the project is self explanatory. Here's a brief introduction to it:
-------------------------------------------------------------------------------------------
* Config: Contains all configurations required for the database connection, CORS and other settings.
* Constants: Contains predefined values for error and success messages, as well as other constants.
* Controllers: Houses the actual implementations of server-side functions.
* Middlewares: Includes functions meant to be executed when Routes attempt to access Controllers. This also contains error-handling logic.
* Models: Defines the schemas for server-side entities.
* Routes: Represents server-side endpoints that expect calls from the client-side. Routes redirect these calls to Controllers through Middlewares.
* Utils: Serves as a folder to store helper functions, database initializing logic and more.

There are some files in the root directory apart from the src folder:
---------------------------------------------------------------------
* .babelrc.json - contains configuration settings for Babel, a JavaScript compiler that converts ES6+ code into a backward-compatible version of JavaScript that can run in older environments.
* .env.dist - serves as a template for environment variables, providing a sample configuration for the .env file.
* .eslintrc.json - contains configuration settings for ESLint, which is used to identify and fix problems in JavaScript code.
* .gitignore - used to exclude files from being pushed to the repository.
* package-lock.json - records the exact versions of packages and their dependencies that were installed, ensuring consistent installs across different environments.
* package.json - includes a list of the packages and their versions used for this project.


Server-side entities
---------------------
* Task

## Using API endpoints
To use the endpoints, you can visit the Postman URL below and then either fork or download the collection:

https://www.postman.com/grey-equinox-5383/workspace/vinur-software/collection/37208907-ce6ad439-d727-4213-a3a9-cd1334406565

The request names are self-explanatory, and any additional information can be found within the requests themselves.

Note that the local variable "BASE_URL" should be manually set in your Postman client (in Environments section) according to your usage (default is http://localhost:3000).