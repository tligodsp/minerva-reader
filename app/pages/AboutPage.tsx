import React from 'react';
import { InteractiveRatingBar } from '../components/common/atoms';

const AboutPage = (props) => {
  return (
    <div>
      <button className="button">Primary</button>
      <div style={{ width: 10, height: 10 }}/>
      <button className="button-secondary">Secondary</button>
      <div style={{ width: 10, height: 10 }}/>
      <button className="button-disabled">Disabled</button>
    </div>
  );
}

export default AboutPage;
