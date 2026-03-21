import { useState } from "react";
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  X, 
  Image as ImageIcon,
  Save
} from "lucide-react";

// --- DUMMY DATA (Structured to match your get-products.php schema & ProductDetail) ---
const mockProducts = [
  {
    id: 1,
    name: "Lemon Italian Spritz",
    tagline: "A refreshing burst of Mediterranean sunshine.",
    variant: "24 Bottles",
    price: "24.00",
    old_price: "28.00",
    abv: "5.0%",
    size: "275ml",
    status: "Active",
    stock: 145,
    image: "/image4.png",
    description: [
      "Experience the true taste of Italy with our signature Lemon Spritz.",
      "Ingredients: Sparkling water, Sicilian lemon juice (12%), sugar, natural flavorings.",
      "Tasting note: Bright, zesty, and perfectly balanced with a bittersweet finish."
    ],
    delivery: {
      banner: "Free Standard UK Delivery on orders over £50", // NEW FIELD DATA
      standard: [
        "Delivered within 3-5 working days.",
        "Fully tracked service."
      ],
      nextDay: [
        "Order before 2pm for next working day delivery.",
        "Signature required upon delivery."
      ]
    },
    nutrition: {
      typicalValues: "Typical values per 100ml:",
      table: [
        { label: "Energy", value: "185kJ / 44kcal" },
        { label: "Fat", value: "0g" },
        { label: "Carbohydrates", value: "10.5g" },
        { label: "Sugars", value: "10.5g" },
        { label: "Protein", value: "0g" },
        { label: "Salt", value: "0.01g" }
      ],
      additionalInfo: [
        "Suitable for vegans and vegetarians.",
        "Gluten-free."
      ]
    }
  },
  {
    id: 2,
    name: "Non-Alcohol Orange Spritz",
    tagline: "All the flavor, none of the guilt.",
    variant: "4 Bottles",
    price: "12.00",
    old_price: null,
    abv: "0.0%",
    size: "275ml",
    status: "Active",
    stock: 82,
    image: "/image6.png",
  },
  {
    id: 3,
    name: "Summer Berry Spritz",
    tagline: "Sweet, tart, and perfectly carbonated.",
    variant: "12 Bottles",
    price: "18.00",
    old_price: "22.00",
    abv: "4.5%",
    size: "275ml",
    status: "Out of Stock",
    stock: 0,
    image: "/image4.png", 
  },
  {
    id: 4,
    name: "Limited Edition Grapefruit",
    tagline: "A bitter-sweet symphony.",
    variant: "24 Bottles",
    price: "26.00",
    old_price: null,
    abv: "5.5%",
    size: "275ml",
    status: "Coming Soon",
    stock: 0,
    image: "/image6.png",
  }
];

