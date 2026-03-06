import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-[#faf9f6]">
     <Navbar/>
      <main className="flex-grow w-full flex flex-col items-center justify-start pt-16 md:pt-24 px-6 md:px-12 pb-20">
        <div className="w-full max-w-[800px] flex flex-col">
          <div className="flex flex-col items-center mb-12">
            <h1 
              className="text-[28px] font-extrabold uppercase tracking-tighter mb-4"
              style={{ color: "#0a36af" }}
            >
              Create Account
            </h1>
            <div 
              className="w-12 h-[2px]" 
              style={{ backgroundColor: "#ffc85b" }} 
            ></div>
          </div>

          {/* Form */}
          <form className="w-full flex flex-col gap-6 md:gap-8">
            
            {/* First Name & Last Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div>
                <label 
                  className="block text-[15px] font-bold mb-2 tracking-wide"
                  style={{ color: "#0a36af" }}
                >
                  First Name
                </label>
                <input 
                  type="text" 
                  className="w-full border-2 rounded-xl p-3.5 text-[15px] bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
                />
              </div>
              <div>
                <label 
                  className="block text-[15px] font-bold mb-2 tracking-wide"
                  style={{ color: "#0a36af" }}
                >
                  Last Name
                </label>
                <input 
                  type="text" 
                  className="w-full border-2 rounded-xl p-3.5 text-[15px] bg-transparent focus:outline-none transition-colors"
                  style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label 
                className="block text-[15px] font-bold mb-2 tracking-wide"
                style={{ color: "#0a36af" }}
              >
                Email
              </label>
              <input 
                type="email" 
                className="w-full border-2 rounded-xl p-3.5 text-[15px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                className="block text-[15px] font-bold mb-2 tracking-wide"
                style={{ color: "#0a36af" }}
              >
                Password
              </label>
              <input 
                type="password" 
                className="w-full border-2 rounded-xl p-3.5 text-[15px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
            </div>

            {/* Action Buttons (CREATE + RETURN TO STORE) */}
            <div className="flex flex-row items-center gap-8 mt-2">
              <Link
              to="/profile" 
                type="submit"
                className="px-10 py-3.5 rounded-xl font-bold text-[15px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-sm"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }} 
              >
                Create
              </Link>

              <Link 
                to="/"
                className="font-bold text-[15px] uppercase tracking-widest hover:opacity-70 transition-opacity"
                style={{ color: "#0a36af" }} 
              >
                Return to store
              </Link>
            </div>

          </form>
        </div>
      </main>

    </div>
  );
}

export default Register;