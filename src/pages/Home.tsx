import { X } from "lucide-react";
import Carousel from "../Carousel";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
  // --- STRICTLY DYNAMIC DATA STATE (No Fallbacks) ---
  const [homeData, setHomeData] = useState<any>(null);

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
  const [showEventModal, setShowEventModal] = useState(false);

  const location = useLocation();

  useEffect(() => {
    fetch("https://rezzillidrinks.com/api/get-home.php")
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.error && data.story && data.events) {
          setHomeData(data);
        } else {
          console.error("Database returned empty or invalid data:", data);
        }
      })
      .catch(err => {
        console.error("Failed to fetch home data from backend:", err);
      });
  }, []);

  useEffect(() => {
    if (showEventModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showEventModal]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", ""); 
      
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
      }, 100); 
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    if (
      !formData.whoAreYou ||
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setSubmitMessage("Please fill all required fields.");
      setIsSubmitting(false);
      return;
    }

    const API_URL = "/api/contact";

    try {
      const payload = {
        whoAreYou: formData.whoAreYou.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        message: formData.message.trim(),
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat().join(", ");
          throw new Error(errorMessages);
        }
        throw new Error(data.message || "Submission failed");
      }

      setSubmitMessage(
        data.message || "Thank you! Your message has been sent.",
      );
      setIsFormSubmitted(true);

      setFormData({
        whoAreYou: "",
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Submission Error:", error);
      setSubmitMessage(
        error.message || "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- HELPER FUNCTION: Restores Pixel-Perfect Modal UI from Single String ---
  const renderModalDescription = (description: string) => {
    // Safely fallback if description is somehow missing
    if (!description) return null;

    // Splits the admin's single text box into sections based on double spacing
    const sections = description.split('\n\n');

    return (
      <div className="p-6 md:p-10 space-y-6 text-[15px] leading-relaxed w-full max-w-4xl" style={{ color: "#0a36af" }}>
        {sections.map((section, idx) => {
          // If the section is the locations list, restore the bolding and exact HTML list structure
          if (section.includes("Locations and Dates:")) {
            const lines = section.split('\n');
            const title = lines[0]; // "Locations and Dates:"
            const listItems = lines.slice(1);
            return (
              <div key={idx}>
                <p className="font-bold mb-3">{title}</p>
                <ul className="space-y-3">
                  {listItems.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              </div>
            );
          } 
          // If it's the last paragraph (Footer), apply the specific padding from your original design
          else if (idx === sections.length - 1) {
            return <p key={idx} className="pt-2 pb-4">{section}</p>;
          } 
          // Regular paragraph
          else {
            return <p key={idx}>{section}</p>;
          }
        })}
      </div>
    );
  };

  // --- LOADING SPINNER ---
  // If homeData is null, the DB hasn't responded yet. Show nothing but the spinner.
  if (!homeData) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a36af]"></div>
      </div>
    );
  }

  // --- MAIN RENDER (Only runs if data is successfully fetched from DB) ---
  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#ffffff",
        fontFamily: "'Libre Baskerville', serif",
      }}
    >
      <Navbar/>

      <section className="w-full h-[50vh] sm:h-[60vh] md:h-[calc(100vh-85px)] pb-12 md:pb-15">
        <Carousel images={homeData.carousel} />
      </section>

      <section
        id="origins"
        className="w-full py-12 md:py-16"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center">
            <div className="flex justify-center md:justify-start">
              <img
                src={homeData.story.image}
                alt="Rezzilli Limoncini"
                className="w-full max-w-[450px] rounded-2xl shadow-2xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2
                className="text-[30px] uppercase font-bold mb-4 md:mb-8"
                style={{ color: "#0a36af" }}
              >
                {homeData.story.title}
              </h2>
              <div
                className="text-[15px] leading-relaxed whitespace-pre-wrap"
                style={{ color: "#000000", textAlign: "justify" }}
              >
                {homeData.story.text}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="why-us"
        className="w-full py-12 md:py-16"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h2
            className="text-center text-[30px] font-bold uppercase tracking-wide"
            style={{ color: "#0a36af" }}
          >
            Why Rezzilli?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {homeData.values.map((val: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center text-center px-2">
                <div className="h-48 md:h-60 w-full flex items-center justify-center mb-6">
                  <img
                    src={val.image}
                    alt={val.title}
                    className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3
                  className="text-[20px] font-semibold mb-4 uppercase"
                  style={{ color: "#ffc85b" }}
                >
                  {val.title}
                </h3>
                <p
                  className="text-[15px] leading-relaxed"
                  style={{ color: "#0a36af" }}
                >
                  {val.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="events" className="w-full py-12 md:py-16 bg-white ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mb-12">
          <h2
            className="text-center text-[30px] font-bold uppercase tracking-wide"
            style={{ color: "#0a36af" }}
          >
            Events & Updates
          </h2>
        </div>
        <div className="flex flex-col md:flex-row w-full items-stretch min-h-[500px] md:min-h-[800px]">
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative">
             <img src={homeData.events.featured.image} alt="Featured Event" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <div
            className="w-full md:w-1/2 p-10 md:p-16 lg:px-24 flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: "#0a36af" }}
          >
            <h3
              className="text-[30px] font-bold mb-6 uppercase text-center"
              style={{ color: "#ffc85b" }}
            >
              {homeData.events.featured.title}
            </h3>

            <p
              className="text-[16px] md:text-[18px] font-medium mb-4 uppercase text-center"
              style={{ color: "#ffc85b" }}
            >
              Venue: {homeData.events.featured.venue}
            </p>

            <p
              className="text-[16px] md:text-[18px] font-medium mb-8 uppercase text-center"
              style={{ color: "#ffc85b" }}
            >
              Date: {homeData.events.featured.date}
            </p>

            <div className="text-[15px] leading-relaxed mx-auto max-w-lg text-center text-white whitespace-pre-wrap">
              {homeData.events.featured.description}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {homeData.events.cards.map((card: any, idx: number) => (
              <div 
                key={idx} 
                onClick={() => setShowEventModal(true)}
                className="flex flex-col group bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 cursor-pointer"
              >
                <div className="w-full h-[250px] md:h-[300px] bg-gray-50 flex items-center justify-center overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="py-6 pr-6 pl-4 md:py-8 md:pr-8 md:pl-5 flex flex-col flex-grow">
                  <span className="text-[15px] font-semibold uppercase mb-2 tracking-widest" style={{ color: "#ffc85b" }}>
                    {card.date} / {card.type}
                  </span>
                  <h4 className="font-bold uppercase text-[18px] md:text-[20px] leading-snug mb-3 transition-colors group-hover:color-[#ffc85b]" style={{ color: "#0a36af" }}>
                    {card.title}
                  </h4>
                  <div className="text-[15px] leading-relaxed mb-6 line-clamp-2 flex-grow whitespace-pre-wrap" style={{ color: "#0a36af" }}>
                    {card.description}
                  </div>
                  <button
                    className="text-[13px] font-bold tracking-wider pb-1 self-start transition-opacity hover:opacity-70"
                    style={{ color: "#0a36af", borderBottom: "2px solid #ffc85b" }}
                  >
                    Read more
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="w-full px-4 md:px-6 py-12 md:py-16"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="flex flex-col justify-start">
              <h2
                className="text-[30px] font-bold mb-4 md:mb-8"
                style={{ color: "#0a36af" }}
              >
                {homeData.contact.title}
              </h2>
              <div
                className="text-[15px] leading-relaxed whitespace-pre-wrap"
                style={{ color: "#0a36af", textAlign: "justify" }}
              >
                {homeData.contact.description}
              </div>
            </div>

            <div className="flex flex-col justify-start">
              {isFormSubmitted ? (
                <div className="flex items-center justify-center p-8 md:p-12">
                  <p
                    className="font-medium text-center leading-relaxed text-base md:text-lg"
                    style={{ color: "#0a36af" }}
                  >
                    {submitMessage}
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="whoAreYou"
                      className="block text-[15px] font-medium mb-2"
                      style={{ color: "#0a36af" }}
                    >
                      Who are you? <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <select
                      id="whoAreYou"
                      value={formData.whoAreYou}
                      onChange={(e) =>
                        setFormData({ ...formData, whoAreYou: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px]"
                      style={{
                        backgroundColor: "#ffffff",
                        fontSize: formData.whoAreYou === "" ? "14px" : "16px",
                        color: formData.whoAreYou === "" ? "#9ca3af" : "#000000",
                      }}
                    >
                      <option value="" style={{ fontSize: "14px" }}>
                        Select an option
                      </option>
                      <option value="Consumer">Consumer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Bar/Restaurant Owner">
                        Bar/Restaurant Owner
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-[15px] font-medium mb-2"
                        style={{ color: "#0a36af" }}
                      >
                        First Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px]"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-[15px] font-medium mb-2"
                        style={{ color: "#0a36af" }}
                      >
                        Last Name <span style={{ color: "#ef4444" }}>*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px]"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[15px] font-medium mb-2"
                      style={{ color: "#0a36af" }}
                    >
                      Email <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      required
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:ring-transparent text-[15px]"
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[15px] font-medium mb-2"
                      style={{ color: "#0a36af" }}
                    >
                      Message <span style={{ color: "#ef4444" }}>*</span>
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0a36af] focus:border-transparent text-[15px] resize-vertical"
                      style={{ backgroundColor: "#ffffff" }}
                      placeholder="Tell us more about your interest..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 md:px-8 py-[15px] rounded-lg font-semibold text-[15px] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed uppercase"
                    style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
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

      <Footer/>

      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:px-8 bg-black/60 backdrop-blur-sm">
          
          <div className="bg-white max-w-7xl w-full max-h-[90vh] flex flex-col relative shadow-2xl rounded-lg overflow-hidden">
            
            <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-center z-20 shadow-sm shrink-0">
              <h2
                className="text-[18px] md:text-[20px] font-bold uppercase tracking-wide"
                style={{ color: "#0a36af" }}
              >
                {homeData.events.modal.title}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X size={24} style={{ color: "#0a36af" }} />
              </button>
            </div>

            <div className="overflow-y-auto flex flex-col w-full">
              
              <div className="w-full h-[250px] md:h-[400px] bg-gray-50 flex items-center justify-center relative shrink-0">
                <img src={homeData.events.modal.image} alt="Event" className="absolute inset-0 w-full h-full object-cover" />
              </div>

              <div className="w-full bg-white flex justify-center">
                {/* Dynamically parsed HTML to match original design exactly */}
                {renderModalDescription(homeData.events.modal.description)}
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;