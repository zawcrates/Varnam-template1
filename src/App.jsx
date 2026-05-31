import React, { useEffect, useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './Loader';
import WhatsappButton from './WhatsappButton';

gsap.registerPlugin(ScrollTrigger);

function App({ 
  // When you add this template to your website, you can pass these values as props!
  inviteData = {
    groomName: "Joeseph Vijay",
    connector: "Weds",
    brideName: "Trisha Krishnan",
    
    // New Invite Section Texts
    welcomeTop: "TOGETHER WITH THEIR FAMILIES",
    andText: "AND",
    inviteText1: "cordially invite you and your family to join the occasion of",
    inviteText2: "their joyous wedding festivities",
    month: "NOVEMBER",
    dateDetails: "SUNDAY | 23 | 2025",
    time: "7:45 AM - 8:45 AM",
    locationLine1: "THE GRAND BALLROOM",
    locationLine2: "123 WEDDING AVENUE, NEW YORK",
    
    // Map Details
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    
    // Story / Dummy Text Section
    storyText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    
    // RSVP Details
    whatsappNumber: "1234567890", // Add country code without + or spaces, e.g., 919876543210
    
    // Background Music (MP3 File Link)
    audioSrc: "/bg_music.mp3" // Place background-music.mp3 in the public folder
  }
}) {
  const bgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 35, // Use yPercent for more robust mobile scaling
        ease: 'none',
        scrollTrigger: {
          trigger: '.background-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.08, smoothWheel: true }}>
      <div className="app-container">
        
        {/* We moved bgRef to the wrapper so the text also parallaxes with the sky! */}
        <div className="background-wrapper" ref={bgRef}>
          <img 
            src="/background.png" 
            alt="Background" 
            className="hero-background" 
          />
          <div className="hero-names-container">
            <h1 className="editable-text name-primary">{inviteData.groomName}</h1>
            <h2 className="editable-text name-connector">{inviteData.connector}</h2>
            <h1 className="editable-text name-primary">{inviteData.brideName}</h1>
          </div>
        </div>

        <div className="foreground-wrapper">
          {/* We wrap individual images in a relative container so absolute text aligns perfectly to them */}
          <div className="image-overlay-container">
            <img 
              src="/foreground.png" 
              alt="Foreground" 
              className="hero-foreground" 
            />
          </div>
          
          <div className="image-overlay-container">
            <img src="/invite.png" alt="Invite" className="invite-image" />
            <div className="invite-text-container">
              <p className="invite-welcome">{inviteData.welcomeTop}</p>
              
              <h2 className="invite-name">{inviteData.groomName}</h2>
              <p className="invite-and">{inviteData.andText}</p>
              <h2 className="invite-name">{inviteData.brideName}</h2>
              
              <div className="invite-message">
                <p>{inviteData.inviteText1}</p>
                <p>{inviteData.inviteText2}</p>
              </div>
              
              <p className="invite-month">{inviteData.month}</p>
              <p className="invite-date">{inviteData.dateDetails}</p>
              <p className="invite-time">{inviteData.time}</p>
              
              <div className="invite-location">
                <p>{inviteData.locationLine1}</p>
                <p>{inviteData.locationLine2}</p>
              </div>
            </div>
          </div>
          
          <div className="image-overlay-container">
            <img src="/canvas 1.png" alt="Canvas 1" className="canvas-image" />
            <div className="story-text-container">
              <p>{inviteData.storyText}</p>
            </div>
          </div>
          
          <div className="image-overlay-container">
            <img src="/canvas 3.png" alt="Canvas 3" className="canvas-image" />
            
            <div className="map-iframe-container">
              <iframe 
                src={inviteData.mapEmbedUrl}
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location"
              ></iframe>
            </div>
            
            <WhatsappButton whatsappNumber={inviteData.whatsappNumber} />
          </div>

        </div>

      </div>
      <Loader audioSrc={inviteData.audioSrc} />
    </ReactLenis>
  );
}

export default App;