function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Filter Logic
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Helper for Status Badges
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">Active</span>;
      case 'Out of Stock':
        return <span className="bg-rose-50 text-rose-700 border border-rose-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">Out of Stock</span>;
      case 'Coming Soon':
        return <span className="bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">Coming Soon</span>;
      default:
        return <span className="bg-slate-50 text-slate-700 border border-slate-200/50 px-2.5 py-1 rounded-md text-xs font-semibold">{status}</span>;
    }
  };

  const openAddDrawer = () => {
    setEditingProduct(null); 
    setIsDrawerOpen(true);
  };

  const openEditDrawer = (product: any) => {
    setEditingProduct(product); 
    setIsDrawerOpen(true);
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-8 py-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sticky top-0 z-10">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Products & Inventory</h1>
          <p className="text-slate-500 text-sm mt-1">Manage your catalog, pricing, stock levels, and product details.</p>
        </div>
        <button 
          onClick={openAddDrawer}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        
        {/* Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-sm"
            />
          </div>
          
          <div className="relative w-full sm:w-48">
            <Filter size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 appearance-none cursor-pointer shadow-sm"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Out of Stock">Out of Stock</option>
              <option value="Coming Soon">Coming Soon</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-200">
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">Image</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Price</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stock</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-slate-500">No products found.</td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="p-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-lg border border-slate-200 p-1 flex items-center justify-center">
                          <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold text-slate-900">{product.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{product.variant} • {product.size}</p>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900">£{product.price}</span>
                          {product.old_price && (
                            <span className="text-xs text-slate-400 line-through">£{product.old_price}</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`text-sm font-semibold ${product.stock < 10 ? 'text-rose-600' : 'text-slate-700'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="p-4">{getStatusBadge(product.status)}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => openEditDrawer(product)}
                            className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- ADD/EDIT PRODUCT DRAWER --- */}
      {isDrawerOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full max-w-[600px] bg-white z-50 shadow-2xl flex flex-col transform transition-transform duration-300 overflow-hidden">
            
            {/* Drawer Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {editingProduct ? `Updating ID: ${editingProduct.id}` : "Create a new catalog entry"}
                </p>
              </div>
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content (Scrollable Form) */}
            <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6">
              <form className="space-y-6">
                
                {/* 1. Basic Info Section */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Basic Details</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Product Name</label>
                    <input 
                      type="text" 
                      defaultValue={editingProduct?.name || ""}
                      placeholder="e.g., Lemon Italian Spritz"
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tagline</label>
                    <input 
                      type="text" 
                      defaultValue={editingProduct?.tagline || ""}
                      placeholder="e.g., A refreshing burst of sunshine."
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Image URL</label>
                    <div className="flex gap-2">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center shrink-0 text-slate-400">
                        <ImageIcon size={18} />
                      </div>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.image || ""}
                        placeholder="/images/product.png"
                        className="flex-1 border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Rich Description Section */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Rich Description</h3>
                  <div>
                    <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      Description Paragraphs
                      <span className="text-[10px] text-slate-400 font-normal">Put each paragraph on a new line</span>
                    </label>
                    <textarea 
                      rows={5} 
                      defaultValue={editingProduct?.description ? editingProduct.description.join('\n') : ""}
                      placeholder="Experience the true taste of Italy...&#10;Ingredients: Sparkling water...&#10;Tasting note: Bright and zesty..."
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
                    />
                  </div>
                </div>

                {/* 3. Inventory & Pricing */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Inventory & Pricing</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Discounted Price (£)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        defaultValue={editingProduct?.price || ""}
                        placeholder="24.00"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1"> Price (£)</label>
                      <input 
                        type="number" 
                        step="0.01"
                        defaultValue={editingProduct?.old_price || ""}
                        placeholder="28.00"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Stock Quantity</label>
                      <input 
                        type="number" 
                        defaultValue={editingProduct?.stock || 0}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                      <select 
                        defaultValue={editingProduct?.status || "Active"}
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
                      >
                        <option value="Active">Active</option>
                        <option value="Out of Stock">Out of Stock</option>
                        <option value="Coming Soon">Coming Soon</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 4. Specifications */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Specifications</h3>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Variant</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.variant || ""}
                        placeholder="24 Bottles"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Size</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.size || ""}
                        placeholder="275ml"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">ABV</label>
                      <input 
                        type="text" 
                        defaultValue={editingProduct?.abv || ""}
                        placeholder="5.0%"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 5. Delivery Information */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Delivery Information</h3>
                  
                  {/* NEW FREE DELIVERY BANNER FIELD */}
                  <div className="mb-4">
                    <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      Free Delivery Highlight Banner
                      <span className="text-[10px] text-slate-400 font-normal">Leave blank to hide on product page</span>
                    </label>
                    <input 
                      type="text" 
                      defaultValue={editingProduct?.delivery?.banner || "Free Standard UK Delivery on orders over £50"}
                      placeholder="e.g., Free Standard UK Delivery on orders over £50"
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        Standard UK Delivery
                        <span className="text-[10px] text-slate-400 font-normal">One bullet per line</span>
                      </label>
                      <textarea 
                        rows={4} 
                        defaultValue={editingProduct?.delivery?.standard ? editingProduct.delivery.standard.join('\n') : ""}
                        placeholder="Delivered within 3-5 working days.&#10;Fully tracked service."
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
                      />
                    </div>
                    <div>
                      <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        Next Day Delivery
                        <span className="text-[10px] text-slate-400 font-normal">One bullet per line</span>
                      </label>
                      <textarea 
                        rows={4} 
                        defaultValue={editingProduct?.delivery?.nextDay ? editingProduct.delivery.nextDay.join('\n') : ""}
                        placeholder="Order before 2pm...&#10;Signature required."
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
                      />
                    </div>
                  </div>
                </div>

                {/* 6. Nutritional Information */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4 mb-6">
                  <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">Nutritional Information</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Typical Values Heading</label>
                    <input 
                      type="text" 
                      defaultValue={editingProduct?.nutrition?.typicalValues || ""}
                      placeholder="e.g., Typical values per 100ml:"
                      className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        Nutrition Table
                        <span className="text-[10px] text-slate-400 font-normal">Format: Nutrient: Value</span>
                      </label>
                      <textarea 
                        rows={6} 
                        defaultValue={editingProduct?.nutrition?.table ? editingProduct.nutrition.table.map((t: any) => `${t.label}: ${t.value}`).join('\n') : ""}
                        placeholder="Energy: 185kJ / 44kcal&#10;Fat: 0g&#10;Carbohydrates: 10.5g"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y font-mono"
                      />
                    </div>
                    <div>
                      <label className=" text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                        Additional Info
                        <span className="text-[10px] text-slate-400 font-normal">One bullet per line</span>
                      </label>
                      <textarea 
                        rows={6} 
                        defaultValue={editingProduct?.nutrition?.additionalInfo ? editingProduct.nutrition.additionalInfo.join('\n') : ""}
                        placeholder="Suitable for vegans.&#10;Gluten-free."
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-y"
                      />
                    </div>
                  </div>
                </div>

              </form>
            </div>

            {/* Drawer Footer (Sticky Actions) */}
            <div className="p-5 border-t border-slate-200 bg-white shrink-0 flex items-center justify-end gap-3">
              <button 
                onClick={() => setIsDrawerOpen(false)}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm">
                <Save size={16} />
                {editingProduct ? "Save Changes" : "Create Product"}
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

export default Products;