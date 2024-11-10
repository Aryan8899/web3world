// Comp/RobotsTags.js
import React from 'react';
import { Helmet } from 'react-helmet';

const RobotsTags = ({ index = true, follow = true }) => {
  const content = `${index ? 'index' : 'noindex'}, ${follow ? 'follow' : 'nofollow'}`;

  return (
    <Helmet>
      <meta name="robots" content={content} />
    </Helmet>
  );
};

export default RobotsTags;
