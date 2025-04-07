````
# Chat Application Setup

This document outlines the steps to set up and run the Chat Application, which consists of a React JS frontend and a Nest JS backend.

## Prerequisites

- Node.js (v19.8.1 or later)
- npm (Node Package Manager)
- PostgreSQL

## React JS (Frontend)

1.  **Installation:**
    Navigate to the React JS project directory in your terminal and execute the following command:

    ```bash
    npm install
    ```

    This command installs all the necessary dependencies for the React application.

2.  **Running the Application:**
    After the installation is complete, execute the following command to start the development server:

    ```bash
    npm run dev
    ```

    The UI should start running on `http://localhost:5173/`. Open this URL in your web browser to access the application.

3.  **Login Instructions:**
    - To test the chat application with multiple users, open two browser windows.
    - In the first window (normal browser), log in using the email `ninad@gmail.com`.
    - In the second window (incognito browser or a different browser), log in using the email `ajay@gmail.com`.
    - These are two hardcoded users for testing purposes.

## Nest JS (Backend)

1.  **Environment Configuration:**

    - Locate the `.env` file in the root directory of the Nest JS project.
    - Ensure that the file contains the correct details for your local PostgreSQL database.
    - Specifically, verify the database name, username, password, host, and port.
    - Add the following data to the `.env` file:

    ```
    POSTGRES_HOST=127.0.0.1
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=root
    POSTGRES_DATABASE=chatapp
    PORT=5000
    MODE=DEV
    RUN_MIGRATIONS=true
    ```

2.  **Database Setup:**

    - Create a PostgreSQL database named `chatapp`.
    - If you choose a different database name, make sure to update the `POSTGRES_DATABASE` configuration variables in the `.env` file accordingly.

3.  **Installation:**
    Navigate to the Nest JS project directory in your terminal and execute the following command:

    ```bash
    npm install
    ```

    This command installs all the necessary dependencies for the Nest application.

4.  **Running the Application:**
    After the installation is complete, execute the following command to start the Nest JS server:

    ```bash
    npm run start
    ```

    The Nest JS backend will start running and be ready to handle API requests from the React JS frontend. The default port for this application is 5000 and can be changed using `.env` file.
````
