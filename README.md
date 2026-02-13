# AURA E-Commerce Platform

A premium, modern E-Commerce platform built with a focus on performance, scalability, and a superior user experience.

## 🚀 Technology Stack

### Frontend

- **React 19 & Vite**: Ultra-fast development and optimized build performance.
- **Tailwind CSS v4**: Utilizing the latest `@theme` engine for a fully centralized design system.
- **Zustand**: Lightweight and scalable state management.
- **Framer Motion**: Premium micro-animations and smooth page transitions.
- **Recharts**: Dynamic data visualization for the Admin analytics dashboard.
- **Lucide React**: consistent and beautiful iconography.
- **React Router 7**: Robust client-side navigation.

### Backend

- **Node.js & Express 5**: Modern server-side logic with improved routing.
- **MongoDB & Mongoose**: Flexible and scalable NoSQL database.
- **Redis (Upstash)**: High-speed caching for performance optimization.
- **JSON Web Tokens (JWT)**: Secure authentication with Access and Refresh tokens stored in HttpOnly cookies.
- **Stripe API**: Secure and seamless payment processing.
- **Cloudinary**: High-performance image hosting and optimization.

## 🎨 Design System & Theming

AURA features a state-of-the-art **Centralized Color Bank** located in `frontend/src/index.css`. This allows for global theme changes by modifying a single set of variables.

- **Semantic Tokens**: `primary`, `surface`, `bg-dark`, and `main-gradient`.
- **Dynamic Gradients**: Utilizes `color-mix` to ensure background effects automatically adapt to brand color changes.

## ✨ Key Features

- **Modern UI/UX**: A sleek, dark-mode-first aesthetic with glassmorphism and premium gradients.
- **Admin Suite**: Real-time analytics, product inventory management, and featured items control.
- **Secure Payments**: Fully integrated Stripe checkout with success and cancellation handling.
- **Optimized Performance**: Independent frontend and backend deployment on Vercel for maximum reliability and speed.
- **Responsive Design**: Mobile-first approach ensuring a perfect experience on all devices.

## 📁 Project Structure

```text
AURA/
├── frontend/             # React Client
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── stores/      #zustand state management
│   │   ├── pages/       # Page views
│   │   └── index.css    # Centralized theme config
│   └── vercel.json      # Frontend deployment & API proxy
├── backend/              # Node.js API
│   ├── routes/          # API endpoints
│   ├── models/          # Database schemas
│   ├── lib/             # Utilities (DB, Redis, etc.)
│   └── vercel.json      # Serverless function config
└── README.md             # Project documentation
```

## 🛠️ Getting Started

### Prerequisites

- Node.js installed
- MongoDB URI
- Redis credentials
- Stripe & Cloudinary API keys

### Installation

1. Clone the repository.
2. **Backend Setup**:
   - `cd backend`
   - `npm install`
   - Create a `.env` file based on the documentation.
   - `npm run dev`
3. **Frontend Setup**:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

## 🌐 Deployment

The project is configured for **Independent Deployment** on Vercel.

- The frontend uses `vercel.json` rewrites to proxy `/api` calls to the backend.
- The backend is configured as a serverless environment for high availability.

---

_Created with ❤️ by the AURA Development Team_
