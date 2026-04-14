# QCS Backend API - Quick Start Guide

## 🚀 Getting Started with Swagger Docs

Your QCS Backend API now has **full Swagger documentation** with an interactive UI!

### Access the Documentation

```
http://localhost:3000/api-docs
```

## 📚 What's Documented

### ✅ All Routes Documented

- **15+ routes for Web API** (`/api/v1/web`)
- **11+ routes for Mobile API** (`/api/v1/mobile`)
- Full CRUD operations for: Users, Bikers, Orders, Senders, Cities, Suburbs, Prices

### 🎯 Interactive Features

- **Try It Out**: Make real requests from the browser
- **Schema Inspector**: View request/response structures
- **Authentication**: Built-in JWT Bearer token support
- **Error Codes**: See all possible responses documented

## 📋 Complete Endpoint List

### Web Routes

#### Users

- `POST /api/v1/web/users/login` - Login
- `POST /api/v1/web/users/signUp` - Register
- `PATCH /api/v1/web/users/{id}` - Update user
- `GET /api/v1/web/users/logout` - Logout
- `DELETE /api/v1/web/users/{id}` - Delete user
- `GET /api/v1/web/users/{location}` - Get users by location
- `POST /api/v1/web/users/forget-password` - Request password reset
- `GET /api/v1/web/users/{token}/verify/{email}` - Verify reset token
- `PATCH /api/v1/web/users/{email}/reset-password` - Reset password

#### Bikers (Web)

- `PATCH /api/v1/web/bikers/pickUp` - Mark package picked up
- `PATCH /api/v1/web/bikers/delivery` - Mark package delivered
- `GET /api/v1/web/bikers/pickUp/{id}` - Get pending pickups
- `POST /api/v1/web/bikers/shares` - Create biker shares

#### Orders (Web)

- `POST /api/v1/web/orders` - Create order
- `GET /api/v1/web/orders` - Get all orders
- `DELETE /api/v1/web/orders/{code}` - Delete order
- `GET /api/v1/web/orders/status/{status}/location/{location}` - Filter by status
- `GET /api/v1/web/orders/package/{id}` - Get single package
- `DELETE /api/v1/web/orders/package/{id}` - Delete package
- `PATCH /api/v1/web/orders/package/bulk` - Bulk update packages
- `PATCH /api/v1/web/orders/package/{id}` - Update package
- `GET /api/v1/web/orders/analytics/{location}` - Get analytics

#### Senders (Web)

- `POST /api/v1/web/senders/login` - Sender login
- `POST /api/v1/web/senders/verify-otp` - Verify OTP
- `POST /api/v1/web/senders` - Register sender
- `GET /api/v1/web/senders/{senderId}/receivers` - Get receivers
- `GET /api/v1/web/senders/{senderId}/packages` - Get packages
- `PATCH /api/v1/web/senders/{id}` - Update sender
- `GET /api/v1/web/senders` - Get all senders
- `DELETE /api/v1/web/senders/{id}` - Delete sender
- `GET /api/v1/web/senders/{id}` - Get single sender

#### Cities (Web)

- `POST /api/v1/web/cities` - Create city
- `PATCH /api/v1/web/cities/{id}` - Update city
- `GET /api/v1/web/cities` - Get all cities
- `GET /api/v1/web/cities/{id}` - Get single city
- `DELETE /api/v1/web/cities/city/{id}` - Delete city

#### Suburbs (Web)

- `GET /api/v1/web/suburb/{cityId}/suburbs` - Get city suburbs
- `POST /api/v1/web/suburb/suburb` - Create suburb
- `PATCH /api/v1/web/suburb/destination/{id}` - Update suburb city
- `DELETE /api/v1/web/suburb/suburb/{id}` - Delete suburb
- `PATCH /api/v1/web/suburb/suburb/{id}` - Update suburb
- `GET /api/v1/web/suburb/suburb/{id}` - Get single suburb

#### Prices (Web)

- `POST /api/v1/web/price` - Create price
- `POST /api/v1/web/price/bulk` - Create multiple prices
- `GET /api/v1/web/price/city/{cityId}/destination/{destinationId}` - Get price
- `GET /api/v1/web/price` - Get all prices
- `GET /api/v1/web/price/{location}` - Get prices by location
- `PATCH /api/v1/web/price/{id}` - Update price
- `DELETE /api/v1/web/price/{id}` - Delete price

