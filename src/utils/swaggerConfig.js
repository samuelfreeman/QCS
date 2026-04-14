import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "QCS Backend API",
      version: "1.0.0",
      description:
        "API documentation for QCS (Quick Courier Service) Backend - Delivery Management System",
      contact: {
        name: "QCS Support",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
      {
        url: "https://api.example.com",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT token for authentication",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "User ID",
            },
            email: {
              type: "string",
              description: "User email",
            },
            password: {
              type: "string",
              description: "User password (hashed)",
            },
            location: {
              type: "string",
              description: "User location",
            },
          },
        },
        Biker: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Biker ID",
            },
            name: {
              type: "string",
              description: "Biker full name",
            },
            phone: {
              type: "string",
              description: "Biker contact number",
            },
            location: {
              type: "string",
              description: "Biker location",
            },
          },
        },
        Sender: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Sender ID",
            },
            name: {
              type: "string",
              description: "Sender name",
            },
            phone: {
              type: "string",
              description: "Sender phone number",
            },
            location: {
              type: "string",
              description: "Sender location",
            },
          },
        },
        Order: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Order ID",
            },
            code: {
              type: "string",
              description: "Order code",
            },
            senderId: {
              type: "string",
              description: "ID of the sender",
            },
            status: {
              type: "string",
              enum: [
                "pending",
                "processing",
                "in-transit",
                "delivered",
                "cancelled",
              ],
              description: "Order status",
            },
            location: {
              type: "string",
              description: "Order location",
            },
          },
        },
        City: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "City ID",
            },
            name: {
              type: "string",
              description: "City name",
            },
            region: {
              type: "string",
              description: "City region",
            },
          },
        },
        Price: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "Price ID",
            },
            cityId: {
              type: "string",
              description: "City ID",
            },
            destinationId: {
              type: "string",
              description: "Destination ID",
            },
            amount: {
              type: "number",
              description: "Delivery price amount",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            status: {
              type: "integer",
              description: "HTTP status code",
            },
            message: {
              type: "string",
              description: "Error message",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/v1/web/*.js", "./src/routes/v1/mobile/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
