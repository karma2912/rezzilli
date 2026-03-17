import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

 const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("rezzilli_user");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, [location.pathname]); // The dependency array ensures it checks again if the page changes

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className="w-full py-3 px-6 md:py-4 md:px-6 sticky top-0 z-50 header-container"
      style={{ backgroundColor: "#0a36af" }}
    >
      <style>{`
        @media screen and (max-width: 700px) {
          .header-container { padding-left: 16px !important; padding-right: 16px !important; }
        }
        @media screen and (max-width: 560px) {
          .header-nav-row { flex-direction: column !important; gap: 12px !important; }
          .right-actions { position: static !important; margin-top: 8px; }
          .nav-links { flex-wrap: wrap; justify-content: center; gap: 16px !important; }
        }
        @media screen and (max-width: 320px) {
          .header-container { padding-left: 12px !important; padding-right: 12px !important; }
          .header-logo { height: 28px !important; }
          .origins-btn { font-size: 11px !important; }
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto flex flex-col items-center relative">
        <Link to="/" className="inline-block hover:opacity-90 transition-opacity">
          <img
            src="/rezzilli.png"
            alt="Rezzilli Logo"
            className="h-14 md:h-20 header-logo"
          />
        </Link>

        <div className="w-full flex items-center justify-center header-nav-row mt-1 md:mt-2">
          <nav className="flex items-center justify-center gap-6 md:gap-15 lg:gap-16 nav-links">
            <button
              onClick={() => scrollToSection("origins")}
              className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
              style={{ color: "#ffc85b" }}
            >
              Origins
            </button>
            <button
              onClick={() => scrollToSection("why-us")}
              className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
              style={{ color: "#ffc85b" }}
            >
              Why Us
            </button>

            <div className="relative group">
              <button
                className="flex items-center gap-1 py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Shop
                <ChevronDown size={16} className="mt-[2px] transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[150px]">
                <div className="flex flex-col py-2 shadow-2xl" style={{ backgroundColor: "#0a36af" }}>
                  <Link to="/spritz" className="block px-5 py-2.5 text-start text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap" style={{ color: "#ffc85b" }}>
                    Spritz
                  </Link>
                  <Link to="/merchandise" className="px-5 py-2.5 text-start text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap" style={{ color: "#ffc85b" }}>
                    Merchandise
                  </Link>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToSection("events")}
              className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
              style={{ color: "#ffc85b" }}
            >
              Events & Updates
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
              style={{ color: "#ffc85b" }}
            >
              Contact Us
            </button>
          </nav>

          <div className="absolute right-0 flex items-center gap-5 px-3 py-1.5 md:px-4 md:py-2 right-actions">
            <div className="relative group flex items-center h-full">
              <button
                className="hover:opacity-80 transition-opacity flex items-center py-2"
                aria-label="User Profile"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#ffffff" }}>
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="absolute right-0 md:right-1/2 md:translate-x-1/2 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px]">
                <div className="flex flex-col py-2 shadow-2xl" style={{ backgroundColor: "#0a36af" }}>
                  {!isLoggedIn ? (
                    <Link to="/login" className="block px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap" style={{ color: "#ffc85b" }}>
                      Login
                    </Link>
                  ) : (
                    <>
                      <Link to="/profile" className="block px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap" style={{ color: "#ffc85b" }}>
                        Profile
                      </Link>
                      <button 
    onClick={() => {
      localStorage.removeItem("rezzilli_user");
      setIsLoggedIn(false);
      navigate("/login");
    }} 
    className="block w-full px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap" 
    style={{ color: "#ffc85b" }}
  >
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            <Link to="/cart" className="relative hover:opacity-80 transition-opacity mt-0.5" aria-label="Shopping Cart">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6" style={{ color: "#ffffff" }}>
                <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
              </svg>
              <span className="absolute -top-2 -right-2.5 rounded-full text-white text-[10px] md:text-[11px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center" style={{ backgroundColor: "#5484BA" }}>
                1
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;