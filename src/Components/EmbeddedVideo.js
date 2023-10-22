import React from 'react';

function EmbeddedVideo({ embedCode }) {
  return (
    <div>
      <h2>Embedded Video</h2>
      <div dangerouslySetInnerHTML={{ __html: embedCode }}></div>
    </div>
  );
}

export default EmbeddedVideo;
