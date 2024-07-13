import React, { useState } from 'react';

const CookieConsent = () => {
  const [visible, setVisible] = useState(true);

  const acceptCookies = () => {
    setVisible(false);
    // Set a cookie or localStorage to remember the consent
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