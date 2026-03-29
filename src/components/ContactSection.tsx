import { useState, useEffect } from "react";

function ContactSection() {
  // 1. STATE FOR DYNAMIC TEXT (Defaults to loading...)
  const [contactText, setContactText] = useState({ 
    title: "CONTACT US", 
    description: "Loading..." 
  });
  
  // 2. STATE FOR THE FORM
  const [formData, setFormData] = useState({
    whoAreYou: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  // 3. FETCH THE TEXT FROM ADMIN SETTINGS
  useEffect(() => {
    fetch("https://rezzillidrinks.com/api/get-home.php")
      .then(res => res.json())
      .then(data => {
        // Automatically grabs the dynamic text set in the Content Manager
        if (!data.error && data.contact) {
          setContactText(data.contact);
        }
      })
      .catch(err => console.error("Failed to fetch contact text:", err));
  }, []);

  // 4. HANDLE FORM SUBMISSION
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    if (!formData.whoAreYou || !formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setSubmitMessage("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = {
        whoAreYou: formData.whoAreYou.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch("https://rezzillidrinks.com/api/contact.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Submission failed");

      setSubmitMessage(data.message || "Thank you! Your message has been sent.");
      setIsFormSubmitted(true);
      setFormData({ whoAreYou: "", firstName: "", lastName: "", email: "", message: "" });
    } catch (error: any) {
      setSubmitMessage(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 5. PIXEL-PERFECT RENDER
  return (
    <section id="contact" className="w-full px-4 md:px-6 py-12 md:py-16" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
          
          <div className="flex flex-col justify-start">
            <h2 className="text-[30px] font-bold mb-4 md:mb-8" style={{ color: "#0a36af" }}>
              {contactText.title}
            </h2>
            <div className="text-[15px] leading-relaxed whitespace-pre-wrap" style={{ color: "#0a36af", textAlign: "justify" }}>
              {contactText.description}
            </div>
          </div>

          <div className="flex flex-col justify-start">
            {isFormSubmitted ? (
              <div className="flex items-center justify-center p-8 md:p-12">
                <p className="font-medium text-center leading-relaxed text-base md:text-lg" style={{ color: "#0a36af" }}>
                  {submitMessage}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="whoAreYou" className="block text-[15px] font-medium mb-2" style={{ color: "#0a36af" }}>
                    Who are you? <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <select
                    id="whoAreYou"
                    value={formData.whoAreYou}
                    onChange={(e) => setFormData({ ...formData, whoAreYou: e.target.value })}
                    required
                    className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px]"
                    style={{
                      backgroundColor: "#ffffff",
                      fontSize: formData.whoAreYou === "" ? "14px" : "16px",
                      color: formData.whoAreYou === "" ? "#9ca3af" : "#000000",
                    }}
                  >
                    <option value="" style={{ fontSize: "14px" }}>Select an option</option>
                    <option value="Consumer">Consumer</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Bar/Restaurant Owner">Bar/Restaurant Owner</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-[15px] font-medium mb-2" style={{ color: "#0a36af" }}>
                      First Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text" id="firstName" value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px]" style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[15px] font-medium mb-2" style={{ color: "#0a36af" }}>
                      Last Name <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="text" id="lastName" value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px]" style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[15px] font-medium mb-2" style={{ color: "#0a36af" }}>
                    Email <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="email" id="email" value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:ring-transparent text-[15px]" style={{ backgroundColor: "#ffffff" }}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-[15px] font-medium mb-2" style={{ color: "#0a36af" }}>
                    Message <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    id="message" value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required rows={4} className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px] resize-vertical" style={{ backgroundColor: "#ffffff" }} placeholder="Tell us more about your interest..."
                  />
                </div>

                <button
                  type="submit" disabled={isSubmitting}
                  className="w-full px-6 md:px-8 py-[15px] rounded-lg font-semibold text-[15px] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed uppercase" style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>

                {submitMessage && !isFormSubmitted && (
                  <p className="text-center font-medium text-sm md:text-base text-red-600">
                    {submitMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;