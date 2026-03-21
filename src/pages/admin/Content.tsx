import { useState } from "react";
import { 
  Image as ImageIcon, 
  Plus, 
  Trash2, 
  Save, 
  Edit, 
  MoveUp, 
  MoveDown,
  LayoutTemplate,
  CalendarDays,
  Target,
  BookOpen,
  MessageSquare
} from "lucide-react";

// --- DUMMY DATA (Matching your Home.tsx structure) ---
const mockCarousel = [
  { id: 1, src: "/image1.webp", link: null, order: 1 },
  { id: 2, src: "/image2.webp", link: "/product/2", order: 2 },
  { id: 3, src: "/image3.webp", link: null, order: 3 },
  { id: 4, src: "/image4.webp", link: "/spritz", order: 4 },
];

const mockValues = [
  { id: 1, title: "Real Sicilian Lemon", text: "Made with sun-ripened Sicilian lemon, with no artificial colourings...", image: "/image10.png" },
  { id: 2, title: "No Added Sugar", text: "There are no added sugars or artificial sweeteners in our range...", image: "/image8.png" },
  { id: 3, title: "Bottles and Packaging", text: "Our bottles and packaging are designed with the planet in mind...", image: "/image9.png" },
];

const mockEvents = {
  featured: {
    title: "OFFICIAL LAUNCH NIGHT",
    venue: "Isabel’s Restaurant & Bar, Burton-upon-Trent",
    date: "April 2026",
    description: "Join us for the official Rezzilli launch night at Isabel’s. An evening of tastings, pizza, cocktails and DJ sets.",
    image: "/featured-event.jpg"
  },
  cards: [
    { id: 1, date: "April 15, 2026", type: "Event", title: "Official Launch Night", description: "Join us for the official Rezzilli launch night at Isabel’s...", image: "/gemini_generated_image_yoid3hyoid3hyoidd copy.webp" },
    { id: 2, date: "May 2026", type: "Festival", title: "Foodies Festival", description: "Catch the Rezzilli team across the UK at Foodies Festivals!", image: "/image1.webp" },
    { id: 3, date: "Summer 2026", type: "Event", title: "Great British Food Festival", description: "Our tour continues at the Great British Food Festival...", image: "/image2.webp" },
  ],
  modal: {
    title: "FOODIES FESTIVAL 2026",
    description: "We’ll be at the Rezzilli stand with tastings, chats and bottle sales.\n\nLocations and Dates:\nBrighton – Preston Park, May 2026\nSyon Park – London, May 2026\nTatton Park | Summer 2026\nEdinburgh | Summer 2026\n\nAlso planned: Glasgow, Oxford and Bath (dates TBC). Our team will be in full Rezzilli merchandise, so you can’t miss us.",
    image: "/image1.webp"
  }
};

const mockStory = {
  title: "From Mamma's Kitchen",
  text: "Rezzilli was born from a cherished memory - the homemade tradition that many an Italian Mamma had in their kitchen in Italy making homemade Limoncello. Inspired by those authentic flavours, we have taken the family recipe and created our unique drinks that honours that heritage but speaks to today's lifestyle. We have reimagined the classic Italian digestivo as a spritz summer drink - refreshing, light, and made with Italian ingredients for the true lovers of aperitivo culture.",
  image: "/gemini_generated_image_yoid3hyoid3hyoidd copy.webp"
};

const mockContact = {
  title: "CONTACT US",
  description: "Have a question, special request, or want to stock our drinks? Fill out the form and our team will get back to you as soon as possible.\n\nWhether you’re a customer, partner, or retailer, we’d love to hear from you and help with anything you need.\n\nEmail: hello@rezzillidrinks.com\nPhone: +447832198470"
};

