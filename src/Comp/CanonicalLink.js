import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const CanonicalLink = () => {
  const location = useLocation();
  const baseUrl = 'https://www.webthreeworld.com';

  return (
    <Helmet>
      <link rel="canonical" href={`${baseUrl}${location.pathname}`} />
    </Helmet>
  );
};

export default CanonicalLink;
