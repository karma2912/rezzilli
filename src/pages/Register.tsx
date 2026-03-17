import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;

      const response = await fetch("https://rezzillidrinks.com/api/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: "success", text: data.message });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage({ type: "error", text: data.message || "Registration failed." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-[#faf9f6]">
      <Navbar />
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

          {/* Success/Error Message Display */}
          {message.text && (
            <div 
              className="mb-8 text-center font-bold text-[15px]" 
              style={{ color: message.type === "success" ? "#15803d" : "#ef4444" }}
            >
              {message.text}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 md:gap-8">
            
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
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
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
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
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
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full border-2 rounded-xl p-3.5 text-[15px] bg-transparent focus:outline-none transition-colors"
                style={{ borderColor: "rgba(10, 54, 175, 0.25)", color: "#0a36af" }}
              />
            </div>

            {/* Action Buttons (CREATE + RETURN TO STORE) */}
            <div className="flex flex-row items-center gap-8 mt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-10 py-3.5 rounded-xl font-bold text-[15px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-sm disabled:opacity-50"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }} 
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>

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