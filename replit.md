# Overview

This is a crop disease detection web application that uses machine learning to analyze plant images and identify diseases. The application allows users to select different crop types (apple, corn, grape, peach, pepper, tomato), upload images, and receive AI-powered disease diagnosis along with treatment recommendations. Built as a full-stack application with a React frontend and Express.js backend, it leverages TensorFlow.js for client-side machine learning inference using pre-trained Teachable Machine models.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses a modern React stack with TypeScript and Vite for development and building. The UI is built with shadcn/ui components and Radix UI primitives for accessibility, styled with Tailwind CSS using a custom design system with agricultural-themed colors (greens and earth tones). State management is handled through React hooks and TanStack Query for server state management. The application follows a component-based architecture with reusable UI components and custom hooks.

## Machine Learning Integration
The application uses TensorFlow.js for client-side inference with pre-trained image classification models created using Google's Teachable Machine platform. Each crop type has its own dedicated model stored in the `/models` directory with corresponding metadata and model topology files. The TensorFlow service manages model loading, caching, and prediction generation, supporting six different crop types with their respective disease classifications.

## Backend Architecture
The server is built with Express.js and follows a minimal REST API pattern. The backend serves static model files, provides an API endpoint for available models, and includes development middleware for Vite integration. The server uses TypeScript with ES modules and includes custom logging middleware for API requests.

## Data Storage
The application currently uses in-memory storage with a `MemStorage` class implementing basic CRUD operations for user management. Database schema is defined using Drizzle ORM with PostgreSQL support, though the current implementation doesn't actively use the database. The schema includes a users table with UUID primary keys and basic authentication fields.

## Authentication System
Basic user authentication infrastructure is in place with schema definitions for users including username and password fields. The system uses Zod for schema validation and includes session management setup with `connect-pg-simple`, though authentication is not actively implemented in the current application flow.

## Treatment Database
The application includes a comprehensive treatment recommendation system with organic, chemical, and cultural treatment options for each identified disease. Treatment recommendations are categorized by severity levels (low, moderate, high) and include detailed instructions, application methods, and safety tips.

# External Dependencies

## Machine Learning Services
- **TensorFlow.js**: Client-side machine learning inference engine for image classification
- **Teachable Machine Models**: Pre-trained image classification models for crop disease detection, hosted locally

## UI Framework
- **Radix UI**: Headless UI components for accessibility and behavior
- **shadcn/ui**: Component library built on Radix UI with consistent styling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography

## Database & Storage
- **Drizzle ORM**: TypeScript ORM for database operations
- **PostgreSQL**: Primary database (configured via Neon Database serverless)
- **connect-pg-simple**: Session store for PostgreSQL

## Development Tools
- **Vite**: Build tool and development server
- **React Router (Wouter)**: Lightweight client-side routing
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation

## Backend Services
- **Express.js**: Web application framework
- **cors**: Cross-origin resource sharing middleware
- **tsx**: TypeScript execution engine for development