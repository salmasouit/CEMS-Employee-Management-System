# Canal Employee Management System (CEMS)

CEMS is a complete, modern, and secure Enterprise Employee Management System built for **Canal Informatique**. It features a robust Node.js/Express backend paired with a stunning React frontend designed with Tailwind CSS, Recharts, and Glassmorphism styling.

## 🚀 Features
- **Role-Based Access Control (RBAC):** Distinct permissions for Administrator, HR Manager, Project Manager, Technician, Commercial, and Employee.
- **Enterprise Dashboard:** Rich visualizations, real-time metrics, and activity logs.
- **Leave Management:** Complete workflow from request submission to HR approval/rejection.
- **Comprehensive CRUD Operations:** Manage Employees, Departments, and Roles.
- **Modern UI/UX:** Glassmorphism, dynamic gradients, responsive layouts, and Dark Mode support.
- **Secure Architecture:** JWT authentication, robust password hashing (bcrypt), XSS protection, Helmet, and Rate Limiting.

## 🛠 Technology Stack
- **Frontend:** React.js, React Router DOM, Tailwind CSS, Recharts, React Hook Form, Context API, Axios.
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, bcrypt, Express Validator.

## 📁 Folder Structure
```
stagepfa/
├── backend/
│   ├── src/
│   │   ├── config/       # Database & Environment setup
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Authentication, RBAC, Validation
│   │   ├── models/       # Mongoose schemas
│   │   ├── routes/       # API endpoints
│   │   ├── seeds/        # Database seeding scripts
│   │   └── utils/        # JWT, Helpers
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/       # Images, Icons
    │   ├── components/   # Reusable UI elements
    │   ├── context/      # React Contexts (Auth, Theme)
    │   ├── layouts/      # Dashboard and Auth wrappers
    │   ├── pages/        # Main application views
    │   ├── services/     # Axios API handlers
    │   └── utils/        # Constants and Helpers
    └── package.json
```

## ⚙️ Installation & Setup Guide

### 1. Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on .env.example
npm run seed  # Seed the database with default roles and admin
npm run dev   # Start the server on port 5000
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm start     # Start the React app on port 3000
```

## 🔐 Default Credentials (Seeded)
- **Administrator**: `admin@canalinformatique.ma` | `Admin@123456`
- **HR Manager**: `hr@canalinformatique.ma` | `Hr@123456`
- **Employee**: `employee@canalinformatique.ma` | `Employee@123`

## 📚 API Documentation
- `POST /api/v1/auth/login` - Authenticate user and return JWT
- `GET /api/v1/dashboard/stats` - Fetch core dashboard metrics
- `GET /api/v1/employees` - Retrieve all employees (paginated, with search filters)
- `POST /api/v1/leave-requests` - Submit a new leave request
- *For detailed endpoints, check the `backend/src/routes` directory.*
