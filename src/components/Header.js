import React from 'react';
import flower from '../img/lotus-flower.png';
import meditation from '../img/meditation.png';

const Header = () => {
  return (
    <header className="App-header">
      <img src={flower} alt="lesa" className="flower" />
      <h2>Meditation App</h2>
      <img src={meditation} alt="meditation" className="meditation" />
    </header>
  );
};

export default Header;