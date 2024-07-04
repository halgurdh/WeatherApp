import React from 'react';


const Footer: React.FC  = () => {  return (
    <footer className="footer">
      <div className="container">
        <span className="text-muted">© K*tRegen {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
};

export default Footer;
