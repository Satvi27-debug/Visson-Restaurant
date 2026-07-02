# Visson Restaurant Reservation System

## Project Overview
This project is a complete, production-ready web application for a single restaurant to manage table reservations. It features a complete role-based system (Customers vs Administrators). The UI is highly styled with a custom 70-soft-white/20-dark-grey/10-blue palette, utilizing responsive full-screen CSS Grids for a premium, non-bookish aesthetic.

## 🚀 Features
- **User Authentication**: Secure JWT-based login/registration. Passwords hashed via bcrypt.
- **Strict Role-Based Access**: Separated views and capabilities. Admin registration strictly requires the `Qwert` password.
- **Customer Features**:
  - Full-screen dashboard.
  - Check availability and create table reservations. The system automatically assigns appropriately sized tables (2, 3, or 4 seaters).
  - "My Bookings" page to view active reservations and withdraw (cancel) them.
  - Submit complaints directly to management.
- **Admin Features**:
  - Live statistics showing exactly how many of each table type are remaining.
  - View all live bookings, cancel them manually, and view/delete customers.
  - Resolve customer complaints.
- **Smart Validation**: The backend prevents double booking, automatically verifies guest capacities, and restricts overlapping time slots.

## 📁 Folder Structure
```
Visson-Restaurant/
│
├── backend/
│   ├── controllers/      # API logic (auth, reservations, tables, users, complaints)
│   ├── middleware/       # JWT verification and Admin checks
│   ├── models/           # Mongoose schemas (User, Table, Reservation, Complaint)
│   ├── routes/           # Express router endpoints
│   ├── seed.js           # Database seeding script for generating 60 tables
│   └── server.js         # Entry point for backend
│
├── frontend/
│   ├── src/
│   │   ├── api.js        # Axios instance configured with Interceptors
│   │   ├── components/   # Shared UI components (Layout, Sidebar, Card)
│   │   ├── pages/        # Route components separated by role (admin/customer)
│   │   ├── App.jsx       # Routing and private route wrappers
│   │   ├── main.jsx      # React entry point
│   │   └── index.css     # Global styles and hero-section styling
│   ├── vercel.json       # Vercel routing configuration
│   └── package.json      # Vite project dependencies
│
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas Account (or local MongoDB)

### Backend Setup
1. Open terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` directory (Note: This is ignored by git for security):
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run the seed script to populate tables (run only once):
   ```bash
   node seed.js
   ```
5. Start the server:
   ```bash
   node server.js
   ```

### Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```

## 🌍 Deployment

- **Frontend (Vercel)**: Connect your GitHub repo to Vercel. Set the Root Directory to `frontend`. Add `VITE_API_URL` to your environment variables pointing to your deployed backend.
- **Backend (Render)**: Connect your GitHub repo to Render. Set the Root Directory to `backend`. Set the Build Command to `npm install` and the Start Command to `node server.js`. Add `MONGO_URI` and `JWT_SECRET` to environment variables.
- **Database (MongoDB Atlas)**: Ensure Network Access is configured to allow Render IP addresses (or `0.0.0.0/0`).
