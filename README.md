# Poultry Supply Chain Management System

## Project Overview
The Poultry Supply Chain Management System is a web-based platform designed to streamline the entire poultry supply chain. It connects **Owners, Employees, Farmers, and Customers (market shops, restaurants)** in a single system to manage orders, farm stock, collections, and deliveries efficiently. Built to replace traditional manual processes, the system provides transparency, real-time tracking, and seamless coordination among stakeholders.

## Problem Statement
Traditional poultry supply chains are often fragmented, leading to delayed orders, stock mismatches, and poor tracking. This system solves these problems by centralizing business operations, automating stock updates, and managing deliveries, ensuring faster and more reliable transactions.

## System Architecture
- **Frontend:** Next.js 14 (App Router)  
- **Backend:** NestJS v10  
- **Database:** PostgreSQL with Prisma ORM  
- **Authentication:** JWT with Role-based access  
- **Deployment:** Local development only  

## Features
- Owner can create a business and manage employees, farmers, and customers  
- Farmers update farm stock, linked automatically to businesses  
- Customers place orders; owners create collections and assign deliveries  
- Employees handle collection pickup and delivery  
- Real-time order tracking and status updates  
- Payment tracking (Paid, Partial, Unpaid)  

## Database Overview
The system uses a relational database with the following main entities:  
- **User:** Owner, Employee, Farmer, Customer  
- **Business:** Owned by Owner; connects all users  
- **UserBusiness:** Many-to-many join table between User and Business  
- **FarmStock:** Stock entries by farmers  
- **FarmStockforBusiness:** Many-to-many relation between Business and FarmStock  
- **Order:** Customer orders  
- **OwnerOrder:** Owner purchases stock from farmers  
- **Collection:** Groups of OwnerOrders for delivery  

## API Endpoints (Short Form)
### Auth
- `POST /auth/register` → Register user  
- `POST /auth/login` → Login user, return JWT  
- `POST /auth/logout` → Logout user  

### Business
- `POST /business` → Create business  
- `GET /business/:id` → Get business details  
- `PUT /business/:id` → Update business  
- `GET /business` → List all businesses  

### UserBusiness
- `POST /user-business` → Add user to business  
- `GET /user-business/:id` → Get user-business relation  

### FarmStock
- `POST /farm-stock` → Add farm stock  
- `PUT /farm-stock/:id` → Update farm stock  
- `GET /farm-stock` → List farm stocks  

### FarmStockforBusiness
- `POST /farm-stock-business` → Link farm stock to business  
- `PUT /farm-stock-business/:id` → Update stock info for business  

### Orders
- `POST /orders` → Create customer order  
- `PUT /orders/:id` → Update order  
- `GET /orders` → List orders  

### OwnerOrders
- `POST /owner-orders` → Create owner order  
- `PUT /owner-orders/:id` → Update owner order  
- `GET /owner-orders` → List owner orders  

### Collections
- `POST /collections` → Create collection  
- `PUT /collections/:id` → Update collection status  
- `GET /collections` → List collections  

## Project Structure
### Frontend (Next.js)
/app
/auth
/business
/farm-stock
/orders
/collections
/components
/lib
api.ts
/layouts
/pages

### Backend (NestJS)
/modules
auth/
business/
farm-stock/
orders/
owner-orders/
collections/
main.ts
/prisma
schema.prisma


## Installation & Setup
1. Clone repository: `git clone <repo-url>`  
2. Install backend: `cd backend && npm install`  
3. Install frontend: `cd frontend && npm install`  
4. Setup PostgreSQL database and add `DATABASE_URL` in `.env`  
5. Run Prisma migration: `npx prisma migrate dev`  
6. Start backend: `npm run start:dev`  
7. Start frontend: `npm run dev`  

## Future Improvements
- Mobile app for on-field employees and farmers  
- Automated notifications for stock updates and deliveries  
- Advanced analytics for orders, stock, and sales  

## Author
**Mustakim Billah Rafi**
