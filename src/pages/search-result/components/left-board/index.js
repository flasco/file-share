import React from 'react';

export default ({ title, content }) => {
  return (
    <div style={{ padding: 30 }}>
      <div>{title}</div>
      <div style={{ marginTop: 12, textAlign: 'center' }}>{content}</div>
    </div>
  );
};
