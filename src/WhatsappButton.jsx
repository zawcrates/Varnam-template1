import React from 'react';
import styled from 'styled-components';

const WhatsappButton = ({ whatsappNumber }) => {
  return (
    <StyledWrapper>
      <div className="container">
        <a 
          className="toggle"
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="button" />
          <span className="label">
            <img src="/whatsapp.png" alt="WhatsApp RSVP" className="whatsapp-icon" />
          </span>
        </a>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: absolute;
  top: 69.5%; /* Position below the map inside canvas 3 */
  left: 50%;
  z-index: 100;

  /* Scale the whole button and center it */
  transform: translateX(-50%) scale(1.2);
  transform-origin: center;

  @media (max-width: 1024px) {
    transform: translateX(-50%) scale(0.7);
  }

  @media (max-width: 768px) {
    transform: translateX(-50%) scale(0.6);
  }

  @media (max-width: 480px) {
    transform: translateX(-50%) scale(0.45);
  }

  .toggle {
    display: inline-block;
    position: relative;
    height: 100px;
    width: 100px;
    outline: none;
    text-decoration: none;
  }

  .toggle:before {
    box-shadow: 0;
    border-radius: 84.5px;
    background: #272727;
    position: absolute;
    margin-left: -36px;
    margin-top: -36px;
    opacity: 0.2;
    height: 72px;
    width: 72px;
    left: 50%;
    top: 50%;
    content: '';
  }

  .toggle .button {
    transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 15px 25px -4px rgba(0, 0, 0, 0.5), inset 0 -3px 4px -1px rgba(0, 0, 0, 0.2), 0 -10px 15px -1px rgba(60, 60, 60, 0.6), inset 0 3px 4px -1px rgba(131, 71, 1, 0.8), inset 0 0 5px 1px rgba(131, 71, 1, 0.8), inset 0 20px 30px 0 rgba(131, 71, 1, 0.5);
    border-radius: 68.8px;
    position: absolute;
    background: #834701; /* Themed dark brown */
    margin-left: -34.4px;
    margin-top: -34.4px;
    display: block;
    height: 68.8px;
    width: 68.8px;
    left: 50%;
    top: 50%;
  }

  .toggle .label {
    transition: transform 300ms ease-out;
    line-height: 101px;
    text-align: center;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    pointer-events: none; /* Let clicks pass through to anchor */
  }

  .whatsapp-icon {
    width: 38px;
    height: 38px;
    object-fit: contain;
    /* Optional: drop shadow to make the icon pop */
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
  }

  .toggle:active .button {
    filter: blur(0.5px);
    box-shadow: 0 12px 25px -4px rgba(0, 0, 0, 0.4), inset 0 -8px 30px 1px rgba(25, 23, 23, 0.9), 0 -10px 15px -1px rgba(60, 57, 57, 0.6), inset 0 8px 25px 0 rgba(0, 0, 0, 0.4), inset 0 0 10px 1px rgba(56, 56, 56, 0.6);
  }

  .toggle:active .label {
    transform: scale(0.9);
  }
`;

export default WhatsappButton;
