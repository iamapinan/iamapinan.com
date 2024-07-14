import React, { useState, useEffect } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsent = checkConsent();
    setVisible(!hasConsent);
  }, []);

  const checkConsent = () => {
    // Check if the user has given consent by checking for a cookie or localStorage value
    // Return true if consent exists, false otherwise
    // Example: return document.cookie.includes('cookieConsent=true');
    return localStorage.getItem('cookieConsent') === 'true';
  };

  const acceptCookies = () => {
    // Set the cookie or localStorage value to remember the user's consent
    // Example: document.cookie = 'cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
    // Example: localStorage.setItem('cookieConsent', 'true');
    localStorage.setItem('cookieConsent', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4">
      <p>We use cookies to improve your experience. By using our site, you accept our use of cookies.</p>
      <button onClick={acceptCookies} className="ml-4 bg-blue-500 px-2 py-1 rounded">
        Accept
      </button>
    </div>
  );
};

export default CookieConsent;