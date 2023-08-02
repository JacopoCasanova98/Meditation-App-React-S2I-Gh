import React from 'react';

const Footer = ({ playSong }) => {
  return (
    <footer className="footer">
      <button className="btn-footer" onClick={() => playSong('btn1')}>🔊 🌊</button>
      <button className="btn-footer" onClick={() => playSong('btn2')}>🔊 🌧</button>
      <button className="btn-footer" onClick={() => playSong('btn3')} >🔊 🔥</button>
      <button className="btn-footer" onClick={() => playSong('btn4')} >🔊 🌲</button>
    </footer>
  );
};

export default Footer;