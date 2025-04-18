# Role-Based Construction API

A NestJS-based REST API for a construction management system with role-based authentication (BUYER, VENDOR, RIDER).

## Features

- 🔐 Role-based authentication using JWT
- 📦 MongoDB integration with Prisma ORM
- 🛡️ Protected routes based on user roles
- 🔄 CRUD operations for products
- ✨ Input validation and error handling

## Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## Quick Start

1. Clone the repository:

```bash
git clone <repository-url>
cd role-based-construction-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configurations
```

4. Generate Prisma client:

```bash
npx prisma generate
```

5. Start the development server:

```bash
npm run start:dev
```

## Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="your-mongodb-url"
JWT_SECRET="your-secret-key"
JWT_EXPIRATION="1d"
PORT=3000
```

## API Endpoints

### Auth

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products

- `POST /api/products` - Create product (VENDOR only)
- `GET /api/products` - Get products (BUYER: all products, VENDOR: own products)

## Available Scripts

- `npm run start` - Start production server
- `npm run start:dev` - Start development server
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run linting

## Project Structure

```
src/
├── auth/           # Authentication module
├── products/       # Products module
├── users/          # Users module
├── prisma/         # Prisma configuration
├── main.ts         # Application entry point
└── app.module.ts   # Root module
```

## License

[MIT](LICENSE)
