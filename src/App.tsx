import { X } from "lucide-react";
import Carousel from "./Carousel";
import { useState } from "react";

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
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAlcoholPolicy, setShowAlcoholPolicy] = useState(false);

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
    "/image1.webp",
    "/image2.webp",
    "/image3.webp",
    "/image4.webp",
    "/image5.webp",
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

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
              <button
                onClick={() => scrollToSection("origins")}
                className="py-2 text-base md:text-lg font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Origins
              </button>
              <button
                onClick={() => scrollToSection("why-us")}
                className="py-2 text-base md:text-lg font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Why Us
              </button>
              <button
                onClick={() => scrollToSection("shop")}
                className="py-2 text-base md:text-lg font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Shop
              </button>
              <button
                onClick={() => scrollToSection("events")}
                className="py-2 text-base md:text-lg font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Events & Updates
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="py-2 text-base md:text-lg font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                style={{ color: "#ffc85b" }}
              >
                Contact Us
              </button>
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

      <section className="w-full">
        <Carousel images={carouselImages} />
      </section>

      {/* Sip the Summer Section */}
      <section className="w-full py-12 sm:py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Section Title */}
          <h2
            className="text-center text-[28px] sm:text-3xl md:text-[40px] font-bold mb-10 sm:mb-14 tracking-wide uppercase"
            style={{ color: "#0a36af" }}
          >
            Sip The Summer
          </h2>

          {/* 3-Column Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6 lg:gap-14 xl:gap-20">
            {/* Product 1: Senza */}
            <div className="flex flex-col items-center w-full max-w-[300px] md:max-w-full lg:max-w-[340px] mx-auto">
              <div className="h-[280px] sm:h-[320px] md:h-[280px] lg:h-[380px] w-full flex items-center justify-center mb-5 md:mb-6">
                {/* UPDATE THIS SRC WITH YOUR SENZA BOTTLE IMAGE */}
                <img
                  src="/image6.png"
                  alt="Senza Italian Spritz"
                  className="h-full w-auto object-contain"
                />
              </div>

              <button
                className="w-full py-3 md:py-2.5 lg:py-4 border-[2px] border-black font-bold text-[18px] md:text-[16px] lg:text-[23px] hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
              >
                Coming soon
              </button>

              <p
                className="w-full text-left mt-3 lg:mt-4 text-[13px] md:text-[12px] lg:text-[14px] font-semibold leading-snug tracking-wide"
                style={{ color: "#0a36af" }}
              >
                NON-ALCOHOL ORANGE ITALIAN SPRITZ 275ml x 24 BOTTLES
              </p>
            </div>

            {/* Product 2: Limoncini */}
            <div className="flex flex-col items-center w-full max-w-[300px] md:max-w-full lg:max-w-[340px] mx-auto">
              <div className="h-[280px] sm:h-[320px] md:h-[280px] lg:h-[380px] w-full flex items-center justify-center mb-5 md:mb-6">
                {/* UPDATE THIS SRC WITH YOUR LIMONCINI BOTTLE IMAGE */}
                <img
                  src="/image4.png"
                  alt="Limoncini Lemon Spritz"
                  className="h-full w-auto object-contain"
                />
              </div>

              <button
                className="w-full py-3 md:py-2.5 lg:py-4 border-[2px] border-black font-bold text-[18px] md:text-[16px] lg:text-[23px] uppercase hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
              >
                ADD TO CART
              </button>

              <p
                className="w-full text-left mt-3 lg:mt-4 text-[13px] md:text-[12px] lg:text-[14px] font-semibold leading-snug tracking-wide uppercase"
                style={{ color: "#0a36af" }}
              >
                LEMON ITALIAN SPRITZ 275ml x 24 BOTTLES
              </p>
            </div>

            {/* Product 3: Arancini */}
            <div className="flex flex-col items-center w-full max-w-[300px] md:max-w-full lg:max-w-[340px] mx-auto">
              <div className="h-[280px] sm:h-[320px] md:h-[280px] lg:h-[380px] w-full flex items-center justify-center mb-5 md:mb-6">
                {/* UPDATE THIS SRC WITH YOUR ARANCINI BOTTLE IMAGE */}
                <img
                  src="/image5.png"
                  alt="Arancini Orange Spritz"
                  className="h-full w-auto object-contain"
                />
              </div>

              <button
                className="w-full py-3 md:py-2.5 lg:py-4 border-[2px] border-black font-bold text-[18px] md:text-[16px] lg:text-[23px] hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#0a36af", color: "#ffc85b" }}
              >
                Coming soon
              </button>

              <p
                className="w-full text-left mt-3 lg:mt-4 text-[13px] md:text-[12px] lg:text-[14px] font-semibold leading-snug tracking-wide uppercase"
                style={{ color: "#0a36af" }}
              >
                ORANGE ITALIAN SPRITZ 275ml x 24 BOTTLES
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* From Mama's Kitchen Section */}
      <section
        id="origins"
        className="w-full px-4 py-12 md:px-6 md:py-20"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="flex justify-center md:justify-start">
              <img
                src="/gemini_generated_image_yoid3hyoid3hyoidd copy.webp"
                alt="Rezzilli Limoncini"
                className="w-full max-w-2xl rounded-2xl shadow-2xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2
                className="text-[30px] font-bold mb-4 md:mb-8"
                style={{ color: "#0a36af" }}
              >
                From Mamma's Kitchen
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed text-justify"
                style={{ color: "#000000" }}
              >
                Rezzilli was born from a cherished memory - the homemade
                tradition that many an Italian Nonna had in their kitchen in
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
        className="w-full py-16 md:py-28"
        style={{ backgroundColor: "#ffffff" }}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          {/* Section Title */}
          <h2
            className="text-center text-[26px] md:text-[32px] font-bold mb-16 uppercase tracking-wide"
            style={{ color: "#0a36af" }}
          >
            Why Rezzilli?
          </h2>

          {/* 3-Column Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">
            {/* Feature 1: Real Sicilian Lemon */}
            <div className="flex flex-col items-center text-center">
              {/* NOTE: Update src with your lemon icon image */}
              <div className="h-40 md:h-48 flex items-center justify-center mb-6">
                <img
                  src="/image10.png"
                  alt="Real Sicilian Lemon"
                  className="max-h-full object-contain"
                />
              </div>
              <h3
                className="text-[18px] md:text-[20px] font-semibold mb-4"
                style={{ color: "#ffc85b" }}
              >
                Real Sicilian Lemon
              </h3>
              <p
                className="text-[15px] md:text-[16px] leading-relaxed"
                style={{ color: "#0a36af" }}
              >
                Made with sun-ripened Sicilian lemon, with no artificial
                colourings or additives, we pour passion and Mediterranean
                values into every bottle to create a bright, refreshing taste
                families love.
              </p>
            </div>

            {/* Feature 2: No Added Sugar */}
            <div className="flex flex-col items-center text-center">
              {/* NOTE: Update src with your no sugar icon image */}
              <div className="h-40 md:h-48 flex items-center justify-center mb-6">
                <img
                  src="/image8.png"
                  alt="No Added Sugar"
                  className="max-h-full object-contain"
                />
              </div>
              <h3
                className="text-[18px] md:text-[20px] font-semibold mb-4"
                style={{ color: "#ffc85b" }}
              >
                No Added Sugar
              </h3>
              <p
                className="text-[15px] md:text-[16px] leading-relaxed"
                style={{ color: "#0a36af" }}
              >
                There are no added sugars or artificial sweeteners in our range,
                so every sip is naturally light, letting the pure character of
                our ingredients shine through in every drop.
              </p>
            </div>

            {/* Feature 3: Bottles and Packaging */}
            <div className="flex flex-col items-center text-center">
              {/* NOTE: Update src with your recycle icon image */}
              <div className="h-40 md:h-48 flex items-center justify-center mb-6">
                <img
                  src="/image9.png"
                  alt="Bottles and Packaging"
                  className="max-h-full object-contain"
                />
              </div>
              <h3
                className="text-[18px] md:text-[20px] font-semibold mb-4"
                style={{ color: "#ffc85b" }}
              >
                Bottles and Packaging
              </h3>
              <p
                className="text-[15px] md:text-[16px] leading-relaxed"
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

      <section className="h-[80vh] py-12 w-full">
        <h2
          className="text-center text-[26px] md:text-[32px] font-bold mb-16 uppercase tracking-wide"
          style={{ color: "#0a36af" }}
        >
          Events & Updates
        </h2>
      </section>
      {/* Contact Form Section */}
      <section
        id="waitlist"
        className="w-full px-4 py-12 md:px-6 md:py-20 lg:py-32"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            <div className="flex flex-col justify-start">
              <h2
                className="text-3xl md:text-5xl font-bold mb-4 md:mb-8"
                style={{ color: "#0a36af" }}
              >
                CONTACT US
              </h2>
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "#000000", textAlign: "justify" }}
              >
                Have a question, special request, or want to stock our drinks?
                Fill out the form and our team will get back to you as soon as
                possible.
              </p>
              <br />
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{ color: "#000000", textAlign: "justify" }}
              >
                Whether you’re a customer, partner, or retailer, we’d love to
                hear from you and help with anything you need.
              </p>
            </div>
            <div className="flex flex-col justify-start">
              {isFormSubmitted ? (
                <div className="flex items-center justify-center p-8 md:p-12">
                  <p
                    className="font-medium text-center leading-relaxed text-base md:text-lg"
                    style={{ color: "#000000" }}
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
                      className="block text-base md:text-lg font-medium mb-2"
                      style={{ color: "#000000" }}
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
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:text-lg"
                      style={{
                        backgroundColor: "#ffffff",
                        fontSize: formData.whoAreYou === "" ? "14px" : "16px",
                        color:
                          formData.whoAreYou === "" ? "#9ca3af" : "#000000",
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
                        className="block text-base md:text-lg font-medium mb-2"
                        style={{ color: "#000000" }}
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
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:text-lg"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-base md:text-lg font-medium mb-2"
                        style={{ color: "#000000" }}
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
                        className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:text-lg"
                        style={{ backgroundColor: "#ffffff" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-base md:text-lg font-medium mb-2"
                      style={{ color: "#000000" }}
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
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:ring-transparent text-base md:text-lg"
                      style={{ backgroundColor: "#ffffff" }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-base md:text-lg font-medium mb-2"
                      style={{ color: "#000000" }}
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
                      className="w-full px-3 py-2 md:px-4 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base md:text-lg resize-vertical"
                      style={{ backgroundColor: "#ffffff" }}
                      placeholder="Tell us more about your interest..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 md:px-8 md:py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#0a36af", color: "#ffffff" }}
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
      <footer
        className="w-full px-4 py-8 md:px-6 md:py-12"
        style={{ backgroundColor: "#0a36af" }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-3 md:space-y-4">
          <img
            src="/rezzilli_draft_logo.webp"
            alt="REZZILLI"
            className="h-12 md:h-16 mx-auto"
          />
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block hover:opacity-80 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="md:w-7 md:h-7"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </a>
          <p className="text-sm md:text-base" style={{ color: "#ffffff" }}>
            Email:{" "}
            <a
              href="mailto:hello@rezzillidrinks.com"
              className="hover:underline"
            >
              hello@rezzillidrinks.com
            </a>
          </p>
          <p className="text-sm md:text-base" style={{ color: "#ffffff" }}>
            Contact no. +447832198470
          </p>
          <p className="text-sm md:text-base" style={{ color: "#ffffff" }}>
            Address: 31, West Street, Burton upon Trent, DE11 9DN
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-white underline font-medium transition-opacity hover:opacity-80 text-xs md:text-sm"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowAlcoholPolicy(true)}
              className="text-white underline font-medium transition-opacity hover:opacity-80 text-xs md:text-sm"
            >
              Alcohol and Safe Use
            </button>
          </div>
          <p className="text-xs md:text-sm" style={{ color: "#ffffff" }}>
            &copy; 2025 REZZILLI. All rights reserved
          </p>
        </div>
      </footer>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ color: "#0a36af" }}
              >
                Privacy Policy
              </h2>
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X
                  size={20}
                  className="md:w-6 md:h-6"
                  style={{ color: "#0a36af" }}
                />
              </button>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 text-gray-800">
              <p className="text-sm md:text-base leading-relaxed">
                This Privacy Policy is a general template for a UK based drinks
                brand website, Rezzilli Drinks, reflecting common UK GDPR
                requirements for such a business.
              </p>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Introduction
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  By using the Rezzilli Drinks website and related online
                  services ("Services"), you agree to the practices described in
                  this Privacy Policy. If you do not agree with any part of this
                  Policy, you should stop using the Services.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  This Privacy Policy explains how Rezzilli Drinks ("Rezzilli
                  Drinks", "we", "us", "our") collects, uses, shares and
                  protects your personal information, and describes the rights
                  you may have under applicable data protection laws, including
                  UK GDPR.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Information we collect
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We collect personal information that you voluntarily provide
                  to us when you contact us, request information about our
                  products or Services, or otherwise interact with us.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  The type of information we collect may include your name and
                  email address, and any other information you choose to provide
                  in your communications with us.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Certain information is collected automatically when you visit
                  or use the Services, such as your IP address, browser type,
                  device information, operating system, language settings,
                  approximate location, access times, pages viewed and other
                  technical usage data.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  This technical information helps us operate, secure and
                  improve the Services and supports our internal analytics and
                  reporting.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  How we use your information
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We use your personal information to operate and administer the
                  Services, respond to enquiries, provide information you
                  request, and manage our relationship with you.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  We also process information to maintain the security of our
                  systems, prevent fraud or misuse, and comply with legal or
                  regulatory obligations.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  We may process your information where necessary to protect the
                  vital interests of an individual, for example where we need to
                  act to prevent serious harm.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Where required, we may use your information for additional
                  purposes with your consent, and will inform you of those
                  purposes at the time.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Legal bases for processing
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We only process your personal information where there is a
                  lawful basis to do so under applicable data protection laws,
                  including UK GDPR.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Depending on the context, this may include your consent, our
                  legitimate interests in operating and improving the Services,
                  compliance with legal obligations, performance of a contract
                  with you, or protection of vital interests.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  When we rely on consent, you are free to withdraw it at any
                  time, without affecting the lawfulness of processing carried
                  out before withdrawal.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If processing is based on other legal grounds (such as legal
                  obligation or legitimate interests), we will explain those
                  grounds where required by law.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Sharing your information
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We may share your personal information with trusted third
                  party vendors, service providers, contractors or agents who
                  perform services on our behalf and require access to such
                  information to carry out that work.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  These third parties are bound by contractual obligations to
                  use your information only in accordance with our instructions,
                  to protect it appropriately and not to disclose it to other
                  organisations.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  We may also share personal information in connection with
                  corporate transactions such as a merger, acquisition, sale of
                  assets, financing or similar business transfer, where such
                  sharing is necessary for the transaction.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  In addition, we may disclose information if required to do so
                  by law, regulation, court order or to respond to lawful
                  requests from public authorities.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Data retention
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We keep your personal information only for as long as
                  necessary to fulfil the purposes described in this Privacy
                  Policy, unless a longer retention period is required or
                  permitted by law (for example, for tax, accounting or
                  regulatory reasons).
                </p>
                <p className="text-base leading-relaxed mt-2">
                  When there is no ongoing legitimate business need to process
                  your information, we will delete or anonymise it, or, if that
                  is not possible (for example, because it is stored in backup
                  archives), we will securely store it and isolate it from
                  further processing until deletion is possible.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Data security
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We implement appropriate technical and organisational security
                  measures designed to protect the personal information we
                  process, including safeguards to prevent unauthorised access,
                  use, alteration or disclosure.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  However, no method of transmission over the internet or method
                  of electronic storage is completely secure, and we cannot
                  guarantee absolute security of your information.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You are responsible for using secure networks and taking
                  reasonable steps to protect your own device and credentials
                  when accessing the Services.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Any transmission of personal information to the Services is at
                  your own risk and should be done within a secure environment
                  where possible.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Children's privacy
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  The Services are not intended for, and we do not knowingly
                  collect personal information from, anyone under 18 years of
                  age.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  By using the Services, you confirm that you are at least 18
                  years old, or that you are the parent or guardian of a minor
                  using the Services with your permission.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If we become aware that we have collected personal information
                  from someone under 18, we will take reasonable steps to delete
                  such information as soon as practicable.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If you believe a child has provided us with personal
                  information, please contact us so we can investigate and take
                  appropriate action.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Your privacy rights
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Depending on your place of residence and applicable law (for
                  example in the UK, EEA or Switzerland), you may have rights in
                  relation to your personal information.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  These can include the right to request access to and a copy of
                  your data, to request correction or deletion, to restrict or
                  object to processing, and, where applicable, to request data
                  portability or to challenge automated decision making.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You can exercise these rights by contacting us using the
                  details provided below, and we will respond in accordance with
                  applicable data protection laws.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You may also have the right to lodge a complaint with your
                  local supervisory authority, such as the UK Information
                  Commissioner's Office (ICO) or the relevant authority in your
                  country or region.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If we rely on your consent for any processing, you may
                  withdraw that consent at any time by contacting us, without
                  affecting processing carried out before withdrawal or
                  processing based on other lawful grounds.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If you have questions or concerns about your privacy rights,
                  you can contact us using the contact information below.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Do Not Track
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Some web browsers and mobile operating systems offer a "Do Not
                  Track" ("DNT") setting that you can enable to signal your
                  privacy preference.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  At present there is no widely accepted industry standard for
                  recognising and responding to DNT signals, so the Services do
                  not currently respond to such signals.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  If a standard for online tracking is adopted in the future
                  that we are required to follow, we will update this Privacy
                  Policy to explain how we respond to DNT signals.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You can adjust your browser or device settings and cookie
                  preferences to manage certain tracking technologies.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Changes to this Privacy Policy
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices, technologies, legal requirements or
                  other factors.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  When we make changes, we will revise the "Last updated" date
                  at the beginning of this document, and the updated version
                  will be effective when it becomes accessible via the Services.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  Where required by law, we may provide additional notice of
                  material changes, such as by displaying a prominent notice on
                  the website or contacting you directly.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You are encouraged to review this Privacy Policy periodically
                  to stay informed about how we handle your personal
                  information.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Contacting Rezzilli Drinks
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  If you have any questions or comments about this Privacy
                  Policy, our privacy practices, or your rights, you can contact
                  Rezzilli Drinks using the contact email address or postal
                  address published on our website.
                </p>
                <p className="text-base leading-relaxed mt-2">
                  You may also use these contact details to submit any request
                  to access, update or delete the personal information we hold
                  about you, subject to applicable law.
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-end">
              <button
                onClick={() => setShowPrivacyPolicy(false)}
                className="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all hover:opacity-90"
                style={{ backgroundColor: "#0a36af", color: "#ffffff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alcohol and Safe Use Modal */}
      {showAlcoholPolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
              <h2
                className="text-xl md:text-2xl font-bold"
                style={{ color: "#0a36af" }}
              >
                Alcohol and Safe Use
              </h2>
              <button
                onClick={() => setShowAlcoholPolicy(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X
                  size={20}
                  className="md:w-6 md:h-6"
                  style={{ color: "#0a36af" }}
                />
              </button>
            </div>
            <div className="px-4 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 text-gray-800">
              <p className="text-sm md:text-base leading-relaxed">
                When consumed in moderation, beer and other alcoholic drinks can
                be part of a balanced lifestyle, but it is essential to
                understand both the potential risks and the importance of
                responsible consumption.
              </p>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Responsible consumption
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Alcohol producers increasingly promote responsible drinking,
                  aiming to reduce harmful use and help consumers make informed
                  decisions about what they drink and how often they drink it.
                  Many brands highlight responsible use on packaging, in
                  advertising, and by offering products with different Alcohol
                  by Volume (ABV), including low- and no-alcohol options to
                  support moderation.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Health considerations
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Drinking alcohol is a personal choice, and individuals should
                  consider their own risks and potential benefits before
                  consuming it. Research indicates links between alcohol
                  consumption and various health conditions, and even moderate
                  drinking may increase risks such as cardiovascular problems,
                  diabetes, and certain cancers for some people.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  When not to drink
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Excessive alcohol use can lead to serious long-term
                  consequences, including physical dependence or addiction, and
                  should always be avoided. Some groups should not drink at all,
                  such as those below the legal drinking age, people who are
                  pregnant, anyone about to drive or operate machinery, and
                  individuals who have difficulty controlling their drinking.
                </p>
              </div>

              <div>
                <h3
                  className="text-lg md:text-xl font-bold mb-2 md:mb-3"
                  style={{ color: "#0a36af" }}
                >
                  Guidelines and further information
                </h3>
                <p className="text-sm md:text-base leading-relaxed">
                  Many governments publish low-risk drinking guidelines to help
                  consumers understand recommended limits and make safer choices
                  about alcohol use. Public health organizations and specialist
                  bodies provide evidence-based information on alcohol and
                  health, including the World Health Organization (WHO), the
                  National Institute on Alcohol Abuse and Alcoholism (NIAAA),
                  national health services, and international alliances focused
                  on responsible drinking.
                </p>
              </div>
            </div>
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-end">
              <button
                onClick={() => setShowAlcoholPolicy(false)}
                className="px-4 py-2 md:px-6 md:py-2 rounded-lg font-semibold text-sm md:text-base transition-all hover:opacity-90"
                style={{ backgroundColor: "#0a36af", color: "#ffffff" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
