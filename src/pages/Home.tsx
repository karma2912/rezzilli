import { X } from "lucide-react";
import Carousel from "../Carousel";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function App() {
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

  const carouselImages = [
    { src: "/image1.webp", link: null }, // Just an image, not clickable
    { src: "/image2.webp", link: "/product/2" }, // This one WILL click to the Limoncini page!
    { src: "/image3.webp", link: null }, 
    { src: "/image4.webp", link: "/spritz" }, // Maybe this one clicks to the main shop page
    { src: "/image5.webp", link: null },
  ];
const location = useLocation();

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
        <Carousel images={carouselImages} />
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
                src="/gemini_generated_image_yoid3hyoid3hyoidd copy.webp"
                alt="Rezzilli Limoncini"
                className="w-full max-w-[450px] rounded-2xl shadow-2xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2
                className="text-[30px] uppercase font-bold mb-4 md:mb-8"
                style={{ color: "#0a36af" }}
              >
                From Mamma's Kitchen
              </h2>
              <p
                className="text-[15px] leading-relaxed text-justify"
                style={{ color: "#000000" }}
              >
                Rezzilli was born from a cherished memory - the homemade
                tradition that many an Italian Mamma had in their kitchen in
                Italy making homemade Limoncello. Inspired by those authentic
                flavours, we have taken the family recipe and created our unique
                drinks that honours that heritage but speaks to today's
                lifestyle. We have reimagined the classic Italian digestivo as a
                spritz summer drink - refreshing, light, and made with Italian
                ingredients for the true lovers of aperitivo culture.
              </p>
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
            className="text-center text-[30px]  font-bold uppercase tracking-wide"
            style={{ color: "#0a36af" }}
          >
            Why Rezzilli?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Box 1 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="h-48 md:h-60 w-full flex items-center justify-center mb-6">
                <img
                  src="/image10.png"
                  alt="Real Sicilian Lemon"
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3
                className="text-[20px] font-semibold mb-4 uppercase"
                style={{ color: "#ffc85b" }}
              >
                Real Sicilian Lemon
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#0a36af" }}
              >
                Made with sun-ripened Sicilian lemon, with no artificial
                colourings or additives, we pour passion and Mediterranean
                values into every bottle to create a bright, refreshing taste
                families love.
              </p>
            </div>

            {/* Box 2 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="h-48 md:h-60 w-full flex items-center justify-center mb-6">
                <img
                  src="/image8.png"
                  alt="No Added Sugar"
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3
                className="text-[20px] font-semibold mb-4 uppercase"
                style={{ color: "#ffc85b" }}
              >
                No Added Sugar
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#0a36af" }}
              >
                There are no added sugars or artificial sweeteners in our range,
                so every sip is naturally light, letting the pure character of
                our ingredients shine through in every drop.
              </p>
            </div>

            {/* Box 3 */}
            <div className="flex flex-col items-center text-center px-2">
              <div className="h-48 md:h-60 w-full flex items-center justify-center mb-6">
                <img
                  src="/image9.png"
                  alt="Bottles and Packaging"
                  className="max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3
                className="text-[20px] font-semibold mb-4 uppercase"
                style={{ color: "#ffc85b" }}
              >
                Bottles and Packaging
              </h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#0a36af" }}
              >
                Our bottles and packaging are designed with the planet in mind,
                using materials that can be recycled so you can enjoy your drink
                and feel good about every purchase.
              </p>
            </div>

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
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 bg-gray-100">
            Image
          </div>
          <div
            className="w-full md:w-1/2 p-10 md:p-16 lg:px-24 flex flex-col items-center justify-center text-center"
            style={{ backgroundColor: "#0a36af" }}
          >
            <h3
              className="text-[30px]  font-bold mb-6 uppercase text-center"
              style={{ color: "#ffc85b" }}
            >
              OFFICIAL LAUNCH NIGHT
            </h3>

            <p
              className="text-[16px] md:text-[18px] font-medium mb-4 uppercase text-center"
              style={{ color: "#ffc85b" }}
            >
              Venue: Isabel’s Restaurant & Bar, Burton-upon-Trent
            </p>

            <p
              className="text-[16px] md:text-[18px] font-medium mb-8 uppercase text-center"
              style={{ color: "#ffc85b" }}
            >
              Date: April 2026
            </p>

            <p className="text-[15px] leading-relaxed mx-auto max-w-lg text-center text-white">
              Join us for the official Rezzilli launch night at Isabel’s. An
              evening of tastings, pizza, cocktails and DJ sets with guests from
              the drinks trade, cocktail bar owners and influencers. Anyone and
              everyone is invited.
            </p>
          </div>
        </div>

        {/* AMEND ii: Reduced margin-top by 50% */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-8 md:mt-12">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            
            {/* Box 1: Official Launch Night */}
            <div className="flex flex-col group bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200">
              <div className="w-full h-[250px] md:h-[300px] bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src="/gemini_generated_image_yoid3hyoid3hyoidd copy.webp"
                  alt="Official Launch Image"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              {/* AMEND ii: Reduced left padding (pl-4 md:pl-5) to give text more room */}
              <div className="py-6 pr-6 pl-4 md:py-8 md:pr-8 md:pl-5 flex flex-col flex-grow">
                {/* AMEND i: Date changed to 15px */}
                <span className="text-[15px] font-semibold uppercase mb-2 tracking-widest" style={{ color: "#ffc85b" }}>
                  April 15, 2026 / Event
                </span>
                <h4 className="font-bold uppercase text-[18px] md:text-[20px] leading-snug mb-3 transition-colors group-hover:color-[#ffc85b]" style={{ color: "#0a36af" }}>
                  Official Launch Night
                </h4>
                {/* AMEND ii: Subtext changed to blue and 15px */}
                <p className="text-[15px] leading-relaxed mb-6 line-clamp-2 flex-grow" style={{ color: "#0a36af" }}>
                  Join us for the official Rezzilli launch night at Isabel’s Restaurant & Bar. An evening of tastings, pizza, cocktails and DJ sets. Anyone and everyone is invited.
                </p>
                {/* AMEND iii: Read more changed to 13px, removed uppercase (sentence case) */}
                <button
                  className="text-[13px] font-bold tracking-wider pb-1 self-start transition-opacity hover:opacity-70"
                  style={{ color: "#0a36af", borderBottom: "2px solid #ffc85b" }}
                >
                  Read more
                </button>
              </div>
            </div>

            {/* Box 2: Foodies Festival */}
            <div 
              className="flex flex-col group bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200 cursor-pointer" 
              onClick={() => setShowEventModal(true)}
            >
              <div className="w-full h-[250px] md:h-[300px] bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src="/image1.webp"
                  alt="Foodies Festival Image"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="py-6 pr-6 pl-4 md:py-8 md:pr-8 md:pl-5 flex flex-col flex-grow">
                <span className="text-[15px] font-semibold uppercase mb-2 tracking-widest" style={{ color: "#ffc85b" }}>
                  May 2026 / Festival
                </span>
                <h4 className="font-bold uppercase text-[18px] md:text-[20px] leading-snug mb-3 transition-colors group-hover:color-[#ffc85b]" style={{ color: "#0a36af" }}>
                  Foodies Festival
                </h4>
                <p className="text-[15px] leading-relaxed mb-6 line-clamp-2 flex-grow" style={{ color: "#0a36af" }}>
                  Catch the Rezzilli team across the UK at Foodies Festivals! Visit our stand for tastings, chats and to purchase your bottles.
                </p>
                <button
                  className="text-[13px] font-bold tracking-wider pb-1 self-start transition-opacity hover:opacity-70"
                  style={{ color: "#0a36af", borderBottom: "2px solid #ffc85b" }}
                >
                  Read more
                </button>
              </div>
            </div>

            {/* Box 3: Great British Food Festival */}
            <div className="flex flex-col group bg-white border border-gray-100 shadow-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-gray-200">
              <div className="w-full h-[250px] md:h-[300px] bg-gray-50 flex items-center justify-center overflow-hidden">
                <img
                  src="/image2.webp"
                  alt="Great British Food Festival Image"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="py-6 pr-6 pl-4 md:py-8 md:pr-8 md:pl-5 flex flex-col flex-grow">
                <span className="text-[15px] font-semibold uppercase mb-2 tracking-widest" style={{ color: "#ffc85b" }}>
                  Summer 2026 / Event
                </span>
                <h4 className="font-bold uppercase text-[18px] md:text-[20px] leading-snug mb-3 transition-colors group-hover:color-[#ffc85b]" style={{ color: "#0a36af" }}>
                  Great British Food Festival
                </h4>
                <p className="text-[15px] leading-relaxed mb-6 line-clamp-2 flex-grow" style={{ color: "#0a36af" }}>
                  Our tour continues at the Great British Food Festival. Find us at Tatton Park and Edinburgh for more Mediterranean sunshine and refreshing drinks.
                </p>
                <button
                  className="text-[13px] font-bold tracking-wider pb-1 self-start transition-opacity hover:opacity-70"
                  style={{ color: "#0a36af", borderBottom: "2px solid #ffc85b" }}
                >
                  Read more
                </button>
              </div>
            </div>

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
                CONTACT US
              </h2>
              {/* AMEND i: Text changed to blue (#0a36af) */}
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "#0a36af", textAlign: "justify" }}
              >
                Have a question, special request, or want to stock our drinks?
                Fill out the form and our team will get back to you as soon as
                possible.
              </p>
              <br />
              <p
                className="text-[15px] leading-relaxed mb-8"
                style={{ color: "#0a36af", textAlign: "justify" }}
              >
                Whether you’re a customer, partner, or retailer, we’d love to
                hear from you and help with anything you need.
              </p>

              <div className="mt-4 pt-6">
                <p className="text-[15px] mb-1" style={{ color: "#0a36af" }}>
                  Email: <a href="mailto:hello@rezzillidrinks.com" className="hover:underline">hello@rezzillidrinks.com</a>
                </p>
                <p className="text-[15px]" style={{ color: "#0a36af" }}>
                  Phone: <a href="tel:+447832198470" className="hover:underline">+447832198470</a>
                </p>
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
                    {/* AMEND i: Label text changed to blue (#0a36af) */}
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
                        // Note: The selected text inside inputs remains black/gray as requested, only the labels turn blue!
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

                  {/* AMEND ii: Padding Y changed to exactly 15px (py-[15px]) */}
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

      {/* Footer */}
     <Footer/>

      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:px-8 bg-black/60 backdrop-blur-sm">
          
          {/* AMEND v: max-w-7xl ensures the pop-up spans the exact width of the 3 event boxes below it */}
          <div className="bg-white max-w-7xl w-full max-h-[90vh] flex flex-col relative shadow-2xl rounded-lg overflow-hidden">
            
            {/* Fixed Header */}
            <div className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-center z-20 shadow-sm shrink-0">
              <h2
                className="text-[18px] md:text-[20px] font-bold uppercase tracking-wide"
                style={{ color: "#0a36af" }}
              >
                FOODIES FESTIVAL 2026
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="absolute right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                {/* Note: Ensure <X /> is imported from lucide-react at the top of your file! */}
                <X size={24} style={{ color: "#0a36af" }} />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="overflow-y-auto flex flex-col w-full">
              
              {/* Image Section */}
              <div className="w-full h-[250px] md:h-[400px] bg-gray-50 flex items-center justify-center relative shrink-0">
                <span className="text-gray-500 text-[16px] font-medium">Image</span>
                {/* <img src="/image1.webp" alt="Event" className="absolute inset-0 w-full h-full object-cover" /> */}
              </div>

              {/* Text Content Section */}
              <div className="w-full bg-white flex justify-center">
                {/* AMEND iv: Changed text color to blue (#0a36af) */}
                <div 
                  className="p-6 md:p-10 space-y-6 text-[15px] leading-relaxed w-full max-w-4xl"
                  style={{ color: "#0a36af" }}
                >
                  <p>
                    We’ll be at the Rezzilli stand with tastings, chats and bottle
                    sales.
                  </p>

                  <div>
                    <p className="font-bold mb-3">Locations and Dates:</p>
                    <ul className="space-y-3">
                      <li>&bull; Brighton &ndash; Preston Park, May 2026</li>
                      <li>&bull; Syon Park &ndash; London, May 2026</li>
                      <li>&bull; Tatton Park | Summer 2026</li>
                      <li>&bull; Edinburgh | Summer 2026</li>
                    </ul>
                  </div>

                  <p className="pt-2 pb-4">
                    Also planned: Glasgow, Oxford and Bath (dates TBC). Our team
                    will be in full Rezzilli merchandise, so you can’t miss us.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
