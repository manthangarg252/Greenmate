# 🌱 Greenmate - AI Plant Disease Detection

<div align="center">

![Plant Disease Detection](https://img.shields.io/badge/AI-Plant%20Disease%20Detection-green)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-FF6F00?logo=tensorflow&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?logo=express)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)

**An AI-powered plant disease detection application that helps farmers and gardeners identify crop diseases using machine learning.**

[Demo](#-demo) • [Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation)

</div>

## 🌟 Features

- 🤖 **AI-Powered Detection**: Real-time plant disease identification using TensorFlow.js
- 🔒 **Privacy-First**: All image processing happens client-side in your browser
- 🌾 **Multi-Crop Support**: Supports tomatoes, potatoes, and other major crops
- 💊 **Treatment Recommendations**: Get actionable treatment advice for detected diseases
- 📊 **Batch Analysis**: Process multiple images simultaneously
- 🗂️ **Analysis History**: Track and review past disease detections
- 📍 **Location Tracking**: GPS-based analysis with weather integration
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Fast Processing**: Instant results with confidence scores
- 🌐 **Offline Capable**: Models cached for offline usage

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **TensorFlow.js** for client-side ML inference
- **Tailwind CSS** + **Radix UI** for beautiful, accessible components
- **Framer Motion** for smooth animations
- **React Query** for efficient data fetching
- **Wouter** for lightweight routing

### Backend
- **Express.js** with TypeScript
- **Drizzle ORM** with PostgreSQL
- **Passport.js** for authentication
- **WebSocket** support for real-time features
- **Neon Database** for serverless PostgreSQL

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or Neon Database account)

### Installation

1. **Clone the repository**
2. git clone https://github.com/manthangarg252/Greenmate.git
cd Greenmate

text

2. **Install dependencies**
npm install

text

3. **Set up environment variables**

Create a `.env` file in the root directory:

Database Configuration
DATABASE_URL="postgresql://username:password@hostname:port/database"

Session Configuration
SESSION_SECRET="your-super-secret-session-key-change-this-in-production"

Server Configuration
PORT=3000
NODE_ENV=development

text

4. **Initialize the database**
npm run db:push

text

5. **Start the development server**
npm run dev

text

6. **Open your browser**
http://localhost:3000

text

## 📖 Usage

### Basic Disease Detection

1. **Select Crop Type**: Choose your plant type from the dropdown
2. **Upload Image**: Drag & drop or click to upload a plant image
3. **Analyze**: Click "Analyze Image" for AI detection
4. **Review Results**: Get disease predictions with confidence scores
5. **View Treatment**: Access treatment recommendations for detected diseases

### Batch Analysis

1. Navigate to batch analysis section
2. Upload multiple images
3. Select crop type for the batch
4. Start batch processing
5. Monitor progress and download results

### Analysis History

- View all past analyses in your dashboard
- Filter by crop type, date, or disease
- Export analysis data for reporting
- Track disease patterns over time

## 🛠️ Development

### Project Structure

Greenmate/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Application pages
│ │ ├── lib/ # Utilities and services
│ │ └── hooks/ # Custom React hooks
│ └── public/ # Static assets
├── server/ # Express backend
│ ├── routes/ # API route handlers
│ ├── db/ # Database utilities
│ └── middleware/ # Express middleware
├── shared/ # Shared types and schemas
└── attached_assets/ # AI models and static files

text

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run check` | TypeScript type checking |
| `npm run db:push` | Push database schema changes |

### Database Schema

The application uses PostgreSQL with the following main tables:

- **users**: User authentication and profiles
- **analysis_results**: Individual disease detection results
- **disease_info**: Disease information and treatment data
- **batch_analysis**: Batch processing jobs

### Adding New Crop Models

1. Add the TensorFlow.js model to `attached_assets/`
2. Update the crop selector component
3. Add disease classifications in the database
4. Update treatment recommendations

## 🌐 API Documentation

### Authentication Endpoints

POST /api/auth/login # User login
POST /api/auth/register # User registration
POST /api/auth/logout # User logout
GET /api/auth/me # Get current user

text

### Analysis Endpoints

POST /api/analysis # Create new analysis
GET /api/analysis # Get user's analyses
GET /api/analysis/:id # Get specific analysis
POST /api/analysis/batch # Start batch analysis
GET /api/analysis/batch/:id # Get batch status

text

### Disease Information

GET /api/diseases # Get all diseases
GET /api/diseases/:name # Get disease info
GET /api/diseases/crop/:type # Get diseases by crop

text

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `SESSION_SECRET` | Session encryption key | Yes | - |
| `PORT` | Server port | No | 3000 |
| `NODE_ENV` | Environment mode | No | development |

### Model Configuration

Models are automatically downloaded and cached on first use. You can pre-load models by placing them in the `attached_assets/` directory.

## 🚀 Deployment

### Production Build

Build the application
npm run build

Start production server
NODE_ENV=production npm start

text

### Docker Deployment

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

text

### Environment Setup

Ensure your production environment has:
- Node.js 18+
- PostgreSQL database
- SSL certificates (recommended)
- Environment variables configured

## 🧪 Testing

Run the test suite:

Run all tests
npm test

Run tests in watch mode
npm run test:watch

Run tests with coverage
npm run test:coverage

text

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- TensorFlow.js team for browser-based ML
- Plant pathology researchers for disease datasets
- Open source community for amazing libraries
- Agricultural extension services for treatment data

## 📞 Support

- 🐛 [Report Bugs](https://github.com/manthangarg252/Greenmate/issues)
- 💡 [Request Features](https://github.com/manthangarg252/Greenmate/issues)
- 💬 [Discussions](https://github.com/manthangarg252/Greenmate/discussions)
- 📧 Contact: [manthangarg252@github.com](mailto:manthangarg252@github.com)

## 🗺️ Roadmap

- [ ] 📱 Mobile app development (React Native)
- [ ] 🌍 Multi-language support
- [ ] 🤖 Advanced AI models with higher accuracy
- [ ] ☁️ Cloud model serving option
- [ ] 📈 Agricultural analytics dashboard
- [ ] 🌦️ Weather-based disease predictions
- [ ] 👥 Community features and forums
- [ ] 🔔 Real-time disease alerts
- [ ] 📊 Detailed reporting and insights
- [ ] 🌾 Support for more crop varieties

---

<div align="center">

**Made with ❤️ for farmers and gardeners worldwide**

⭐ Star this repo if you found it helpful!

</div>
