# Overview

CodewiseHub is a comprehensive AI-powered educational platform that teaches coding and technology skills to students across different age groups and educational markets. The platform serves students, teachers, parents, and administrators with role-specific dashboards and features. It emphasizes visual programming, AI integration, and robotics education, with localized curriculum support for South African and Zimbabwean markets.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend follows a modern React-based single-page application (SPA) architecture:

- **Framework**: React 18 with TypeScript for type safety and developer experience
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **UI Framework**: Radix UI components with shadcn/ui design system for consistent, accessible interface components
- **Styling**: Tailwind CSS with custom CSS variables for theming, supporting both light and dark modes
- **Build Tool**: Vite for fast development and optimized production builds

The application uses a role-based component structure with protected routes that redirect users to appropriate dashboards based on their roles (student, teacher, parent, admin). Context providers handle global state like market selection and authentication status.

### Backend Architecture

The backend implements a RESTful API using Node.js and Express:

- **Framework**: Express.js with TypeScript for robust API development
- **Database ORM**: Drizzle ORM for type-safe database operations and schema management
- **Authentication**: Replit Auth integration using OpenID Connect with Passport.js strategy
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **Database**: PostgreSQL with connection pooling via Neon serverless driver
- **Development**: Hot reloading with tsx for server-side TypeScript execution

The API follows RESTful conventions with route protection middleware ensuring proper authentication and authorization. Error handling middleware provides consistent error responses across all endpoints.

### Data Storage Solutions

The platform uses PostgreSQL as the primary database with a comprehensive schema design:

- **User Management**: Users table with role-based access (student, teacher, parent, admin) and market segmentation
- **Educational Content**: Courses and lessons tables with hierarchical content organization
- **Progress Tracking**: User progress tables linking students to specific lessons and courses
- **Project Management**: Projects table for storing user-created coding projects
- **Gamification**: Achievements and user achievements tables for engagement
- **Session Storage**: Dedicated sessions table for authentication state persistence

Schema definitions use Drizzle ORM with zod validation for type safety across the full stack.

### Authentication and Authorization

The platform implements Replit Auth for secure authentication:

- **Provider**: OpenID Connect integration with Replit's authentication service
- **Session Management**: Server-side sessions stored in PostgreSQL with configurable TTL
- **Role-Based Access**: Middleware functions enforce role-based route protection
- **User Context**: React context provides authentication state throughout the frontend
- **Logout Flow**: Secure logout with session cleanup and redirect handling

### Market Localization

The application supports multiple educational markets:

- **Market Selection**: Context-based market switching between South Africa and Zimbabwe
- **Curriculum Alignment**: Market-specific course filtering and content adaptation
- **Localized Content**: Market-aware course recommendations and educational standards compliance
- **Persistent Preferences**: localStorage maintains user's market selection across sessions

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling and automatic scaling
- **Drizzle Kit**: Database migration tool for schema management and version control

### Authentication Services
- **Replit Auth**: OpenID Connect authentication provider for secure user management
- **Passport.js**: Authentication middleware for Node.js with OpenID Connect strategy

### UI and Styling Libraries
- **Radix UI**: Headless component library providing accessible, customizable UI primitives
- **shadcn/ui**: Pre-built component collection built on Radix UI with consistent design patterns
- **Tailwind CSS**: Utility-first CSS framework with custom design system integration
- **Lucide React**: Icon library providing consistent iconography throughout the application

### Development and Build Tools
- **Vite**: Fast build tool with hot module replacement and optimized production builds
- **TypeScript**: Type safety across frontend and backend codebases
- **TanStack Query**: Server state management with caching, background updates, and error handling
- **React Hook Form**: Form handling with validation and optimized re-rendering
- **Zod**: Schema validation library ensuring data integrity across API boundaries