import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

function Spritz() {
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#ffffff",
        fontFamily: "'Libre Baskerville', serif",
      }}
    >
        <header
        className="w-full py-3 px-6 md:py-4 md:px-6 sticky top-0 z-50 header-container"
        style={{ backgroundColor: "#0a36af" }}
      >
        <style>{`
    @media screen and (max-width: 700px) {
      .header-container {
        padding-left: 16px !important;
        padding-right: 16px !important;
      }
    }

    @media screen and (max-width: 560px) {
      .header-nav-row {
        flex-direction: column !important;
        gap: 12px !important;
      }
      .right-actions {
        position: static !important;
        margin-top: 8px;
      }
      .nav-links {
        flex-wrap: wrap;
        justify-content: center;
        gap: 16px !important;
      }
    }

    @media screen and (max-width: 320px) {
      .header-container {
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
      .header-logo {
        height: 28px !important;
      }
      .origins-btn {
        font-size: 11px !important;
      }
    }
  `}</style>
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-2 md:gap-3 relative">
          <img
            src="/rezzilli_draft_logo.webp"
            alt="Rezzilli Logo"
            className="h-8 md:h-12 header-logo"
          />
          <div className="w-full flex items-center justify-center header-nav-row mt-1 md:mt-2">
            <nav className="flex items-center justify-center gap-6 md:gap-15 lg:gap-16 nav-links">
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Origins
              </Link>
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Why Us
              </Link>
              <div className="relative group">
                <Link
                 to="/"
                  className="flex items-center gap-1 py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                  style={{ color: "#ffc85b" }}
                >
                  Shop
                  <ChevronDown
                    size={16}
                    className="mt-[2px] transition-transform duration-200 group-hover:rotate-180"
                  />
                </Link>
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[150px]">
                  <div
                    className="flex flex-col py-2 shadow-2xl"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    <Link
                      to="/spritz"
                      className="block px-5 py-2.5 text-start text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                      style={{ color: "#ffc85b" }}
                    >
                      Spritz
                    </Link>
                    <Link
                      to="merchandise"
                      className="px-5 py-2.5 text-start text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                      style={{ color: "#ffc85b" }}
                    >
                      Merchandise
                    </Link>
                  </div>
                </div>
              </div>
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Events & Updates
              </Link>
              <Link
                to="/"
                className="py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Contact Us
              </Link>
            </nav>
            <div className="absolute right-0 flex items-center gap-5 px-3 py-1.5 md:px-4 md:py-2 right-actions">
              <button
                className="hover:opacity-80 transition-opacity"
                aria-label="User Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ color: "#ffffff" }}
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                className="relative hover:opacity-80 transition-opacity mt-0.5"
                aria-label="Shopping Cart"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 md:w-6 md:h-6"
                  style={{ color: "#ffffff" }}
                >
                  <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
                <span
                  className="absolute -top-2 -right-2.5 rounded-full text-white text-[10px] md:text-[11px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center"
                  style={{ backgroundColor: "#5484BA" }}
                >
                  1
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Spritz;