import React, { useEffect, useRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from './Loader';
import WhatsappButton from './WhatsappButton';
import SitePreloader from './SitePreloader';

gsap.registerPlugin(ScrollTrigger);

function App({ 
  // When you add this template to your website, you can pass these values as props!
  inviteData = {
    showPreloader: false, // Toggle this to false in the dashboard to remove the preloader
    preloaderTime: 0.7, // Adjustable preloader time in seconds (max 1.2s). 
    groomName: "Virat Kohli",
    connector: "Weds",
    brideName: "Anushka Sharma",
    
    // New Invite Section Texts
    welcomeTop: "Together with Their Families",
    andText: "And",
    inviteText1: "cordially invite you and your family to join the occasion of",
    inviteText2: "their joyous wedding festivities",
    month: "November",
    dateDetails: "Sunday, 23rd November 2025",
    time: "7:45 AM - 8:45 AM",
    locationLine1: "The Grand Ballroom",
    locationLine2: "123 Wedding Avenue, New York",
    
    // Map Details
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.001696423075!2d77.5945627!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    
    // Events Section
    eventsTitle: "The Wedding Festivities",
    events: [
      { 
        id: 1, 
        name: "Haldi Ceremony", 
        date: "Friday, Nov 21, 2025", 
        time: "10:00 AM - 1:00 PM",
        image: "https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?q=80&w=400&auto=format&fit=crop"
      },
      { 
        id: 2, 
        name: "Mehendi & Sangeet", 
        date: "Saturday, Nov 22, 2025", 
        time: "4:00 PM Onwards",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop"
      },
      { 
        id: 3, 
        name: "Wedding Ceremony", 
        date: "Sunday, Nov 23, 2025", 
        time: "7:45 AM - 8:45 AM",
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop"
      },
      { 
        id: 4, 
        name: "Reception Party", 
        date: "Sunday, Nov 23, 2025", 
        time: "7:00 PM Onwards",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
      }
    ],
    
    // RSVP Details
    whatsappNumber: "1234567890", // Add country code without + or spaces, e.g., 919876543210
    
    // Background Music (MP3 File Link)
    audioSrc: "/bg_music.mp3" // Place background-music.mp3 in the public folder
  }
}) {
  const bgRef = useRef(null);
  const carouselRef = useRef(null);

  const events = inviteData.events || [];
  const tripledEvents = [
    ...events.map((e, idx) => ({ ...e, uniqueId: `set1-${e.id}-${idx}` })),
    ...events.map((e, idx) => ({ ...e, uniqueId: `set2-${e.id}-${idx}` })),
    ...events.map((e, idx) => ({ ...e, uniqueId: `set3-${e.id}-${idx}` }))
  ];

  useEffect(() => {
    if (carouselRef.current && events.length > 0) {
      const track = carouselRef.current;
      // Scroll to start of second set (set2)
      const cardWidth = track.scrollWidth / 3;
      track.scrollLeft = cardWidth;
    }
  }, [events.length]);

  const handleScroll = () => {
    if (!carouselRef.current || events.length === 0) return;
    const track = carouselRef.current;
    const cardWidth = track.scrollWidth / 3;

    // Wrap around to keep scroll infinite
    if (track.scrollLeft <= 5) {
      track.scrollLeft += cardWidth;
    } else if (track.scrollLeft >= cardWidth * 2 - 5) {
      track.scrollLeft -= cardWidth;
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: isMobile ? 65 : 35, // Increased parallax depth shift on mobile
        ease: 'none',
        scrollTrigger: {
          trigger: '.background-wrapper',
          start: 'top top',
          end: 'bottom top',
          scrub: isMobile ? 1.2 : true, // Slower/smoothed scrub speed for visible mobile parallax
          invalidateOnRefresh: true
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const isMobileScreen = typeof window !== 'undefined' && window.innerWidth <= 768;

  const lenisOptions = {
    lerp: isMobileScreen ? 0.04 : 0.08, // Lower lerp slows down scroll rate for mobile
    smoothWheel: true,
    smoothTouch: true,
    touchMultiplier: isMobileScreen ? 0.7 : 1.5, // Reduces rapid touch swipe speed on mobile
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <div className="app-container">
        
        {/* We moved bgRef to the wrapper so the text also parallaxes with the sky! */}
        <div className="background-wrapper" ref={bgRef}>
          <img 
            src="/background.webp" 
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
              src="/foreground.webp" 
              alt="Foreground" 
              className="hero-foreground" 
            />
          </div>
          
          <div className="image-overlay-container">
            <img src="/invite.webp" alt="Invite" className="invite-image" />
            <div className="invite-text-container">
              <p className="invite-welcome">{inviteData.welcomeTop}</p>
              
              <h2 className="invite-name">{inviteData.groomName}</h2>
              <p className="invite-and">{inviteData.andText}</p>
              <h2 className="invite-name">{inviteData.brideName}</h2>
              
              <div className="invite-message">
                <p>{inviteData.inviteText1}</p>
                <p>{inviteData.inviteText2}</p>
              </div>
              
              <div className="details-block">
                {/* DATE ROW */}
                <div className="info-row">
                  <div className="info-icon-container">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#834701" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="17" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                      <circle cx="8" cy="14" r="1" fill="#834701" />
                      <circle cx="12" cy="14" r="1" fill="#834701" />
                      <circle cx="16" cy="14" r="1" fill="#834701" />
                    </svg>
                  </div>
                  <div className="info-vertical-line"></div>
                  <div className="info-content">
                    <span className="info-label">DATE</span>
                    <span className="info-value">{inviteData.dateDetails}</span>
                  </div>
                </div>

                <div className="info-row-divider">
                  <svg viewBox="0 0 200 12" width="100%" height="12">
                    <line x1="0" y1="6" x2="88" y2="6" stroke="#834701" strokeWidth="0.6" strokeDasharray="2,2" />
                    <polygon points="100,2 103,6 100,10 97,6" fill="#834701" />
                    <line x1="112" y1="6" x2="200" y2="6" stroke="#834701" strokeWidth="0.6" strokeDasharray="2,2" />
                  </svg>
                </div>

                {/* TIME ROW */}
                <div className="info-row">
                  <div className="info-icon-container">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#834701" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15 14.5" />
                    </svg>
                  </div>
                  <div className="info-vertical-line"></div>
                  <div className="info-content">
                    <span className="info-label">TIME</span>
                    <span className="info-value">{inviteData.time}</span>
                  </div>
                </div>

                <div className="info-row-divider">
                  <svg viewBox="0 0 200 12" width="100%" height="12">
                    <line x1="0" y1="6" x2="88" y2="6" stroke="#834701" strokeWidth="0.6" strokeDasharray="2,2" />
                    <polygon points="100,2 103,6 100,10 97,6" fill="#834701" />
                    <line x1="112" y1="6" x2="200" y2="6" stroke="#834701" strokeWidth="0.6" strokeDasharray="2,2" />
                  </svg>
                </div>

                {/* VENUE ROW */}
                <div className="info-row">
                  <div className="info-icon-container">
                    <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="#834701" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div className="info-vertical-line"></div>
                  <div className="info-content">
                    <span className="info-label">VENUE</span>
                    <span className="info-value info-venue">
                      <span className="venue-line">{inviteData.locationLine1}</span>
                      {inviteData.locationLine2 && (
                        <span className="venue-line">{inviteData.locationLine2}</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="image-overlay-container">
            <img src="/canvas 1.webp" alt="Canvas 1" className="canvas-image" />
            <div className="events-section-container">
              <div className="events-carousel-wrapper">
                <button className="carousel-arrow left" onClick={scrollLeft} aria-label="Previous event">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill="#834701" />
                  </svg>
                </button>
                
                <div className="events-carousel-track" ref={carouselRef} onScroll={handleScroll}>
                  {(tripledEvents || []).map((event) => (
                    <div key={event.uniqueId} className="event-card-frame">
                      <img src="/card.png" alt={event.name} className="event-card-bg" />
                      <div className="event-card-content">
                        <div className="event-card-header-zone">
                          <h3 className="event-card-name">{event.name}</h3>
                        </div>
                        
                        <div className="event-card-body-zone">
                          <p className="event-card-date">
                            <span className="event-card-label">DATE: </span>{event.date}
                          </p>
                          <p className="event-card-time">
                            <span className="event-card-label">TIME: </span>{event.time}
                          </p>
                          <p className="event-card-venue">
                            <span className="event-card-label">VENUE: </span>{event.venue || inviteData.locationLine1}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <button className="carousel-arrow right" onClick={scrollRight} aria-label="Next event">
                  <svg viewBox="0 0 24 24" width="24" height="24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="#834701" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          <div className="image-overlay-container">
            <img src="/enroute.png" alt="Enroute" className="canvas-image" />
            
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
          </div>

          <div className="image-overlay-container">
            <img src="/Banner.png" alt="Banner" className="canvas-image" />
          </div>

        </div>

      </div>
      <Loader audioSrc={inviteData.audioSrc} />
    </ReactLenis>
  );
}

export default App;
