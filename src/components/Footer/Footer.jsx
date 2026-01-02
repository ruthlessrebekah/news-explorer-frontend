// Footer.jsx
import "./Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <div className="Footer__copyright">
        © 2025 Supersite, Powered by News API
      </div>
      <nav className="Footer__nav">
        <a href="/" className="Footer__link">
          Home
        </a>
        <a
          href="https://tripleten.com"
          className="Footer__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          TripleTen
        </a>
        <a
          href="https://github.com/ruthlessrebekah"
          className="Footer__icon Footer__icon--github"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.36 6.84 9.72.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.11-1.48-1.11-1.48-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.38 9.38 0 012.5-.34c.85.01 1.71.12 2.5.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.89 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48A10.01 10.01 0 0022 12.26C22 6.58 17.52 2 12 2z"
              fill="#222"
            />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/rebekah-crockatt"
          className="Footer__icon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75c.97 0 1.75.79 1.75 1.75s-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.07-.93-1.5-1.5-1.5s-1.5.43-1.5 1.5v4.5h-3v-9h3v1.22c.41-.63 1.36-1.22 2.5-1.22 1.93 0 3.5 1.57 3.5 3.5v5.5z"
              fill="#222"
            />
          </svg>
        </a>
      </nav>
    </footer>
  );
}

export default Footer;
