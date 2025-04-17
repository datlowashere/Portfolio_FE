# Portfolio Frontend

This is the frontend application for the personal portfolio website built with React, TypeScript, and Material-UI.

## Technologies Used

- React 18
- TypeScript
- Material-UI (MUI)
- Vite
- Axios for API calls

## Features

- Responsive design
- Dark/Light theme support
- Dynamic content loading
- Sections:
  - Home/About
  - Skills
  - Experience/Education Timeline
  - Projects
  - Contact Form

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
4. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
5. Update the environment variables in `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

### Development

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── components/  # Reusable components
│   ├── pages/       # Page components
│   ├── services/    # API services
│   ├── types/       # TypeScript interfaces
│   ├── contexts/    # React contexts
│   └── App.tsx      # Main application component
├── .env.example     # Example environment variables
├── index.html       # Entry HTML file
└── vite.config.ts   # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | http://localhost:5000/api |

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Submit a pull request

## License

This project is licensed under the MIT License. 