import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Loader = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let hasPlayed = false;

    const attemptPlay = () => {
      if (!audioRef.current || hasPlayed) return;
      
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        hasPlayed = true;
        cleanupListeners();
      }).catch(e => {
        console.log("Autoplay waiting for user interaction...");
      });
    };

    const cleanupListeners = () => {
      window.removeEventListener('click', attemptPlay);
      window.removeEventListener('touchstart', attemptPlay);
      window.removeEventListener('scroll', attemptPlay);
    };

    // Try immediately (works if returning visitor)
    attemptPlay();

    // If blocked, wait for ANY interaction
    window.addEventListener('click', attemptPlay);
    window.addEventListener('touchstart', attemptPlay);
    window.addEventListener('scroll', attemptPlay);

    return cleanupListeners;
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio play failed, probably missing file:", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <StyledWrapper onClick={toggleMusic} $isPlaying={isPlaying}>
      <audio ref={audioRef} src={audioSrc} autoPlay loop style={{ display: 'none' }} />
      
      <div className="loader">
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  z-index: 100;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.4);
  padding: 12px 15px;
  border-radius: 50%;
  backdrop-filter: blur(4px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  .loader {
    display: flex;
    align-items: center;
  }

  .bar {
    display: inline-block;
    width: 3px;
    height: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 10px;
    /* Animate only when playing */
    animation: ${props => props.$isPlaying ? 'scale-up4 1s linear infinite' : 'none'};
    transform: ${props => props.$isPlaying ? 'none' : 'scaleY(0.4)'};
    transition: transform 0.3s ease;
  }

  .bar:nth-child(2) {
    height: 35px;
    margin: 0 5px;
    animation-delay: 0.25s;
    transform: ${props => props.$isPlaying ? 'none' : 'scaleY(0.4)'};
  }

  .bar:nth-child(3) {
    animation-delay: 0.5s;
  }

  @keyframes scale-up4 {
    20% {
      background-color: #ffff;
      transform: scaleY(1.5);
    }
    40% {
      transform: scaleY(1);
    }
  }
`;

export default Loader;
