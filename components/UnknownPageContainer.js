import React from 'react';
import PageTemplate from './PageTemplate';

const UnknownPageContainer = () => {
  const title = '[UNKNOWN PAGE]';
  return (
    <PageTemplate title={title}>Page Not Found</PageTemplate>
  );
};

export default UnknownPageContainer;