# 1lasthour - Financial & CFA Study Tool

A modern React application built with Vite, designed to serve as a comprehensive study companion for CFA Level 1 candidates and a personal financial tracking dashboard.

## 🌟 Features

### 📚 CFA Level 1 Curriculum Browser
- **Complete Syllabus**: Organized by topics (Quantitative Methods, Economics, Financial Statement Analysis, etc.).
- **Interactive Modules**: Detailed breakdown of learning modules with key concepts.
- **Formula Library**: Mathematical formulas rendered beautifully using KaTeX.
- **Cheat Sheets**: Quick reference guides for supported topics.
- **Smart Data Structure**: Efficiently structured JSON-like data with runtime icon hydration.

### 📊 Dashboard & Analytics
- **Financial Tracking**: Tools for tracking personal finances (Expenses, Income, Investments).
- **Visualizations**: Charts and data representations for better insights.
- **Design System**: A cohesive UI built with Tailwind CSS v4 and Lucide icons.

### 🌓 Core Capabilities
- **Theme Support**: Seamless Dark/Light mode toggling across the entire application.
- **Performance Optimized**: Built with strict React optimization patterns, including memoization and code-splitting.
- **Accessible Design**: Focus on usability with accessible and clean components.

## 🛠 Tech Stack

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4, `clsx`, `tailwind-merge`
- **State Management**: Zustand, React Query (`@tanstack/react-query`)
- **Routing**: React Router v7
- **Icons & Typography**: Lucide React
- **Math Rendering**: KaTeX / `react-katex`
- **Code Quality**: ESLint (Flat config), Prettier

## 📂 Project Structure

This project follows a feature-based folder architecture to maintain scalability and clean modularity:

```text
src/
├── assets/       # Static assets like images and global CSS
├── components/   # Reusable, isolated UI components
├── config/       # Application-wide configurations
├── constants/    # Global constants and hardcoded values
├── features/     # Encapsulated feature modules
│   ├── cfa/      # CFA curriculum study tools and data
│   ├── dashboard/# Financial tracking dashboard
│   ├── landing/  # Marketing and entry pages
│   └── misc/     # Miscellaneous features
├── hooks/        # Global custom React hooks
├── providers/    # React context providers
├── router/       # Routing configuration using React Router v7
├── services/     # External API and service integrations
├── store/        # Global state management (Zustand)
├── styles/       # Global styling configurations
├── types/        # Type definitions and generic models
└── utils/        # Shared utility functions (e.g., tailwind merge)
```

## 🚀 Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Preview Production Build**
   ```bash
   npm run preview
   ```

## 📝 Coding Standards & Guidelines

- **Feature Boundaries**: Features are isolated; avoid cross-feature imports unless using standard shared utilities.
- **Barrel Files**: Usage of `index.js` for clean exports across modules.
- **React Patterns**: Components must implement proper prop validation and hooks for logic extraction.
- **Imports**: Utilize path aliases for cleaner import statements and enforce import sorting.

## 📄 License

Private project.
