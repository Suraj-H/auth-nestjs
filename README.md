# 🔐 Auth NestJS API

A production-ready, enterprise-grade authentication and authorization system built with **NestJS**, featuring multiple authentication strategies, role-based and policy-based access control, and comprehensive security features.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Architecture](#-architecture)
- [Authentication Strategies](#-authentication-strategies)
- [Authorization](#-authorization)
- [Security Features](#-security-features)
- [Testing](#-testing)
- [Postman Collection](#-postman-collection)
- [Development](#-development)
- [Production Deployment](#-production-deployment)

## ✨ Features

### Core Functionality

- **Multiple Authentication Strategies**:
  - JWT-based authentication with access and refresh tokens
  - Session-based authentication with Redis storage
  - Google OAuth 2.0 integration
  - API Key authentication
  - Two-Factor Authentication (2FA) with TOTP

- **Authorization System**:
  - Role-Based Access Control (RBAC) with roles (USER, ADMIN)
  - Policy-Based Access Control (ABAC) with custom policies
  - Fine-grained permissions via scopes

- **User Management**: Complete CRUD operations for users
- **Coffee Management**: Example resource with protected endpoints
- **Token Management**: Secure refresh token rotation with Redis storage

### Technical Features

- **NestJS Framework**: Modern, scalable Node.js framework
- **TypeORM**: Type-safe database access with PostgreSQL
- **Redis**: Session storage and refresh token management
- **JWT**: Secure token-based authentication
- **Passport.js**: Flexible authentication middleware
- **Input Validation**: Comprehensive request validation using class-validator
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **CORS Support**: Configurable cross-origin resource sharing
- **Environment Configuration**: Joi-based environment variable validation

## 🛠 Tech Stack

### Runtime & Framework

- **Node.js** >= 20.0.0: JavaScript runtime
- **NestJS** 11.0.1: Progressive Node.js framework
- **TypeScript** 5.7.3: Type-safe development
- **Express.js**: HTTP server (via NestJS platform)

### Database & Storage

- **PostgreSQL**: Relational database
- **TypeORM** 0.3.20: Type-safe ORM with decorators
- **Redis** (via ioredis 5.9.0): Session storage and token management

### Authentication & Security

- **@nestjs/jwt** 11.0.2: JWT token generation and validation
- **@nestjs/passport** 11.0.5: Authentication strategies
- **passport** 0.7.0: Authentication middleware
- **bcrypt** 6.0.0: Password hashing
- **otplib** 12.0.1: TOTP-based 2FA
- **qrcode** 1.5.4: QR code generation for 2FA
- **google-auth-library** 10.5.0: Google OAuth verification

### Session Management

- **express-session** 1.18.2: Session middleware
- **connect-redis** 9.0.0: Redis session store

### Validation & Configuration

- **class-validator** 0.14.3: DTO validation decorators
- **class-transformer** 0.5.1: Object transformation
- **@nestjs/config** 4.0.2: Configuration management
- **joi** 18.0.2: Environment variable validation

### Development Tools

- **Jest** 30.0.0: Testing framework
- **ESLint** 9.18.0: Code linting
- **Prettier** 3.4.2: Code formatting
- **TypeScript**: Native TypeScript support

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 20.0.0 ([Download](https://nodejs.org/))
- **npm** >= 10.0.0 (comes with Node.js)
- **PostgreSQL** >= 12.0 (local installation or cloud database)
- **Redis** >= 6.0 (for session storage and token management)
- **Git** (for cloning the repository)

### Optional

- **Google OAuth Credentials** ([Get credentials](https://console.cloud.google.com/))
- **2FA Authenticator App** (Google Authenticator, Authy, etc.)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd auth-nestjs
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.dev.env` file in the root directory (or copy from `.sample.env`):

```bash
cp .sample.env .dev.env
```

Edit `.dev.env` with your configuration:

```env
# Application
NODE_ENV=development
PORT=3000

# Database
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USERNAME=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DATABASE=auth_nestjs

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_TOKEN_AUDIENCE=your-app-name
JWT_TOKEN_ISSUER=your-app-name
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# 2FA
TFA_APP_NAME=Your App Name

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_REDIRECT_URI=http://localhost:3000/auth/social/google/callback

# Sessions
SESSION_SECRET=your-super-secret-session-key-change-in-production

# CORS
CORS_ORIGIN=http://localhost:3000
```

**Important:**
- Use strong, unique secrets for `JWT_SECRET` and `SESSION_SECRET` in production
- Configure PostgreSQL connection details
- Ensure Redis is running and accessible
- For Google OAuth, set up OAuth 2.0 credentials in Google Cloud Console

### 4. Set Up Database

**Create PostgreSQL database:**

```bash
createdb auth_nestjs
```

**Note:** TypeORM will automatically synchronize the schema in development mode (`synchronize: true`). For production, use migrations.

### 5. Start Redis

```bash
# Using Docker
docker run -d -p 6379:6379 redis:latest

# Or using local Redis
redis-server
```

### 6. Run the Application

**Development Mode** (with hot reload):

```bash
npm run start:dev
```

**Production Mode**:

```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment (development/production/test) | No | `development` |
| `PORT` | Server port | No | `3000` |
| `POSTGRES_HOST` | PostgreSQL host | Yes | - |
| `POSTGRES_PORT` | PostgreSQL port | No | `5432` |
| `POSTGRES_USERNAME` | PostgreSQL username | Yes | - |
| `POSTGRES_PASSWORD` | PostgreSQL password | Yes | - |
| `POSTGRES_DATABASE` | PostgreSQL database name | Yes | - |
| `JWT_SECRET` | JWT signing secret | Yes | - |
| `JWT_TOKEN_AUDIENCE` | JWT audience claim | Yes | - |
| `JWT_TOKEN_ISSUER` | JWT issuer claim | Yes | - |
| `JWT_ACCESS_TOKEN_TTL` | Access token TTL (seconds) | Yes | `3600` |
| `JWT_REFRESH_TOKEN_TTL` | Refresh token TTL (seconds) | Yes | `86400` |
| `REDIS_HOST` | Redis host | Yes | - |
| `REDIS_PORT` | Redis port | Yes | `6379` |
| `REDIS_PASSWORD` | Redis password | No | - |
| `TFA_APP_NAME` | 2FA app name for QR code | Yes | - |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No | - |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No | - |
| `GOOGLE_REDIRECT_URI` | Google OAuth redirect URI | No | - |
| `SESSION_SECRET` | Session encryption secret | Yes | - |
| `CORS_ORIGIN` | CORS allowed origin | No | `http://localhost:3000` |

## 📚 API Documentation

### Base URL

```
http://localhost:3000
```

### Authentication

The API supports multiple authentication methods:

1. **Bearer Token**: `Authorization: Bearer <accessToken>`
2. **API Key**: `Authorization: ApiKey <apiKey>`
3. **Session Cookie**: Automatically handled for session-based endpoints

---

## 🔐 Authentication Endpoints

### `POST /auth/sign-up`

**Create a new user account**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user",
  "isTfaEnabled": false
}
```

**Validation:**
- `name`: String, 2-32 characters, letters only, required
- `email`: Valid email format, required
- `password`: 8-32 characters, must contain uppercase, lowercase, number, and special character, required

---

### `POST /auth/sign-in`

**Sign in with email and password**

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "Password123!",
  "tfaCode": "123456"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
}
```

**Features:**
- Returns JWT access token and refresh token
- If 2FA is enabled, `tfaCode` (6-digit TOTP) is required
- Tokens include user ID, email, and role

---

### `POST /auth/refresh-token`

**Refresh access token using refresh token**

**Request Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Features:**
- Invalidates old refresh token (token rotation)
- Returns new access and refresh tokens
- Refresh tokens stored in Redis for validation

---

### `POST /auth/2fa/generate`

**Generate QR code for 2FA setup**

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:** `200 OK` (QR code image as file stream)

**Features:**
- Requires authentication
- Generates TOTP secret and QR code
- Automatically enables 2FA for the authenticated user
- Scan QR code with authenticator app (Google Authenticator, Authy, etc.)

---

## 🔑 Session Authentication Endpoints

### `POST /auth/session/sign-in`

**Sign in using session-based authentication**

**Request Body:**
```json
{
  "email": "john.doe@example.com",
  "password": "Password123!"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user"
}
```

**Features:**
- Creates session cookie (stored in Redis)
- No tokens returned (uses session cookie)
- Session persists across requests

---

### `GET /auth/session/me`

**Get current authenticated user (session-based)**

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user"
}
```

**Features:**
- Requires valid session cookie
- Returns authenticated user information

---

## 🌐 Google OAuth Endpoints

### `POST /auth/social/google`

**Authenticate using Google OAuth token**

**Request Body:**
```json
{
  "token": "google-id-token-here"
}
```

**Response:** `200 OK`
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user",
    "googleId": "123456789"
  }
}
```

**Features:**
- Verifies Google ID token
- Creates user if doesn't exist
- Returns JWT tokens (same as sign-in)
- Links Google account to user

---

## 👥 User Management Endpoints

### `POST /users`

**Create a new user**

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "password": "Password123!"
}
```

**Response:** `201 Created`
```json
{
  "id": 2,
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "role": "user"
}
```

---

### `GET /users`

**Get all users**

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "user"
  }
]
```

---

### `GET /users/:id`

**Get user by ID**

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "user"
}
```

---

### `PATCH /users/:id`

**Update user**

**Request Body:**
```json
{
  "name": "Updated Name",
  "email": "updated@example.com",
  "password": "NewPassword123!",
  "isTfaEnabled": true
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Updated Name",
  "email": "updated@example.com",
  "role": "user",
  "isTfaEnabled": true
}
```

**Note:** All fields are optional.

---

### `DELETE /users/:id`

**Delete user by ID**

**Response:** `200 OK`

---

## ☕ Coffee Management Endpoints

### `POST /coffees`

**Create a new coffee** (Requires ADMIN role)

**Headers:**
```
Authorization: Bearer <accessToken>
```
or
```
Authorization: ApiKey <apiKey>
```

**Request Body:**
```json
{
  "name": "Espresso",
  "description": "Strong coffee"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Espresso",
  "description": "Strong coffee"
}
```

**Authorization:**
- Requires `ADMIN` role
- Requires `OrganizationContributorPolicy` policy

---

### `GET /coffees`

**Get all coffees** (Requires authentication)

**Headers:**
```
Authorization: Bearer <accessToken>
```
or
```
Authorization: ApiKey <apiKey>
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "name": "Espresso",
    "description": "Strong coffee"
  }
]
```

---

### `GET /coffees/:id`

**Get coffee by ID** (Requires authentication)

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Espresso",
  "description": "Strong coffee"
}
```

---

### `PATCH /coffees/:id`

**Update coffee** (Requires ADMIN role)

**Request Body:**
```json
{
  "name": "Updated Espresso",
  "description": "Updated description"
}
```

**Response:** `200 OK`

---

### `DELETE /coffees/:id`

**Delete coffee** (Requires ADMIN role)

**Response:** `200 OK`

---

## 🏗 Architecture

### Layered Architecture

The project follows a clean, layered architecture:

```
HTTP Request
    ↓
Controller (controllers/)
    ↓
Service (services/)
    ↓
Repository/Entity (entities/)
    ↓
TypeORM
    ↓
PostgreSQL Database
```

### Design Patterns

1. **Module Pattern**: Feature-based module organization
   - `IamModule`: Identity and Access Management
   - `UsersModule`: User management
   - `CoffeesModule`: Example resource module

2. **Guard Pattern**: Authentication and authorization guards
   - `AuthenticationGuard`: Global authentication guard
   - `AccessTokenGuard`: JWT token validation
   - `ApiKeyGuard`: API key validation
   - `SessionGuard`: Session validation
   - `RoleGuard`: Role-based authorization
   - `PoliciesGuard`: Policy-based authorization

3. **Strategy Pattern**: Multiple authentication strategies
   - JWT authentication
   - Session authentication
   - Google OAuth
   - API Key authentication

4. **Decorator Pattern**: Custom decorators for metadata
   - `@Auth()`: Authentication type specification
   - `@Roles()`: Role requirements
   - `@Policies()`: Policy requirements
   - `@ActiveUser()`: Current user injection

### Key Principles

- **Single Responsibility**: Each module/class has one responsibility
- **Dependency Injection**: Services depend on abstractions
- **Type Safety**: Full TypeScript coverage with TypeORM types
- **Error Handling**: Centralized error handling with proper HTTP status codes
- **Validation**: class-validator for all inputs
- **Separation of Concerns**: Clear boundaries between layers

## 🔐 Authentication Strategies

### 1. JWT Authentication

- **Access Tokens**: Short-lived (default: 1 hour)
- **Refresh Tokens**: Long-lived (default: 24 hours)
- **Token Rotation**: Refresh tokens are rotated on each use
- **Redis Storage**: Refresh token IDs stored in Redis for validation
- **Claims**: User ID, email, role included in token

### 2. Session Authentication

- **Redis Storage**: Sessions stored in Redis
- **Cookie-based**: Secure, httpOnly cookies
- **Passport.js**: Session serialization/deserialization
- **Automatic**: Session persists across requests

### 3. Google OAuth

- **ID Token Verification**: Validates Google ID tokens
- **User Creation**: Automatically creates users if needed
- **Account Linking**: Links Google account to user
- **JWT Tokens**: Returns standard JWT tokens after OAuth

### 4. API Key Authentication

- **User-scoped**: API keys belong to users
- **Scope-based**: Fine-grained permissions via scopes
- **Alternative to JWT**: Can be used instead of Bearer tokens

### 5. Two-Factor Authentication (2FA)

- **TOTP-based**: Time-based One-Time Password
- **QR Code Generation**: Easy setup with QR codes
- **Optional**: Can be enabled per user
- **Required on Sign-in**: If enabled, TOTP code required

## 🛡️ Authorization

### Role-Based Access Control (RBAC)

**Roles:**
- `USER`: Default role for regular users
- `ADMIN`: Administrative role with elevated permissions

**Usage:**
```typescript
@Roles(Role.ADMIN)
@Get('admin-only')
adminOnly() {
  // Only ADMIN role can access
}
```

### Policy-Based Access Control (ABAC)

**Policies:**
- `OrganizationContributorPolicy`: Example policy for organization contributors

**Usage:**
```typescript
@Policies(new OrganizationContributorPolicy())
@Post('create')
create() {
  // Only users matching policy can access
}
```

**Custom Policies:**
- Implement `PolicyHandler` interface
- Register in `PolicyHandlerStorage`
- Use `@Policies()` decorator

## 🔒 Security Features

### Input Validation

- **class-validator**: Comprehensive request body and parameter validation
- **Type Safety**: TypeScript + TypeORM types prevent type errors
- **Automatic Sanitization**: ValidationPipe with whitelist and transform

### Password Security

- **bcrypt**: Secure password hashing with salt rounds
- **Password Requirements**: Enforced via validation (uppercase, lowercase, number, special character)

### Token Security

- **JWT Signing**: HMAC SHA-256 signing
- **Token Rotation**: Refresh tokens rotated on each use
- **Redis Validation**: Refresh token IDs validated against Redis
- **Expiration**: Configurable token TTL

### Session Security

- **Secure Cookies**: httpOnly, secure (in production), sameSite
- **Redis Storage**: Centralized session storage
- **Secret Key**: Encrypted session data

### CORS Configuration

- **Configurable Origins**: Environment-based CORS origin
- **Credentials**: Supports credentials in cross-origin requests
- **Preflight**: Proper OPTIONS handling

### Best Practices

- **Environment Variables**: Sensitive data in environment variables
- **No Hardcoded Secrets**: All secrets in `.env` file
- **Parameterized Queries**: TypeORM uses parameterized queries (SQL injection protection)
- **Error Messages**: Generic error messages prevent information leakage

## ⚠️ Error Handling

### Error Response Format

All errors follow a consistent format:

**400 Bad Request** (Validation Errors)
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password is required"],
  "error": "Bad Request"
}
```

**401 Unauthorized** (Authentication Errors)
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**403 Forbidden** (Authorization Errors)
```json
{
  "statusCode": 403,
  "message": "Access denied",
  "error": "Forbidden"
}
```

**404 Not Found**
```json
{
  "statusCode": 404,
  "message": "User not found",
  "error": "Not Found"
}
```

**409 Conflict** (Unique Constraint)
```json
{
  "statusCode": 409,
  "message": "User already exists",
  "error": "Conflict"
}
```

**500 Internal Server Error**
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

## 🧪 Testing

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

### Test Structure

- **Unit Tests**: `*.spec.ts` files alongside source files
- **E2E Tests**: `test/` directory with `jest-e2e.json` configuration

## 📮 Postman Collection

A complete Postman collection is included: `Auth_NestJS_API.postman_collection.json`

### Features

- **Auto-save Variables**: Automatically saves tokens, user IDs, and coffee IDs
- **Collection Variables**: Pre-configured variables for baseUrl, accessToken, refreshToken, userId, coffeeId, apiKey
- **Request Examples**: Sample request bodies for all endpoints
- **Documentation**: Detailed descriptions for each endpoint
- **Test Scripts**: Automatic variable saving on successful responses

### Import Instructions

1. Open Postman
2. Click **Import** button
3. Select `Auth_NestJS_API.postman_collection.json`
4. Collection will be imported with all endpoints organized by resource

### Collection Variables

- `baseUrl`: API base URL (default: `http://localhost:3000`)
- `accessToken`: JWT access token (auto-populated after sign-in)
- `refreshToken`: JWT refresh token (auto-populated after sign-in)
- `userId`: Current user ID (auto-populated after sign-up/sign-in)
- `coffeeId`: Coffee ID (auto-populated after creating coffee)
- `apiKey`: API Key for authentication (set manually)

### Usage Flow

1. **Sign Up**: Create a new user account
2. **Sign In**: Get access and refresh tokens
3. **Generate 2FA QR Code**: Set up two-factor authentication (optional)
4. **Refresh Token**: Refresh access token
5. **Get Current User**: Test authenticated endpoint
6. **Create Coffee**: Test ADMIN-only endpoint with policy
7. **Google OAuth**: Test Google authentication (if configured)
8. **Session Sign In**: Test session-based authentication

## 💻 Development

### Development Scripts

```bash
# Start development server with hot reload
npm run start:dev

# Start production server
npm run start:prod

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

### Code Style

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting with NestJS rules
- **Prettier**: Code formatting
- **Naming Conventions**:
  - Files: kebab-case (e.g., `authentication.service.ts`)
  - Classes: PascalCase (e.g., `AuthenticationService`)
  - Methods/Variables: camelCase (e.g., `signIn()`)

### Project Structure

```
src/
├── main.ts                      # Application entry point
├── app.module.ts                # Root module
├── app.controller.ts            # Root controller
├── app.service.ts               # Root service
├── iam/                         # Identity and Access Management module
│   ├── iam.module.ts
│   ├── authentication/          # Authentication strategies
│   │   ├── authentication.controller.ts
│   │   ├── authentication.service.ts
│   │   ├── session-authentication.controller.ts
│   │   ├── session-authentication.service.ts
│   │   ├── api-key.service.ts
│   │   ├── otp-authentication.service.ts
│   │   ├── guards/              # Authentication guards
│   │   ├── decorators/          # Custom decorators
│   │   ├── dto/                 # Data Transfer Objects
│   │   ├── storage/             # Token storage (Redis)
│   │   └── social/              # OAuth providers
│   ├── authorization/           # Authorization system
│   │   ├── guards/              # Authorization guards
│   │   ├── decorators/          # Authorization decorators
│   │   └── policies/            # Policy handlers
│   ├── config/                  # Configuration
│   ├── entities/                # Database entities
│   ├── hashing/                 # Password hashing
│   └── common/                  # Shared services
├── users/                       # Users module
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/
│   ├── dto/
│   └── enums/
└── coffees/                     # Coffees module (example)
    ├── coffees.module.ts
    ├── coffees.controller.ts
    ├── coffees.service.ts
    ├── entities/
    └── dto/
```

### Adding New Features

1. **Create Entity**: Add TypeORM entity in `entities/`
2. **Create DTOs**: Add request/response DTOs in `dto/`
3. **Create Service**: Add business logic in service file
4. **Create Controller**: Add HTTP handlers in controller file
5. **Create Module**: Register in module file
6. **Add Routes**: Routes automatically registered via controllers
7. **Add Guards**: Apply authentication/authorization guards as needed

### Database Migrations

**Development:**
- TypeORM auto-synchronization enabled (`synchronize: true`)
- Schema changes automatically applied

**Production:**
- Disable auto-synchronization
- Use migrations:
  ```bash
  # Generate migration
  npm run typeorm migration:generate -- -n MigrationName

  # Run migrations
  npm run typeorm migration:run
  ```

## 🚀 Production Deployment

### Environment Setup

1. Set production environment variables
2. Use strong database connection string
3. Configure Redis connection
4. Set strong JWT and session secrets
5. Configure CORS origins
6. Disable TypeORM auto-synchronization
7. Enable production logging

### Recommended Practices

- Use managed PostgreSQL service (AWS RDS, Supabase, Neon, etc.)
- Use managed Redis service (AWS ElastiCache, Redis Cloud, etc.)
- Enable PostgreSQL connection pooling
- Use environment-specific configuration
- Set up monitoring and alerting
- Configure reverse proxy (Nginx, Caddy)
- Enable HTTPS/SSL
- Set up backup strategy
- Monitor authentication failures
- Enable structured logging
- Use process manager (PM2, systemd)

### Security Checklist

- [ ] Change all default secrets
- [ ] Use strong JWT secret (32+ characters)
- [ ] Use strong session secret (32+ characters)
- [ ] Enable HTTPS
- [ ] Configure secure cookies (secure: true)
- [ ] Set up rate limiting (recommended)
- [ ] Enable CORS for specific origins only
- [ ] Disable TypeORM auto-synchronization
- [ ] Use environment variables for all secrets
- [ ] Set up database backups
- [ ] Monitor authentication attempts
- [ ] Set up error tracking (Sentry, etc.)

### Performance Optimization

- **Connection Pooling**: TypeORM manages connection pooling automatically
- **Redis Caching**: Sessions and tokens cached in Redis
- **Query Optimization**: Use TypeORM query builder for complex queries
- **Indexes**: Ensure database indexes on frequently queried fields
- **Token Validation**: JWT validation is stateless and fast

## 📝 API Workflow Examples

### JWT Authentication Flow

1. **Sign Up**
   ```bash
   POST /auth/sign-up
   {
     "name": "John Doe",
     "email": "john@example.com",
     "password": "Password123!"
   }
   # Returns: User object
   ```

2. **Sign In**
   ```bash
   POST /auth/sign-in
   {
     "email": "john@example.com",
     "password": "Password123!"
   }
   # Returns: { accessToken, refreshToken, user }
   ```

3. **Use Access Token**
   ```bash
   GET /coffees
   Authorization: Bearer <accessToken>
   # Returns: List of coffees
   ```

4. **Refresh Token**
   ```bash
   POST /auth/refresh-token
   {
     "refreshToken": "<refreshToken>"
   }
   # Returns: { accessToken, refreshToken } (new tokens)
   ```

### 2FA Setup Flow

1. **Sign In** (get access token)
2. **Generate QR Code**
   ```bash
   POST /auth/2fa/generate
   Authorization: Bearer <accessToken>
   # Returns: QR code image
   ```
3. **Scan QR Code** with authenticator app
4. **Sign In with 2FA**
   ```bash
   POST /auth/sign-in
   {
     "email": "john@example.com",
     "password": "Password123!",
     "tfaCode": "123456"  # From authenticator app
   }
   ```

### Session Authentication Flow

1. **Sign In with Session**
   ```bash
   POST /auth/session/sign-in
   {
     "email": "john@example.com",
     "password": "Password123!"
   }
   # Sets session cookie automatically
   ```

2. **Access Protected Endpoint**
   ```bash
   GET /auth/session/me
   # Cookie automatically sent, returns user
   ```

## 🎯 Quick Reference

### Endpoints Summary

| Method | Endpoint | Auth Required | Role Required | Description |
|--------|----------|---------------|---------------|-------------|
| `POST` | `/auth/sign-up` | No | - | Create user account |
| `POST` | `/auth/sign-in` | No | - | Sign in with JWT |
| `POST` | `/auth/refresh-token` | No | - | Refresh access token |
| `POST` | `/auth/2fa/generate` | Yes | - | Generate 2FA QR code |
| `POST` | `/auth/session/sign-in` | No | - | Sign in with session |
| `GET` | `/auth/session/me` | Session | - | Get current user (session) |
| `POST` | `/auth/social/google` | No | - | Google OAuth |
| `POST` | `/users` | No | - | Create user |
| `GET` | `/users` | No | - | Get all users |
| `GET` | `/users/:id` | No | - | Get user by ID |
| `PATCH` | `/users/:id` | No | - | Update user |
| `DELETE` | `/users/:id` | No | - | Delete user |
| `POST` | `/coffees` | Yes | ADMIN | Create coffee |
| `GET` | `/coffees` | Yes | - | Get all coffees |
| `GET` | `/coffees/:id` | Yes | - | Get coffee by ID |
| `PATCH` | `/coffees/:id` | Yes | ADMIN | Update coffee |
| `DELETE` | `/coffees/:id` | Yes | ADMIN | Delete coffee |

### Authentication Types

- `AuthType.NONE`: No authentication required
- `AuthType.BEARER`: JWT Bearer token authentication
- `AuthType.API_KEY`: API Key authentication
- `AuthType.SESSION`: Session-based authentication

### Roles

- `Role.USER`: Regular user (default)
- `Role.ADMIN`: Administrative user

## 📄 License

UNLICENSED

## 👤 Author

Auth NestJS API - Enterprise Authentication & Authorization System

---

**Built with ❤️ using NestJS, TypeORM, PostgreSQL, Redis, and JWT**
