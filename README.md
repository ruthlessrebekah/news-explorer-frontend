# News Explorer Frontend

A responsive, accessible news search and bookmarking app built with React and Vite. This project is designed for Project 16 submission and demonstrates best practices in UI/UX, authentication, validation, error handling, and maintainability.

---

## About

News Explorer allows users to search for news articles, save favorites, and manage their saved news. The app features robust authentication, defensive programming, and a polished, Figma-accurate design for desktop, tablet, and mobile.

- Search news articles from the NewsAPI
- Register and log in securely
- Save and remove articles
- View saved articles with keyword filtering
- Responsive layout for all screen sizes
- Accessibility and keyboard navigation
- Defensive error handling and validation

## Project Pitch Video

**Watch the project pitch video:**
Check out this video (https://www.loom.com/share/8d0d9e592d934edcb12786839e9643b2), where I describe my
project and some challenges I faced while building it.

**Disclaimer:**
Loom does not allow free account users to download their videos. If you need a downloadable copy for review or Google Drive upload, please contact me and I will provide access or an alternative solution.

---

## Features

- **React 18+** with hooks and context for state management
- **Vite** for fast development and HMR
- **Custom authentication stubs** (ready for backend integration)
- **Comprehensive user data validation** (see `src/utils/validateUser.js`)
- **Session restoration and error handling**
- **Figma-accurate layout** for all major breakpoints
- **Accessibility**: focus management, ARIA labels, keyboard support
- **Defensive programming**: early returns, error collection, safe rendering
- **LocalStorage** for session and saved articles persistence
- **Linting**: ESLint with strict rules

## Technologies Used

- React
- Vite
- JavaScript (ES6+)
- CSS (custom, Figma-based)
- NewsAPI
- ESLint

## Setup & Running Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ruthlessrebekah/news-explorer-frontend.git
   cd news-explorer-frontend
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   - If you do not provide a NewsAPI key, the app will show an error message when you try to search for news articles.
   - You may create a `.env` file in the project root and add your NewsAPI key as `VITE_NEWS_API_KEY`.
   - If a `.env.example` file is present, copy it to `.env` and fill in your key.

## Requirements

- Node.js v18 or higher recommended

4. **Start the development server:**
   ```bash
   npm run dev
   ```
5. **Lint the code:**
   ```bash
   npm run lint
   ```

## Folder Structure

- `src/components/` — All React components (modals, cards, navigation, etc.)
- `src/utils/` — Utility functions (API, auth, validation)
- `src/contexts/` — React context providers for auth and user
- `src/assets/` — Images and fonts
- `public/` — Static assets

## Edge Cases & Known Issues

- Saved News page spacing and background are Figma-accurate for main scenarios. Minor edge cases (single row, empty state) may show extra space; this is intentional and documented.
- Authentication is stubbed for demo; backend integration is ready for future updates.

## Review Notes

- All major requirements for Project 16 are implemented
- Defensive validation and error handling throughout
- Responsive and accessible design
- Code is linted and passes all checks
- Ready for final About section and pitch video

---

## License

MIT

## Known Edge Case: Saved News Spacing

On the Saved News page, the spacing and background color below the card list are Figma-accurate for typical cases (multiple rows of cards) on both desktop and mobile. However, in edge cases where there is only one row of cards on mobile, or no saved news cards at all, there may be extra white space between the gray background and the footer, or the background may not appear. This is due to the flex and padding logic required to match the Figma spec for the main use cases.

No Figma design specifications were provided for these edge cases. This behavior is noted and intentional, as the implementation prioritizes Figma-accurate layout for the primary scenarios. If future design guidance is provided for these edge cases, the implementation can be updated accordingly.
