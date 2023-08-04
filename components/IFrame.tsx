import React from 'react';

const IFrame = ({src, title, allow, sandbox}: {src: string, title: string, allow?: string, sandbox?:string}) => {
  return (
    <iframe
      src={src}
      style={{ width: '100%', height: '500px', border: '0', borderRadius: '4px', overflow: 'hidden' }}
      title={title}
      allow={allow}
      sandbox={sandbox}
    ></iframe>
  );
};

export default IFrame;