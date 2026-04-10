import { useState, useEffect } from "react";

const AgeVerification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRejected, setIsRejected] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("ageVerified") === "true") {
      localStorage.removeItem("ageVerified");
    }

    const expiryTimestamp = localStorage.getItem("ageVerifiedExpiry");

    if (!expiryTimestamp) {
      setIsVisible(true);
    } else {
      if (Date.now() > parseInt(expiryTimestamp, 10)) {
        setIsVisible(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  const handleYes = () => {
    const EXPIRY_DAYS = 3;
    const expiryTime = Date.now() + EXPIRY_DAYS * 24 * 60 * 60 * 1000;

    localStorage.setItem("ageVerifiedExpiry", expiryTime.toString());
    setIsVisible(false);
  };

  const handleNo = () => {
    setIsRejected(true);
  };

  const handleReturn = () => {
    window.location.reload();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="flex flex-col items-center justify-center w-full max-w-[700px] min-h-[350px] px-6 py-10 md:px-10 md:py-12 shadow-2xl border border-blue-800 transition-all"
        style={{ backgroundColor: "#0a36af" }}
      >
        {!isRejected ? (
          <>
            <h2
              className="text-center text-[18px] sm:text-[22px] md:text-[26px] tracking-wide mb-8 md:mb-10 uppercase"
              style={{ color: "#ffc85b" }}
            >
              Are you of the legal drinking age?
            </h2>
            <div className="flex flex-row items-center justify-center gap-6 md:gap-10 mb-8 md:mb-10 w-full">
              <button
                onClick={handleYes}
                className="w-32 sm:w-40 md:w-48 py-2.5 md:py-3 font-bold text-[16px] md:text-[20px] tracking-wider hover:scale-105 transition-transform"
                style={{ backgroundColor: "#ffc85b", color: "#0a36af" }}
              >
                YES
              </button>
              <button
                onClick={handleNo}
                className="w-32 sm:w-40 md:w-48 py-2.5 md:py-3 font-bold text-[16px] md:text-[20px] tracking-wider hover:scale-105 transition-transform"
                style={{
                  backgroundColor: "transparent",
                  color: "#ffc85b",
                  border: "1px solid #ffc85b",
                }}
              >
                NO
              </button>
            </div>
            <p
              className="text-center text-[12px] md:text-[14px] max-w-[600px] leading-relaxed tracking-wide"
              style={{ color: "#ffc85b" }}
            >
              By clicking YES, you are verifying that you are old enough to
              consume alcohol and are <br className="hidden md:block" />
              agreeing to the Terms of Use and Privacy Policy.
            </p>
          </>
        ) : (
          <>
            <img
              src="/rezzilli.png"
              alt="Rezzilli Logo"
              className="h-16 md:h-24 mb-8 object-contain"
            />
            <h2
              className="text-center text-[16px] sm:text-[18px] md:text-[22px] tracking-widest mb-10 uppercase font-medium"
              style={{ color: "#ffc85b" }}
            >
              You must be of legal drinking age to enter.
            </h2>
            <button
              onClick={handleReturn}
              className="w-48 sm:w-56 py-3 md:py-3.5 font-bold text-[16px] md:text-[20px] tracking-wider hover:scale-105 transition-transform uppercase"
              style={{ backgroundColor: "#ffc85b", color: "#0a36af" }}
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
