import React from 'react';
import Header from './Header';

function About() {
  return (
    <div className="h-screen grid grid-rows-[80px,1fr]">
      <Header />
      <div className="flex justify-center items-center bg-aqua-haze">
        Teste
      </div>
    </div>
  );
}

export default About;
