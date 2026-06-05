# Backend API Documentation

## Setup

1. Copy `.env.example` to `.env` and set your MySQL credentials.
2. Install dependencies:
   - `cd backend`
   - `npm install`
3. Seed the database:
   - `npm run seed`
4. Start the development server:
   - `npm run dev`

## Environment variables

- `PORT` - server port (default 5000)
- `DB_HOST` - MySQL host
- `DB_PORT` - MySQL port
- `DB_NAME` - MySQL database name
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `JWT_SECRET` - JWT signing secret
- `JWT_EXPIRES_IN` - token expiration window
- `FRONTEND_URL` - allowed CORS origin

## API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/change-password` (authenticated)

### User

- `GET /api/users` (admin)
- `GET /api/users/:id` (admin)

### Store

- `GET /api/stores`
- `GET /api/stores/:id`
- `GET /api/stores/owner/me` (owner)
- `POST /api/stores` (admin)

### Rating

- `GET /api/ratings/me` (user)
- `POST /api/ratings` (user)
- `PUT /api/ratings/:id` (user)
- `GET /api/ratings/owner/history` (owner)

### Admin

- `POST /api/admin/users` (admin)
- `POST /api/admin/stores` (admin)
- `GET /api/admin/users` (admin)
- `GET /api/admin/stores` (admin)

### Dashboard

- `GET /api/dashboard/admin` (admin)
- `GET /api/dashboard/owner` (owner)
