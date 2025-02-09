import React from 'react';

const Header: React.FC  = () => {  return (
    <header className="header">
      <div>
        <a title="Home" target="_blank" href="https://halgurdh.github.io/" className="text-muted">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="home">
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.12/css/weather-icons.min.css" integrity="sha512-Yzl+CLg+Ea7e+wZ7K13WnzTp7s+h4P5m0n8tL1rRdrtV8K5k+yJjXQ6o54d+t/57XFjL1yK6lBwXk3lXNxl2w==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
          <path d="M8.543 2.232a.75.75 0 0 0-1.085 0l-5.25 5.5A.75.75 0 0 0 2.75 9H4v4a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V9h1.25a.75.75 0 0 0 .543-1.268l-5.25-5.5Z" />
          </svg>
        </a>
      </div>
    </header>
  );
};

export default Header;
