import { useState, useEffect } from "react";
import { Search, Filter, Eye, X, Mail, User, MessageSquare, Clock, CheckCircle, Send } from "lucide-react";

function ContactEnquiries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // DYNAMIC STATES
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  // FETCH FROM DATABASE
  useEffect(() => {
    fetch("https://rezzillidrinks.com/api/get-enquiries.php")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.enquiries) setEnquiries(data.enquiries);
      })
      .catch(err => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  // UPDATE STATUS FUNCTION
  const updateStatus = async (rawId: number, newStatus: string) => {
    try {
      await fetch("https://rezzillidrinks.com/api/update-enquiry.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: rawId, status: newStatus })
      });
      // Update UI
      setEnquiries(prev => prev.map(e => e.raw_id === rawId ? { ...e, status: newStatus } : e));
    } catch (err) { console.error(err); }
  };

  const filteredEnquiries = enquiries.filter(enquiry => {
    const fullName = `${enquiry.firstName} ${enquiry.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) || enquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || enquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getInitials = (first: string, last: string) => `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New': return <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><Clock size={12} /> New</span>;
      case 'Read': return <span className="bg-sky-50 text-sky-700 border border-sky-200/50 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><Eye size={12} /> Read</span>;
      case 'Replied': return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1 w-max"><CheckCircle size={12} /> Replied</span>;
      default: return <span className="bg-slate-50 text-slate-700 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">{status}</span>;
    }
  };

  const handleOpenDrawer = (enquiry: any) => {
    setSelectedEnquiry(enquiry);
    setReplyMessage(""); 
    if (enquiry.status === "New") {
      updateStatus(enquiry.raw_id, "Read"); 
    }
  };

  const handleSendReply = () => {
    if (!replyMessage.trim()) return;
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      updateStatus(selectedEnquiry.raw_id, "Replied");
      setSelectedEnquiry({ ...selectedEnquiry, status: "Replied" });
      alert(`Reply sent successfully to ${selectedEnquiry.email}!`);
      setReplyMessage("");
    }, 1000);
  };

  if (isLoading) {
    return <div className="w-full min-h-screen bg-slate-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <MessageSquare size={24} className="text-indigo-600" />
            Contact Enquiries
          </h1>
          <p className="text-slate-500 text-sm mt-1">Review and respond to messages from your storefront.</p>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm" />
          </div>
          <div className="relative w-full sm:w-48">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer shadow-sm">
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Read">Read</option>
              <option value="Replied">Replied</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Sender</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:table-cell">Message Preview</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEnquiries.length === 0 ? (
                  <tr><td colSpan={6} className="p-8 text-center text-slate-500">No enquiries found.</td></tr>
                ) : (
                  filteredEnquiries.map((enq) => (
                    <tr key={enq.id} onClick={() => handleOpenDrawer(enq)} className={`hover:bg-slate-50/50 transition-colors group cursor-pointer ${enq.status === 'New' ? 'bg-amber-50/10' : ''}`}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${enq.status === 'New' ? 'bg-amber-100 text-amber-700 border-amber-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                            {getInitials(enq.firstName, enq.lastName)}
                          </div>
                          <div>
                            <p className={`text-sm ${enq.status === 'New' ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>{enq.firstName} {enq.lastName}</p>
                            <p className="text-xs text-slate-500">{enq.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4"><span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">{enq.whoAreYou}</span></td>
                      <td className="p-4 hidden md:table-cell max-w-xs"><p className={`text-sm truncate ${enq.status === 'New' ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>{enq.message}</p></td>
                      <td className="p-4">{getStatusBadge(enq.status)}</td>
                      <td className="p-4 text-sm text-slate-600">{enq.date}</td>
                      <td className="p-4 text-right">
                        <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
                          <Eye size={16} /> View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedEnquiry && (
        <>
          <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity" onClick={() => setSelectedEnquiry(null)} />
          <div className="fixed top-0 right-0 h-full w-full max-w-[550px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300">
            <div className="px-6 py-6 border-b border-slate-100 bg-white shrink-0 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600"></div>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg shrink-0 border border-indigo-100">
                    {getInitials(selectedEnquiry.firstName, selectedEnquiry.lastName)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedEnquiry.firstName} {selectedEnquiry.lastName}</h2>
                    <p className="text-sm font-semibold text-indigo-600 mt-0.5">{selectedEnquiry.whoAreYou}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button onClick={() => setSelectedEnquiry(null)} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"><X size={20} /></button>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 space-y-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 text-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-slate-600">
                      <Mail size={16} className="text-slate-400" />
                      <a href={`mailto:${selectedEnquiry.email}`} className="font-medium hover:text-indigo-600 hover:underline">{selectedEnquiry.email}</a>
                    </div>
                    <span className="text-xs font-semibold text-slate-400">{selectedEnquiry.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <User size={16} className="text-slate-400" />
                    <span className="font-medium">Ticket ID: {selectedEnquiry.id}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                  <MessageSquare size={16} className="text-indigo-600" />
                  <h3 className="text-sm font-bold text-slate-900">Inquiry Message</h3>
                </div>
                <div className="p-5">
                  <p className="text-[15px] leading-relaxed text-slate-700 whitespace-pre-wrap">{selectedEnquiry.message}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                  <h3 className="text-sm font-bold text-slate-900">Draft Reply</h3>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <textarea 
                    value={replyMessage} onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder={`Hi ${selectedEnquiry.firstName},\n\nType your response here...`}
                    className="w-full flex-1 min-h-[150px] text-sm text-slate-700 p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none mb-4"
                  />
                  <div className="flex justify-end">
                    <button onClick={handleSendReply} disabled={isSending || !replyMessage.trim()} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed">
                      <Send size={16} /> {isSending ? "Sending..." : "Send Reply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ContactEnquiries;