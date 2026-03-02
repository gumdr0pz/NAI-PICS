# Cognitive Intel - National Psychographic System

A high-scale population intelligence platform for predictive governance, narrative analysis, and cognitive situational awareness based on national-level AI psychographics.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes with Node.js)
- A Google Gemini API Key (Get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey))

## Getting Started

1. **Clone or Download** the project files into a folder on your computer.
2. **Open a Terminal** (or Command Prompt) and navigate to the project folder.
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Configure Environment Variables**:
   - Create a new file named `.env` in the root directory.
   - Copy the contents of `.env.example` into it, or simply add your API key:
     ```env
     GEMINI_API_KEY=your_actual_api_key_here
     ```
5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
6. **View the Application**:
   Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Project Structure

- `src/App.tsx`: Main application component and layout.
- `src/components/`: Individual view components (Strategic, Psychographic, etc.).
- `src/constants.tsx`: Mock data and configuration constants.
- `src/types.ts`: TypeScript interfaces and types.
- `vite.config.ts`: Vite configuration for the development server and environment variables.

## Technologies Used

- **React 19**: UI Framework
- **Vite**: Build tool and development server
- **Tailwind CSS**: Styling (via CDN in `index.html`)
- **Lucide React**: Icon library
- **Recharts**: Data visualization
- **Google Generative AI SDK**: For AI-powered strategic outlooks
- **jsPDF**: For report generation
