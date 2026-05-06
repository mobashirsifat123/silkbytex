import React from 'react';

export default function GlobalAtmosphere() {
  return (
    <div aria-hidden="true" className="global-atmosphere">
      <div className="global-atmosphere__lighting" />
      <div className="global-atmosphere__glow" />
      <div className="global-atmosphere__depth" />
      <div className="global-atmosphere__grain" />
    </div>
  );
}
