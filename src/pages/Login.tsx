import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-[#faf9f6]">
      
     <Navbar/>
      <main className="flex-grow w-full flex flex-col items-center justify-start pt-16 md:pt-24 px-6 md:px-12 pb-20">
        
        {/* Inner Container */}
        <div className="w-full max-w-2xl flex flex-col">
          
          {/* Header & Underline */}
          <div className="flex flex-col items-center mb-16">
            <h1 
              className="text-[32px] font-extrabold uppercase tracking-widest mb-4"
              style={{ color: "#0a36af" }}
            >
              Login
            </h1>
            <div 
              className="w-12 h-[2px]" 
              style={{ backgroundColor: "#ffc85b" }} // Gold underline to match the red one in mockup
            ></div>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-8">
            
            {/* Email Input */}
            <div>
              <label 
                className="block text-[16px] font-bold mb-3 tracking-wide"
                style={{ color: "#0a36af" }}
              >
                Email
              </label>
              <input 
                type="email" 
                className="w-full border-2 rounded-xl p-3 text-[16px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                className="block text-[16px] font-bold mb-3 tracking-wide"
                style={{ color: "#0a36af" }}
              >
                Password
              </label>
              <input 
                type="password" 
                className="w-full border-2 rounded-xl p-3 text-[16px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
              
              {/* Forgot Password Link */}
              <div className="text-right mt-3">
                <Link 
                  to="/forgot-password" 
                  className="text-[14px] font-bold hover:opacity-70 transition-opacity tracking-wide" 
                  style={{ color: "#0a36af" }}
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Action Buttons (Side by Side) */}
            <div className="flex flex-row items-center gap-6 mt-4">
              <Link 
              to="/profile"
                type="submit"
                className="px-8 md:px-10 py-3.5 rounded-xl font-bold text-[15px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }} 
              >
                Sign In
              </Link>

              <Link 
                to="/register"
                className="font-bold text-[15px] uppercase tracking-widest hover:opacity-70 transition-opacity"
                style={{ color: "#0a36af" }} 
              >
                Create Account
              </Link>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}

export default Login;