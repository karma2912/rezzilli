import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

function Footer() {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showAlcoholPolicy, setShowAlcoholPolicy] = useState(false);

  return (
    <>
      <footer
        className="w-full px-4 py-8 md:px-6 md:py-12"
        style={{ backgroundColor: "#0a36af" }}
      >
        <style>{`
          @media screen and (max-width: 320px) {
            .footer-logo { height: 28px !important; }
          }
        `}</style>

        <div className="max-w-7xl mx-auto text-center space-y-3 md:space-y-4">
          <div>
            <Link to="/">
              <img
                src="/rezzilli.png"
                alt="REZZILLI"
                className="h-14 md:h-20 mx-auto footer-logo"
              />
            </Link>
          </div>
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

      {/* Alcohol Policy Modal */}
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
    </>
  );
}

export default Footer;