function Content() {
  const [activeTab, setActiveTab] = useState("carousel");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert("Content saved successfully! Changes will appear on the Home page immediately.");
    }, 800);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Home Page Manager</h1>
          <p className="text-slate-500 text-sm mt-1">Control exactly what appears on your storefront homepage.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-70"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Publish Changes"}
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        
        {/* Navigation Tabs (Scrollable on small screens) */}
        <div className="flex overflow-x-auto space-x-1 bg-slate-200/50 p-1 rounded-xl mb-8 w-max max-w-full">
          <button
            onClick={() => setActiveTab("carousel")}
            className={`flex items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "carousel" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <LayoutTemplate size={16} /> Hero Carousel
          </button>
          <button
            onClick={() => setActiveTab("story")}
            className={`flex items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "story" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <BookOpen size={16} /> Our Story
          </button>
          <button
            onClick={() => setActiveTab("values")}
            className={`flex items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "values" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <Target size={16} /> Why Rezzilli?
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`flex items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "events" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <CalendarDays size={16} /> Events
          </button>
          <button
            onClick={() => setActiveTab("contact")}
            className={`flex items-center whitespace-nowrap gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              activeTab === "contact" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            <MessageSquare size={16} /> Contact Info
          </button>
        </div>

        {/* --- CAROUSEL TAB --- */}
        {activeTab === "carousel" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Hero Images</h2>
                <p className="text-sm text-slate-500">These images scroll automatically at the very top of the homepage.</p>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                <Plus size={16} /> Add Image
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {mockCarousel.map((slide, i) => (
                  <div key={slide.id} className="p-4 flex items-center gap-6 hover:bg-slate-50/50 transition-colors group">
                    <div className="flex flex-col gap-1 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="hover:text-indigo-600"><MoveUp size={16} /></button>
                      <button className="hover:text-indigo-600"><MoveDown size={16} /></button>
                    </div>
                    <div className="w-32 h-20 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                      <img src={slide.src} alt={`Slide ${i + 1}`} className="w-full h-full object-cover opacity-50" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                        <input type="text" defaultValue={slide.src} className="w-full max-w-md border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Click Link (Optional)</label>
                        <input type="text" defaultValue={slide.link || ""} placeholder="/spritz or /product/2" className="w-full max-w-md border border-slate-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                      </div>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors self-start mt-2">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- OUR STORY TAB --- */}
        {activeTab === "story" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Origins Section</h2>
              <p className="text-sm text-slate-500">Edit the "From Mamma's Kitchen" block on the homepage.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Section Title</label>
                  <input type="text" defaultValue={mockStory.title} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Story Paragraph</label>
                  <textarea rows={10} defaultValue={mockStory.text} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="block text-xs font-bold text-slate-700">Side Image</label>
                <div className="w-full h-64 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center relative overflow-hidden group cursor-pointer hover:border-indigo-400">
                  <img src={mockStory.image} alt="Story" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity" />
                  <div className="z-10 flex flex-col items-center text-slate-700 group-hover:text-indigo-600 transition-colors">
                    <ImageIcon size={32} className="mb-2" />
                    <span className="text-sm font-semibold">Change Image</span>
                  </div>
                </div>
                <input type="text" defaultValue={mockStory.image} className="w-full border border-slate-300 rounded-lg p-2 mt-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" placeholder="Image URL" />
              </div>
            </div>
          </div>
        )}

        {/* --- CORE VALUES TAB --- */}
        {activeTab === "values" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Why Rezzilli Pillars</h2>
              <p className="text-sm text-slate-500">The 3 core value blocks displayed in the middle of the homepage.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockValues.map((val) => (
                <div key={val.id} className="bg-white border border-slate-200 rounded-xl shadow-sm p-5 space-y-4">
                  <div className="w-full h-32 bg-slate-50 rounded-lg border border-slate-100 flex flex-col items-center justify-center gap-2 text-slate-400 cursor-pointer hover:bg-slate-100 transition-colors relative overflow-hidden">
                    <img src={val.image} alt="icon" className="h-16 object-contain opacity-50" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 opacity-0 hover:opacity-100 transition-opacity text-indigo-600">
                      <ImageIcon size={20} />
                      <span className="text-xs font-bold mt-1">Update</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title</label>
                    <input type="text" defaultValue={val.title} className="w-full border border-slate-300 rounded-lg p-2 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description</label>
                    <textarea rows={5} defaultValue={val.text} className="w-full border border-slate-300 rounded-lg p-2 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- EVENTS TAB --- */}
        {activeTab === "events" && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Featured Event Hero */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900">Featured Event (Top Block)</h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Main Title</label>
                    <input type="text" defaultValue={mockEvents.featured.title} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Venue/Location</label>
                      <input type="text" defaultValue={mockEvents.featured.venue} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Date String</label>
                      <input type="text" defaultValue={mockEvents.featured.date} placeholder="e.g., April 2026" className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Description Paragraph</label>
                    <textarea rows={4} defaultValue={mockEvents.featured.description} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="block text-xs font-bold text-slate-700">Side Image</label>
                  <div className="flex-1 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 hover:border-indigo-400 hover:text-indigo-500 cursor-pointer transition-colors relative overflow-hidden">
                     <img src={mockEvents.featured.image} className="absolute inset-0 w-full h-full object-cover opacity-30" alt="" />
                    <ImageIcon size={32} className="mb-2 z-10" />
                    <span className="text-sm font-semibold z-10">Update image</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Cards Grid */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">Event Cards Grid</h3>
                <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-2 py-1 rounded">3 Cards Visible</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {mockEvents.cards.map((card) => (
                  <div key={card.id} className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
                    <div className="h-32 bg-slate-100 flex items-center justify-center relative group">
                      <img src={card.image} className="w-full h-full object-cover" alt="" />
                      <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                        <span className="text-white text-xs font-bold flex items-center gap-2"><Edit size={14}/> Change Image</span>
                      </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-3">
                      <div className="flex gap-2">
                        <input type="text" defaultValue={card.date} className="w-1/2 border border-slate-300 rounded-md p-1.5 text-xs text-slate-500 focus:outline-none focus:border-indigo-500" placeholder="Date" />
                        <input type="text" defaultValue={card.type} className="w-1/2 border border-slate-300 rounded-md p-1.5 text-xs text-slate-500 focus:outline-none focus:border-indigo-500" placeholder="Type (e.g. Event)" />
                      </div>
                      <input type="text" defaultValue={card.title} className="w-full border border-slate-300 rounded-md p-2 text-sm font-bold text-slate-900 focus:outline-none focus:border-indigo-500" placeholder="Card Title" />
                      <textarea rows={3} defaultValue={card.description} className="w-full border border-slate-300 rounded-md p-2 text-xs text-slate-600 focus:outline-none focus:border-indigo-500 resize-none flex-1" placeholder="Card Description..." />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Details Modal Content */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
                <h3 className="font-bold text-slate-900">Pop-up Modal Content (Read More)</h3>
                <p className="text-xs text-slate-500 mt-1">This is the content that appears when a user clicks "Read More" on an event card.</p>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Event Title</label>
                  <input type="text" defaultValue={mockEvents.modal.title} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
                </div>
                <div>
                  <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                    Event Description
                    <span className="text-[10px] text-slate-400 font-normal">Supports multiple paragraphs and spacing</span>
                  </label>
                  <textarea rows={10} defaultValue={mockEvents.modal.description} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none whitespace-pre-wrap" />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* --- CONTACT INFO TAB --- */}
        {activeTab === "contact" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Contact Us Section</h2>
              <p className="text-sm text-slate-500">Edit the intro text displayed next to the contact form.</p>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 max-w-2xl space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Main Heading</label>
                <input type="text" defaultValue={mockContact.title} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" />
              </div>
              
              <div>
                <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  Description
                  <span className="text-[10px] text-slate-400 font-normal">Supports multiple paragraphs and spacing</span>
                </label>
                <textarea rows={10} defaultValue={mockContact.description} className="w-full border border-slate-300 rounded-lg p-2.5 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none whitespace-pre-wrap" />
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Content;