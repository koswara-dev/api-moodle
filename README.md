# Moodle API Integration with Express.js

This project demonstrates how to integrate the Moodle API using Express.js along with environment variables managed through dotenv.

## Introduction

This project is a simple example of integrating Moodle’s API using the Express.js framework. `dotenv` is utilized for managing sensitive environment variables such as API keys and database credentials.

## Features

- Connect to Moodle API
- Fetch data from Moodle
- Environment-based configuration using dotenv
- Basic routing setup

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/koswara-dev/api-moodle.git
   cd api-moodle
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   MOODLE_API_URL=https://your-moodle-instance/webservice/rest/server.php
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   PORT=3000
   TOKEN=your_token_api_moodle
   ```

## Usage

1. Run the application:
   ```bash
   npm start
   ```
2. The server should be running at `http://localhost:3000`.

## API Endpoints

### Get Course Details
Fetch details of a specific course.

- **URL:** `/grades?courseid={id}`
- **Method:** `GET`
- **URL Params:**
  - `id=[integer]` - ID of the course
- **Success Response:**
  - **Code:** 200
  - **Content:** `{ {...} }`
- **Error Response:**
  - **Code:** 404 OR 500
  - **Content:** `{"error": "Error message"}`

### Example Request:

```bash
curl http://localhost:3000/grades?courseid=123
```

### Example Response:

```json
{
  "userid": 12,
  "userfullname": "Sample user",
  "useridnumber": "123xx",
  "grade": 100,
  "status": "Lulus"
}
```

## Buy me a coffe

If you like this project and want to support its further development, buy me a coffee!

[![Buy Me a Coffee](https://www.buymeacoffee.com/assets/img/guidelines/download-assets-sm-1.svg)](https://www.buymeacoffee.com/kudajengke404)