### Mobile Routes

#### Mobile Bikers

- `POST /api/v1/mobile/biker/register` - Register biker
- `GET /api/v1/mobile/biker` - Get all bikers
- `GET /api/v1/mobile/biker/{id}` - Get single biker
- `PATCH /api/v1/mobile/biker/{id}` - Update biker
- `DELETE /api/v1/mobile/biker/{id}` - Delete biker
- `GET /api/v1/mobile/biker/{id}/pickups` - Get pending pickups
- `GET /api/v1/mobile/biker/{id}/deliveries` - Get pending deliveries
- `GET /api/v1/mobile/biker/{id}/completed-deliveries` - Get completed deliveries
- `GET /api/v1/mobile/biker/{id}/completed-pickups` - Get completed pickups
- `POST /api/v1/mobile/biker/shares` - Create shares

#### Mobile Orders

- `POST /api/v1/mobile/orders` - Create order
- `GET /api/v1/mobile/orders` - Get all orders
- `PATCH /api/v1/mobile/orders/{senderId}` - Update orders
- `DELETE /api/v1/mobile/orders/{code}` - Delete order
- `GET /api/v1/mobile/orders/{orderCode}` - Get order by code
- `GET /api/v1/mobile/orders/{senderId}/order` - Get sender orders
- `PATCH /api/v1/mobile/orders/package/{id}/processing` - Mark as processing
- `PATCH /api/v1/mobile/orders/package/{id}/receiving` - Mark as receiving
- `PATCH /api/v1/mobile/orders/package/{id}` - Update package
- `GET /api/v1/mobile/orders/package/{id}` - Get package
- `PATCH /api/v1/mobile/orders/package/{id}/returning` - Mark as returning
- `GET /api/v1/mobile/orders/status/{status}` - Get by status
- `PATCH /api/v1/mobile/orders/package/{id}/cancelling` - Mark as cancelled

#### Mobile Senders

- `POST /api/v1/mobile/sender/login` - Sender login
- `POST /api/v1/mobile/sender/verify-otp` - Verify OTP
- `POST /api/v1/mobile/sender` - Register sender
- `GET /api/v1/mobile/sender/{senderId}/receivers` - Get receivers
- `GET /api/v1/mobile/sender/{senderId}/packages` - Get packages
- `PATCH /api/v1/mobile/sender/{id}` - Update sender
- `GET /api/v1/mobile/sender/{telephone}/request-otp` - Request OTP
- `POST /api/v1/mobile/sender/verify-password-otp` - Verify password OTP
- `PATCH /api/v1/mobile/sender/{telephone}/reset-password` - Reset password

#### Mobile Cities

- `GET /api/v1/mobile/city/{cityId}/suburbs` - Get suburbs
- `GET /api/v1/mobile/city` - Get all cities

#### Mobile Prices

- `GET /api/v1/mobile/prices/city/{cityId}/destination/{destinationId}` - Get price
- `GET /api/v1/mobile/prices` - Get all prices

#### Mobile Time

- `GET /api/v1/mobile/time` - Get server time

## 🔐 Using Authentication

### Step 1: Get a Token

Login using one of the login endpoints:

```
POST /api/v1/web/users/login
```

Response will contain your authentication token.

### Step 2: Authorize in Swagger UI

1. Click the **Authorize** button (🔒) in the top-right corner
2. Enter: `Bearer <your_token_here>`
3. Click **Authorize**

Now all your requests will automatically include authentication!

## 💡 Tips

- **Bookmark `/api-docs`** for quick access during development
- **Use the "Try It Out" button** to make test requests directly from docs
- **Check response examples** to understand data formats
- **View error responses** to handle edge cases
- **Reference the schemas** when building frontend requests

## 📝 Adding New Endpoints

When creating new routes, add JSDoc comments:

```javascript
/**
 * @swagger
 * /api/v1/web/your-endpoint:
 *   get:
 *     summary: Your endpoint summary
 *     tags: [YourTag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success response description
 */
router.get("/:id", controller.yourHandler);
```

The documentation will automatically update!

---

**Swagger installed successfully!** 🎉

- Swagger UI: `http://localhost:3000/api-docs`
- Configuration: `/src/utils/swaggerConfig.js`
- Documentation guide: `SWAGGER_DOCS.md`
