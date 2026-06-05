# Store Rating Platform

A complete full-stack Store Rating Platform built using React.js, Express.js, MySQL, JWT Authentication, and Tailwind CSS.

The platform enables users to discover stores, submit ratings, update ratings, and allows store owners and administrators to manage and monitor platform activity through dedicated dashboards.

---

## Features

### Authentication & Authorization

* JWT-based Authentication
* Role-Based Access Control (RBAC)
* Secure Password Hashing using bcrypt
* Login
* Registration
* Logout
* Change Password

---

## User Roles

### System Administrator

The administrator has complete control over the platform.

#### Admin Features

* Login / Logout
* Dashboard Analytics
* View Total Users
* View Total Stores
* View Total Ratings
* Create New Users
* Create New Admins
* Create New Stores
* View All Users
* View All Stores
* Search Users
* Search Stores
* Filter Users
* Filter Stores
* Sort Users
* Sort Stores
* View User Details
* View Store Details

---

### Normal User

Normal users can browse stores and submit ratings.

#### User Features

* Register Account
* Login / Logout
* Change Password
* Browse Stores
* Search Stores
* Sort Stores
* Submit Ratings
* Update Existing Ratings
* View Personal Ratings

---

### Store Owner

Store owners can monitor ratings received by their stores.

#### Store Owner Features

* Login / Logout
* Change Password
* View Average Store Rating
* View Users Who Rated Their Store
* View Rating History
* Dashboard Analytics

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Context API

### Backend

* Node.js
* Express.js
* JWT Authentication
* bcrypt
* Express Middleware

### Database

* MySQL

---

## Database Schema

### Users Table

| Field      | Type      |
| ---------- | --------- |
| id         | INT       |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| address    | TEXT      |
| role       | ENUM      |
| created_at | TIMESTAMP |

---

### Stores Table

| Field      | Type      |
| ---------- | --------- |
| id         | INT       |
| name       | VARCHAR   |
| email      | VARCHAR   |
| address    | TEXT      |
| owner_id   | INT       |
| created_at | TIMESTAMP |

---

### Ratings Table

| Field      | Type      |
| ---------- | --------- |
| id         | INT       |
| user_id    | INT       |
| store_id   | INT       |
| rating     | INT       |
| created_at | TIMESTAMP |

---

## Project Structure

```text
Store_Rating_Platform
│
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── routes
│   │   ├── middleware
│   │   ├── models
│   │   ├── services
│   │   ├── config
│   │   └── utils
│   │
│   ├── seed
│   ├── .env
│   └── package.json
│
├── frontend
│   ├── src
│   │   ├── pages
│   │   ├── components
│   │   ├── services
│   │   ├── contexts
│   │   └── assets
│   │
│   ├── public
│   └── package.json
│
├── sql
│   └── schema.sql
│
└── README.md
```

---

## Installation Guide

### Clone Repository

```bash
git clone https://github.com/surajj1111/Store_Rating_Platform.git
```

---

## Backend Setup

```bash
cd backend
npm install
```

Create .env file

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=store_rating_platform

JWT_SECRET=your_secret_key
```

Run Database Seed

```bash
npm run seed
```

Start Backend

```bash
npm run dev
```

Backend Running On

```text
http://localhost:5000
```

---

## Frontend Setup

```bash
cd frontend
npm install
```

Start Frontend

```bash
npm run dev
```

Frontend Running On

```text
http://localhost:5173
```

---

## API Modules

### Authentication

```text
/api/auth
```

### Users

```text
/api/users
```

### Stores

```text
/api/stores
```

### Ratings

```text
/api/ratings
```

### Dashboard

```text
/api/dashboard
```

### Admin

```text
/api/admin
```

---

## Form Validations

### Name

* Minimum 20 Characters
* Maximum 60 Characters

### Address

* Maximum 400 Characters

### Email

* Valid Email Format

### Password

Must Contain:

* 8-16 Characters
* One Uppercase Letter
* One Special Character

---

## Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Role-Based Authorization
* Input Validation
* SQL Injection Protection
* Secure Environment Variables

---

## Screenshots

### Admin Dashboard

Add Screenshot Here

### User Dashboard

Add Screenshot Here

### Store Owner Dashboard

Add Screenshot Here

---

## Future Improvements

* Email Verification
* Forgot Password
* Store Images
* User Profile Management
* Deployment Pipeline
* Activity Logs

---

## Author

Suraj Patil

Built as a Full Stack Web Development Project using React, Express.js and MySQL.

## Seed Data

Seed script is available at `backend/seed/seed.js` and generates sample admin, normal users, owners, stores, and ratings.
