import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://rezzillidrinks.com/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem("rezzilli_user", JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
          navigate("/admin");
        } else {
          navigate("/profile"); 
        }
      } else {
        setError(data.message || "Invalid credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-[#faf9f6] overflow-x-hidden">
      
      <Navbar/>
      <main className="flex-grow w-full flex flex-col items-center justify-center pt-8 px-4 sm:px-6 md:px-12 pb-20">
        <div className="w-full max-w-2xl flex flex-col">
          <div className="flex flex-col items-center mb-10">
            <h1 
              className="text-[30px] font-extrabold uppercase tracking-widest mb-4 text-center"
              style={{ color: "#0a36af" }}
            >
              Login
            </h1>
            <div 
              className="w-12 h-[2px]" 
              style={{ backgroundColor: "#ffc85b" }} 
            ></div>
          </div>

          {error && (
            <div className="mb-6 text-center font-bold text-[15px] text-red-500">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            
            <div>
              <label 
                className="block text-[16px] font-bold mb-3 tracking-wide"
                style={{ color: "#0a36af" }}
              >
                Email
              </label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full border-2 rounded-xl p-3 text-[16px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
            </div>

            <div>
              <label 
                className="block text-[16px] font-bold mb-3 tracking-wide"
                style={{ color: "#0a36af" }}
              >
                Password
              </label>
              <input 
                type="password" 
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-2 rounded-xl p-3 text-[16px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
              
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
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 md:px-10 py-3.5 rounded-xl font-bold text-[15px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50 text-center"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }} 
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </button>

              <Link 
                to="/register"
                className="font-bold text-[15px] uppercase tracking-widest hover:opacity-70 transition-opacity text-center mt-2 sm:mt-0"
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