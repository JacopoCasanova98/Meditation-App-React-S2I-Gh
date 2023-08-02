import './App.css';
import image from './img/leaves.png'
import lotos from './img/lotus.png'
import pause from './img/pause.png'
import reset from './img/reset.png'
import React, { useState, useEffect } from 'react';
import { Howl, Howler } from 'howler';
import song1 from './sounds/beach.mp3';
import song2 from './sounds/rain.mp3';
import song3 from './sounds/fire.mp3';
import song4 from './sounds/forest.mp3';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [countdown, setCountdown] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSongs, setCurrentSongs] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);

  const changeTimer = (event) => {
    const time = parseInt(event.target.getAttribute('data-time'));
    setCountdown(time);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  const resetTimer = () => {
    setCountdown(0);
    setIsPaused(false);
  };

  useEffect(() => {
    let interval;
    if (countdown > 0 && !isPaused) {
      interval = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [countdown, isPaused]);

  useEffect(() => {
    if (countdown === 0) {
      stopAllSongs();
    }
  }, [countdown]);

  const stopAllSongs = () => {
    Object.values(currentSongs).forEach((song) => {
      if (song.playing()) {
        song.stop();
      }
    });
  };

  useEffect(() => {
    if (isPaused) {
      pauseAllSongs();
    } else if (isPlaying) {
      playAllSongs();
    }
  }, [isPaused]);

  const songs = {
    'btn1': song1,
    'btn2': song2,
    'btn3': song3,
    'btn4': song4,
  };

  const playSong = (buttonId) => {
    if (currentSongs[buttonId] && currentSongs[buttonId].playing()) {
      setIsPlaying(!isPlaying);
      if (isPlaying) {
        currentSongs[buttonId].pause();
      } else {
        currentSongs[buttonId].play();
      }
    } else {
      const sound = new Howl({
        src: [songs[buttonId]],
        volume: 0.3, 
        onend: () => {
          setIsPlaying(false);
        },
      });
      const updatedSongs = { ...currentSongs, [buttonId]: sound };
      setCurrentSongs(updatedSongs);
      setIsPlaying(true);
      sound.play();
    }
  };

  const pauseAllSongs = () => {
    Object.values(currentSongs).forEach((song) => {
      if (song.playing()) {
        song.pause();
      }
    });
  };

  const playAllSongs = () => {
    Object.values(currentSongs).forEach((song) => {
      if (!song.playing()) {
        song.play();
      }
    });
  };

  return (
    <div className="App">
      <Header />

      <div className="items">
        <div className="items-grid">
          <div className="time-div">
            <h3 className="time-display">{`${Math.floor(countdown / 60)
              .toString()
              .padStart(2, '0')}:${(countdown % 60).toString().padStart(2, '0')}`}</h3>
          </div>

          <div className="buttons-div">
            <button data-time="120" className="time-btn" id="2min" onClick={changeTimer}>
              2 Minutes
            </button>
            <button data-time="300" className="time-btn" id="5min" onClick={changeTimer}>
              5 Minutes
            </button>
            <button data-time="600" className="time-btn" id="10min" onClick={changeTimer}>
              10 Minutes
            </button>
          </div>
        </div>

        <img src={image} alt="circle" className="circle" />
        <img src={lotos} alt="lotos" className="lotos" />
        <img src={pause} alt="pause" className="pause" onClick={pauseTimer} />
        <img src={reset} alt="reset" className="reset" onClick={resetTimer} />
      </div>

      <Footer playSong={playSong} />
    </div>
  );
}

export default App;
