import { Link } from "react-router-dom";
import { Pencil, Plus, ChevronDown, X } from "lucide-react";
import { useState } from "react";

function Profile() {
  const user = {
    name: "Rusi Karanjia",
    email: "karanjia.rusi@gmail.com",
    address: {
      company: "XXX",
      line1: "xwincwin ninin",
      line2: "nisncisncis",
      city: "Mumbai",
      region: "Maharashtra",
      zip: "401303",
      country: "India",
      phone: "+919920312153",
    },
  };

  // Dummy order data
  const dummyOrder = {
    id: "ORD-9823-XYZ",
    date: "March 1, 2026",
    status: "Processing",
    total: "£48.00",
    items: [
      {
        name: "LEMON ITALIAN SPRITZ 275ml x 24 BOTTLES",
        quantity: 2,
        image: "/image4.png",
      },
    ],
  };

  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAlcoholPolicy, setShowAlcoholPolicy] = useState(false);
  const [activeTab, setActiveTab] = useState("profile"); // State to manage view

  const isLoggedIn = true;

  return (
    <div className="min-h-screen w-full flex flex-col font-['Libre_Baskerville',_serif] bg-white">
      {/* Header */}
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
          <img
            src="/rezzilli.png"
            alt="Rezzilli Logo"
            className="h-14 md:h-20 header-logo"
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
                <button
                  className="flex items-center gap-1 py-2 text-[15px] font-semibold hover:opacity-80 transition-opacity origins-btn whitespace-nowrap"
                  style={{ color: "#ffc85b" }}
                >
                  Shop{" "}
                  <ChevronDown
                    size={16}
                    className="mt-[2px] transition-transform duration-200 group-hover:rotate-180"
                  />
                </button>
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
                      to="/merchandise"
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
              <div className="relative group flex items-center h-full">
                <button
                  className="hover:opacity-80 transition-opacity flex items-center py-2"
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
                <div className="absolute right-0 md:right-1/2 md:translate-x-1/2 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[140px]">
                  <div
                    className="flex flex-col py-2 shadow-2xl"
                    style={{ backgroundColor: "#0a36af" }}
                  >
                    {!isLoggedIn ? (
                      <Link
                        to="/login"
                        className="block px-5 py-2.5 text-center text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                        style={{ color: "#ffc85b" }}
                      >
                        Login
                      </Link>
                    ) : (
                      <>
                        <button
                          onClick={() => setActiveTab("profile")}
                          className="block w-full text-left px-5 py-2.5 text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                          style={{ color: "#ffc85b" }}
                        >
                          Profile
                        </button>
                        <Link
                        to="/"
                          onClick={() => console.log("Sign out clicked")}
                          className="block w-full text-left px-5 py-2.5 text-[15px] font-semibold hover:bg-white/10 transition-colors whitespace-nowrap"
                          style={{ color: "#ffc85b" }}
                        >
                          Sign Out
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <Link
                to="/cart"
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
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-6 py-10 md:py-16 flex flex-col">
        {/* Top Navigation Tabs */}
        <div className="flex gap-8 border-b border-gray-200 mb-12">
          <button
            onClick={() => setActiveTab("orders")}
            className={`font-bold text-[15px] pb-4 transition-colors ${activeTab === "orders" ? "border-b-[3px] -mb-[2px]" : "text-gray-500 hover:text-[#0a36af]"}`}
            style={{
              borderColor: activeTab === "orders" ? "#0a36af" : "transparent",
              color: activeTab === "orders" ? "#0a36af" : undefined,
            }}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`font-bold text-[15px] pb-4 transition-colors ${activeTab === "profile" ? "border-b-[3px] -mb-[2px]" : "text-gray-500 hover:text-[#0a36af]"}`}
            style={{
              borderColor: activeTab === "profile" ? "#0a36af" : "transparent",
              color: activeTab === "profile" ? "#0a36af" : undefined,
            }}
          >
            Profile
          </button>
        </div>

        {/* Page Title */}
        <h1
          className="text-3xl font-extrabold uppercase tracking-tight mb-12"
          style={{ color: "#0a36af" }}
        >
          {activeTab === "profile" ? "Profile" : "Order History"}
        </h1>

        {/* Conditional Rendering based on activeTab */}
        {activeTab === "profile" ? (
          /* PROFILE VIEW */
          <div className="w-full max-w-2xl flex flex-col gap-12">
            <div className="flex flex-col gap-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Name
                  </span>
                  <button
                    className="text-gray-400 hover:text-[#0a36af] transition-colors"
                    aria-label="Edit Name"
                  >
                    <Pencil size={14} strokeWidth={2.5} />
                  </button>
                </div>
                <p className="text-[16px] text-black font-medium">
                  {user.name}
                </p>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Email
                  </span>
                </div>
                <p className="text-[16px] text-black font-medium">
                  {user.email}
                </p>
              </div>
            </div>

            <hr className="border-gray-200" />

            <div>
              <div className="flex items-center gap-6 mb-8">
                <h2 className="text-xl font-bold text-black uppercase tracking-wide">
                  Addresses
                </h2>
                <button
                  className="flex items-center gap-1 font-bold text-[12px] uppercase tracking-wide transition-opacity hover:opacity-70"
                  style={{ color: "#0a36af" }}
                >
                  <Plus size={16} strokeWidth={3} /> Add
                </button>
              </div>

              <div className="bg-[#faf9f6] border border-gray-200 rounded-xl p-6 md:p-8 relative transition-all hover:shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wide">
                    Default address
                  </span>
                  <button
                    className="text-gray-400 hover:text-[#0a36af] transition-colors"
                    aria-label="Edit Address"
                  >
                    <Pencil size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className="text-black text-[15px] leading-loose">
                  <p className="font-bold text-[16px] mb-1">{user.name}</p>
                  <p>{user.address.company}</p>
                  <p>{user.address.line1}</p>
                  <p>{user.address.line2}</p>
                  <p>
                    {user.address.zip} {user.address.city} {user.address.region}
                  </p>
                  <p>{user.address.country}</p>
                  <p className="mt-2 text-gray-600">{user.address.phone}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* ORDERS VIEW */
          <div className="w-full flex flex-col gap-6">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              {/* Order Header */}
              <div className="bg-gray-50 p-4 md:p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
                    Order Placed
                  </span>
                  <span className="text-[15px] font-semibold text-black">
                    {dummyOrder.date}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
                    Total
                  </span>
                  <span className="text-[15px] font-semibold text-black">
                    {dummyOrder.total}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[12px] text-gray-500 font-bold uppercase tracking-wide">
                    Order ID
                  </span>
                  <span className="text-[15px] font-semibold text-black">
                    {dummyOrder.id}
                  </span>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-[#0a36af] text-[12px] font-bold uppercase rounded-full">
                    {dummyOrder.status}
                  </span>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 md:p-6 bg-white">
                {dummyOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-6">
                    <div className="w-20 h-24 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center p-2 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h3
                        className="text-[15px] font-bold text-black uppercase leading-snug"
                        style={{ color: "#0a36af" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[14px] text-gray-600 mt-2">
                        Quantity:{" "}
                        <span className="font-semibold text-black">
                          {item.quantity}
                        </span>
                      </p>
                    </div>
                  </div>
                ))}

                <div className="mt-6 flex gap-4">
                  <button
                    className="px-5 py-2 border-2 rounded-lg font-bold text-[14px] transition-colors"
                    style={{ borderColor: "#0a36af", color: "#0a36af" }}
                  >
                    Track Package
                  </button>
                  <button className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-[14px] hover:bg-gray-200 transition-colors">
                    View Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer
        className="w-full px-4 py-8 md:px-6 md:py-12"
        style={{ backgroundColor: "#0a36af" }}
      >
        <div className="max-w-7xl mx-auto text-center space-y-3 md:space-y-4">
          <img
            src="/rezzilli.png"
            alt="REZZILLI"
            className="h-14 md:h-12 mx-auto"
          />
          <a
            href="https://www.instagram.com/rezzillidrinks/"
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
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            Email:{" "}
            <a
              href="mailto:hello@rezzillidrinks.com"
              className="hover:underline"
            >
              hello@rezzillidrinks.com
            </a>
          </p>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            Contact no. +447832198470
          </p>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
            Address: 31, West Street, Burton upon Trent, DE11 9DN
          </p>
          <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
            <button
              onClick={() => setShowPrivacyPolicy(true)}
              className="text-white underline font-medium transition-opacity hover:opacity-80 text-[15px]"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowAlcoholPolicy(true)}
              className="text-white underline font-medium transition-opacity hover:opacity-80 text-[15px]"
            >
              Alcohol and Safe Use
            </button>
          </div>
          <p className="text-[15px]" style={{ color: "#ffffff" }}>
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
              <p className="text-[15px] leading-relaxed">
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
                <p className="text-[15px] leading-relaxed">
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
                <p className="text-[15px] leading-relaxed">
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

export default Profile;
