# QCS Backend API

#### Video Demo:  <https://youtu.be/8_kWdXfsMgw>

#### Description:

QCS Backend API is a scalable backend system built for the Quick Courier Service (QCS) platform, a logistics and delivery solution designed to support efficient courier operations in Ghana. This system powers both web and mobile clients by providing a robust set of RESTful APIs for managing users, bikers (couriers), orders, deliveries, pricing, and authentication workflows.

The goal of this project is to solve real-world logistics challenges by providing a centralized backend that enables seamless interaction between senders, administrators, and delivery personnel. The system is designed with scalability, maintainability, and security in mind, making it suitable for real-world deployment in a growing delivery ecosystem.

---

## Core Features

### User & Authentication System

The API provides full user management capabilities including:

* User registration and login
* Password reset via token verification
* Authentication and session handling
* Role-based operations (admin/web users and mobile users)

For senders, OTP-based authentication is implemented to enhance security and user experience.

---

### Courier (Biker) Management

The system manages bikers who are responsible for deliveries:

* Register and manage bikers
* Track pickup and delivery tasks
* View completed pickups and deliveries
* Assign and calculate biker shares (earnings)

---

### Order & Package Management

This is the core of the system:

* Create and manage delivery orders
* Track package status (processing, pickup, delivery, returning, cancelled)
* Bulk update packages
* Fetch analytics based on location
* Retrieve detailed package information

The system supports both web and mobile workflows, ensuring flexibility in operations.

---

### Location & Pricing System

To support delivery logistics:

* Cities and suburbs are managed dynamically
* Delivery prices are configurable per route (city → destination)
* Bulk price creation is supported for scalability

---

### Sender & Receiver Management

Senders can:

* Register and authenticate using OTP
* Manage receivers
* View their delivery history and packages

---

### Mobile & Web API Separation

The API is structured into two main modules:

* `/api/v1/web` → Admin/Web dashboard operations
* `/api/v1/mobile` → Mobile client operations

This separation ensures better organization, scalability, and role-based access control.

---

## Technologies Used

* Node.js (Backend runtime)
* Express.js (Web framework)
* Prisma ORM (Database management)
* PostgreSQL (Database)
* JWT (Authentication)
* Nodemailer (Email services)
* Swagger (API documentation)

---

## Project Structure

* `src/controllers/` → Handles request logic
* `src/routes/` → Defines API endpoints
* `src/helpers/` → Business logic abstraction
* `src/middlewares/` → Validation and error handling
* `src/utils/` → Utility functions (auth, logging, etc.)
* `prisma/` → Database schema and migrations
* `src/generated/` → Prisma client output

---

## Design Decisions

One key design decision was separating business logic into helper functions instead of placing everything inside controllers. This improves code readability, maintainability, and testability.

Another important decision was splitting the API into web and mobile routes. This allows different clients to interact with the system independently while maintaining a clean and scalable architecture.

Prisma ORM was chosen for database interaction due to its type safety, ease of use, and powerful query capabilities. It also simplifies migrations and schema management.

---

## Challenges Faced

During development, several challenges were encountered:

* Managing complex relationships between orders, users, and bikers
* Handling real-time delivery status updates
* Structuring the API for both mobile and web clients
* Integrating authentication flows such as OTP and password reset

These challenges were addressed through modular architecture and careful API design.

---

## Future Improvements

* Integration with payment systems for automated transactions
* Real-time tracking using WebSockets
* Admin dashboard frontend
* Improved analytics and reporting
* Notification system (SMS/Push notifications)

---

## Conclusion

This project demonstrates a full-featured backend system for a real-world logistics platform. It incorporates authentication, database design, API structuring, and scalable architecture. The QCS Backend API is designed not only as a learning project but also as a foundation for a production-ready delivery system.
