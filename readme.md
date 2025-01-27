
# HubSpot Technical Assessment - HTTP Service

This repository contains the implementation for the **HubSpot Technical Assessment**, demonstrating an HTTP service developed to meet specific requirements outlined for the evaluation. The service showcases advanced backend development, integration capabilities, and the use of efficient coding standards.

---

## Overview

The HTTP service is designed to:

- Handle HTTP requests efficiently with **Node.js** and **Express.js**.
- Integrate with HubSpot APIs for contact management functionality.
- Implement RESTful endpoints for seamless data retrieval and manipulation.
- Serve as a demonstration of scalable and maintainable backend development practices.

This project highlights Edward Orozco Pereira's proficiency in backend development, including API integration, data manipulation, and adherence to best practices.

---

## Features

- **RESTful Endpoints**: Built with Express.js for routing and request handling.
- **HubSpot API Integration**: Provides functionality to manage contacts in a CRM-like system.
- **Error Handling**: Includes mechanisms to gracefully handle errors and provide meaningful feedback.
- **Scalable Architecture**: Supports modular expansion and integration with other systems.

---

## Postman Collection

The following endpoints have been defined and tested using Postman:

1. **List Contacts**
   - **Method**: `GET`
   - **Endpoint**: `{{BASE_URL}}/contacts`
   - **Description**: Retrieves a list of contacts. Supports optional query parameters for pagination, filtering, and property selection.

2. **Create Contact**
   - **Method**: `POST`
   - **Endpoint**: `{{BASE_URL}}/contacts`
   - **Body**:
     ```json
     {
         "properties": {
             "email": "example@example.com",
             "firstname": "John",
             "lastname": "Doe",
             "phone": "123-456-7890"
         }
     }
     ```
   - **Description**: Creates a new contact with specified properties.

3. **Get Contact by Email**
   - **Method**: `GET`
   - **Endpoint**: `{{BASE_URL}}/contacts/:email`
   - **Description**: Retrieves a contact's details based on their email address. Supports optional query parameters for selecting specific properties.

Click [here](https://drive.google.com/file/d/1TeBC5lc5dj5q2aslDSbOTNnZT9mDZm59/view?usp=sharing) to download the Postman Collection.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EdwardOrozco/HubSpot_Technical_Assessment-HTTP_Service.git
   ```

2. Navigate to the project directory:

   ```bash
   cd HubSpot_Technical_Assessment-HTTP_Service
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory and add the necessary environment variables:

   ```env
   PORT=3000
   HUBSPOT_API_KEY=your_hubspot_api_key
   ```

2. Replace `your_hubspot_api_key` with a valid HubSpot API key.

---

## Running the Service

To start the service:

```bash
npm start
```

The service will run on `http://localhost:3000` by default (or the port specified in your `.env` file).

---

## Technologies Used

- **Node.js**: Backend runtime
- **Express.js**: HTTP server framework
- **Postman**: API testing and collection
- **HubSpot API**: CRM integration
- **dotenv**: Environment variable management

---

## About the Author

**Edward Orozco Pereira**  
- HubSpot Integration Engineer with expertise in backend development, API integration, and CRM solutions.
- Skilled in building scalable and robust technical solutions tailored to client needs.  
- [LinkedIn](https://www.linkedin.com/in/edwardorozcopereira/) | [Email](mailto:edwardorozco09@gmail.com)

---

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
