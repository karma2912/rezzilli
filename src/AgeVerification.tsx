import { useState, useEffect } from 'react';

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRejected, setIsRejected] = useState(false); // New state to track if user clicked NO

  // 1. Instant Effect: Shows the age gate immediately
  useEffect(() => {
    const isVerified = localStorage.getItem('ageVerified');
    
    if (!isVerified) {
      setIsVisible(true);
    }
  }, []);

  // 2. Scroll Lock Effect: Prevents background scrolling when visible
  useEffect(() => {
    if (isVisible) {
      // Lock scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scrolling is restored if component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleYes = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVisible(false); // This will automatically trigger the scroll unlock
  };

  const handleNo = () => {
    // Show the rejection screen instead of reloading immediately
    setIsRejected(true); 
  };

  const handleReturn = () => {
    // Reload the site when they click Return
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    // OUTER WRAPPER: Dark overlay
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      
      {/* INNER BOX: Stays the exact same size/style for both views */}
      <div 
        className="flex flex-col items-center justify-center w-full max-w-[700px] min-h-[350px] px-6 py-10 md:px-10 md:py-12 shadow-2xl border border-blue-800 transition-all" 
        style={{ backgroundColor: '#0a36af' }}
      >
        
        {!isRejected ? (
          /* --- VIEW 1: INITIAL QUESTION --- */
          <>
            {/* Heading */}
            <h2 className="text-center text-[18px] sm:text-[22px] md:text-[26px] tracking-wide mb-8 md:mb-10 uppercase" style={{ color: '#ffc85b' }}>
              Are you of the legal drinking age?
            </h2>

            {/* Buttons Container */}
            <div className="flex flex-row items-center justify-center gap-6 md:gap-10 mb-8 md:mb-10 w-full">
              
              {/* YES Button */}
              <button 
                onClick={handleYes}
                className="w-32 sm:w-40 md:w-48 py-2.5 md:py-3 font-bold text-[16px] md:text-[20px] tracking-wider hover:scale-105 transition-transform" 
                style={{ backgroundColor: '#ffc85b', color: '#0a36af' }}
              >
                YES
              </button>
              
              {/* NO Button */}
              <button 
                onClick={handleNo}
                className="w-32 sm:w-40 md:w-48 py-2.5 md:py-3 font-bold text-[16px] md:text-[20px] tracking-wider hover:scale-105 transition-transform" 
                style={{ backgroundColor: 'transparent', color: '#ffc85b', border: '1px solid #ffc85b' }}
              >
                NO
              </button>
              
            </div>

            {/* Footer Text */}
            <p className="text-center text-[12px] md:text-[14px] max-w-[600px] leading-relaxed tracking-wide" style={{ color: '#ffc85b' }}>
              By clicking YES, you are verifying that you are old enough to consume alcohol and are <br className="hidden md:block" />
              agreeing to the Terms of Use and Privacy Policy.
            </p>
          </>
        ) : (
          /* --- VIEW 2: REJECTION SCREEN (Matches Image) --- */
          <>
            {/* Logo Image */}
            <img 
              src="/rezzilli.png" 
              alt="Rezzilli Logo" 
              className="h-16 md:h-24 mb-8 object-contain" 
            />

            {/* Rejection Text */}
            <h2 
              className="text-center text-[16px] sm:text-[18px] md:text-[22px] tracking-widest mb-10 uppercase font-medium" 
              style={{ color: '#ffc85b' }}
            >
              You must be of legal drinking age to enter.
            </h2>

            {/* Return Button */}
            <button 
              onClick={handleReturn}
              className="w-48 sm:w-56 py-3 md:py-3.5 font-bold text-[16px] md:text-[20px] tracking-wider hover:scale-105 transition-transform uppercase" 
              style={{ backgroundColor: '#ffc85b', color: '#0a36af' }}
            >
              Return
            </button>
          </>
        )}
        
      </div>
    </div>
  );
};

export default AgeVerification;