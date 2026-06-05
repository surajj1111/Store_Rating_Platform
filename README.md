# Store Rating Platform

A complete production-ready full-stack store rating platform built with React, Tailwind CSS, Express, and MySQL. The application supports System Administrators, Normal Users, and Store Owners with JWT authentication and role-based access control.

## Features

- Full auth: register, login, logout, password change
- JWT token-based authentication with role authorization
- Admin dashboards, user and store management
- Normal user store browsing, search, sorting, pagination, interactive rating
- Store owner dashboards and rating history management
- Input validation, secure password hashing, SQL protection
- Responsive UI with Tailwind CSS

## Folder Structure

- `backend/` - Express.js REST API and seed scripts
- `frontend/` - React application using Vite and Tailwind CSS
- `sql/` - MySQL schema definition

## Setup Instructions

### Backend

1. Copy `backend/.env.example` to `backend/.env`
2. Configure MySQL settings and JWT secret
3. Install dependencies:
   - `cd backend`
   - `npm install`
4. Seed the database:
   - `npm run seed`
5. Start the API server:
   - `npm run dev`

### Frontend

1. Copy `frontend/.env.example` to `frontend/.env`
2. Install dependencies:
   - `cd frontend`
   - `npm install`
3. Run the development server:
   - `npm run dev`

## API Overview

The backend exposes REST endpoints under:

- `/api/auth`
- `/api/users`
- `/api/stores`
- `/api/ratings`
- `/api/admin`
- `/api/dashboard`

See `backend/README.md` for full API documentation and role requirements.

## MySQL Schema

Schema file is available at `sql/schema.sql`.

## Seed Data

Seed script is available at `backend/seed/seed.js` and generates sample admin, normal users, owners, stores, and ratings.
