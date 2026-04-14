# QCS Backend API Documentation

## Swagger Documentation Setup

This project now includes comprehensive API documentation using Swagger (OpenAPI 3.0). All endpoints are fully documented and accessible through the Swagger UI.

### Accessing Swagger UI

Once the server is running, you can access the interactive API documentation at:

```
http://localhost:3000/api-docs
```

### Features

- **Interactive API Explorer**: Browse all available endpoints
- **Try It Out**: Make test requests directly from the documentation
- **Request/Response Schemas**: View the data types and structure for each endpoint
- **Authentication**: Support for Bearer Token (JWT) authentication testing
- **Multiple Server Environments**: Easily switch between development and production servers

### API Structure

The API is organized into the following main sections:

#### Web Routes (`/api/v1/web`)

- **Users** - User management, login, signup, password reset
- **Bikers** - Biker operations, pickups, deliveries
- **Orders** - Order creation, status tracking, package management
- **Senders** - Sender registration and management
- **Cities** - City management
- **Suburbs** - Suburb management within cities
- **Prices** - Delivery price management

#### Mobile Routes (`/api/v1/mobile`)

- **Mobile - Bikers** - Biker operations for mobile app
- **Mobile - Orders** - Order tracking and management for mobile
- **Mobile - Senders** - Sender auth and package management
- **Mobile - Cities** - City browsing
- **Mobile - Prices** - Price lookup
- **Mobile - Time** - Server time synchronization

### Authentication

Most endpoints support JWT Bearer Token authentication. To test authenticated endpoints:

1. Obtain a token by logging in through the `/login` endpoint
2. Click the "Authorize" button in the Swagger UI (top right)
3. Enter the token in the format: `Bearer <your_token_here>`
4. All subsequent requests will include the token automatically

### Common Response Codes

- **200**: Successful GET or PATCH request
- **201**: Successful POST request (resource created)
- **400**: Bad request or validation error
- **401**: Unauthorized - missing or invalid authentication
- **404**: Resource not found
- **500**: Server error

### Request Examples

#### User Login

```bash
curl -X POST http://localhost:3000/api/v1/web/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

#### Create Order

```bash
curl -X POST http://localhost:3000/api/v1/web/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token>" \
  -d '{...order data...}'
```

#### Get All Bikers

```bash
curl -X GET http://localhost:3000/api/v1/mobile/biker
```

### Troubleshooting Swagger

If Swagger UI doesn't load:

1. **Clear browser cache** - Swagger may cache old versions
2. **Check server logs** - Look for any errors when the server starts
3. **Verify routes are loaded** - Ensure all route files have JSDoc comments
4. **Check SwaggerConfig** - Review `/src/utils/swaggerConfig.js`

### Documentation Standards

All new endpoints must include JSDoc comments in the following format:

```javascript
/**
 * @swagger
 * /api/v1/web/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/", controller.getAllUsers);
```

### Updating Documentation

When you add new endpoints:

1. Add JSDoc comments with `@swagger` tags following OpenAPI 3.0 format
2. Include proper tags for categorization
3. Document request parameters, request bodies, and responses
4. Include examples when helpful
5. Restart the server - documentation auto-generates from comments

### API Schema Definitions

Common schemas are defined in `/src/utils/swaggerConfig.js`:

- **User** - User account information
- **Biker** - Biker profile and details
- **Sender** - Sender information
- **Order** - Order details and status
- **City** - City information
- **Price** - Delivery pricing information
- **Error** - Standard error response

### Further Reading

- [OpenAPI 3.0 Specification](https://spec.openapis.org/oas/v3.0.3)
- [Swagger JSDoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [Swagger UI Documentation](https://github.com/swagger-api/swagger-ui)
