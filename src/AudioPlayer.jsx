import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <StyledWrapper>
      <div className="audio-player-container" onClick={togglePlay}>
        <div className={`eq-container ${isPlaying ? 'playing' : ''}`}>
          <div className="eq-bar bar1"></div>
          <div className="eq-bar bar2"></div>
          <div className="eq-bar bar3"></div>
          <div className="eq-bar bar4"></div>
        </div>
      </div>
      <audio ref={audioRef} src={audioSrc} loop style={{ display: 'none' }} />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  top: 15vw; /* Adjusted to sit under the corner decoration */
  right: 5vw;
  z-index: 100;

  .audio-player-container {
    width: 60px;
    height: 60px;
    background-color: #5c3201; /* Matching the dark brown in the image */
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .audio-player-container:hover {
    transform: scale(1.05);
    background-color: #834701;
  }

  .eq-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 24px;
    height: 24px;
  }

  .eq-bar {
    width: 4px;
    background-color: #e5d9c5; /* Match parchment theme off-white */
    border-radius: 2px;
    transition: height 0.3s ease;
  }

  /* Default Paused State */
  .eq-bar.bar1 { height: 10px; }
  .eq-bar.bar2 { height: 16px; }
  .eq-bar.bar3 { height: 22px; }
  .eq-bar.bar4 { height: 14px; }

  /* Playing State (Animated) */
  .playing .eq-bar {
    animation: bounce 1.2s ease infinite alternate;
  }

  .playing .eq-bar.bar1 { animation-delay: 0.1s; }
  .playing .eq-bar.bar2 { animation-delay: 0.3s; }
  .playing .eq-bar.bar3 { animation-delay: 0.5s; }
  .playing .eq-bar.bar4 { animation-delay: 0.2s; }

  @keyframes bounce {
    0% { height: 6px; }
    50% { height: 24px; }
    100% { height: 12px; }
  }

  @media (max-width: 768px) {
    top: 25vw;
    right: 5vw;
    
    .audio-player-container {
      width: 50px;
      height: 50px;
    }
    
    .eq-container {
      width: 20px;
      height: 20px;
    }
    
    .eq-bar {
      width: 3px;
    }
  }
`;

export default AudioPlayer;
