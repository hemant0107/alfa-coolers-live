import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  // Product Form State
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Fiber Air Coolers');
  const [price, setPrice] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [specs, setSpecs] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Products List State
  const [productsList, setProductsList] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  // Fetch products from Firestore
  const fetchProducts = async () => {
    setFetchLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductsList(list);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      window.location.href = '/admin.html';
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  // Handle Product Submission to Firebase Firestore
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      await addDoc(collection(db, 'products'), {
        name: productName,
        category: category,
        price: price,
        mediaUrl: mediaUrl,
        specs: specs,
        createdAt: serverTimestamp(),
      });

      setSuccessMsg('Product successfully added and synced with database! 🎉');
      setProductName('');
      setPrice('');
      setMediaUrl('');
      setSpecs('');
      fetchProducts(); // Refresh the list automatically
    } catch (err) {
      console.error('Error adding product: ', err);
      setErrorMsg('Failed to add product. Please check console.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Product Deletion
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Kya aap sach mein is product ko delete karna chahte hain?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        setProductsList(productsList.filter((item) => item.id !== id));
      } catch (err) {
        console.error('Error deleting product:', err);
        alert('Failed to delete product.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <h2 className="text-xl font-black tracking-wider text-blue-500">ALFA ADMIN</h2>
            <p className="text-xs text-slate-400 mt-1">Content Management System</p>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'products' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              📦 Product Manager
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'home' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              🏠 Home Page Content
            </button>
            <button
              onClick={() => setActiveTab('catalogues')}
              className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === 'catalogues' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              📁 Catalogues & PDFs
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-950/40 border border-red-900/50 hover:bg-red-900/50 text-red-300 font-medium py-3 rounded-xl transition-all text-sm"
        >
          Sign Out
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold capitalize">{activeTab} Management</h1>
          <span className="text-xs bg-blue-950 text-blue-400 border border-blue-800 px-3 py-1.5 rounded-full font-medium">
            Live Database Connected
          </span>
        </header>

        <div className="space-y-8">
          {activeTab === 'products' && (
            <>
              {/* Add Product Form */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <h3 className="text-lg font-semibold mb-2">Add New Cooler Product</h3>
                <p className="text-sm text-slate-400 mb-6">Fill out the details below to publish a new product straight to Firestore.</p>

                {successMsg && (
                  <div className="mb-6 p-4 bg-emerald-950/50 border border-emerald-800 text-emerald-300 rounded-xl text-sm">
                    {successMsg}
                  </div>
                )}

                {errorMsg && (
                  <div className="mb-6 p-4 bg-red-950/50 border border-red-800 text-red-300 rounded-xl text-sm">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Product Name
                      </label>
                      <input
                        type="text"
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Alfa Jumbo 100L"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Category
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      >
                        <option value="Fiber Air Coolers">Fiber Air Coolers</option>
                        <option value="Plastic Air Coolers">Plastic Air Coolers</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Price / Wholesale Tag
                      </label>
                      <input
                        type="text"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        placeholder="e.g. Contact for Factory Rate"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                        Media / Image URL
                      </label>
                      <input
                        type="url"
                        required
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                        placeholder="https://example.com/cooler.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Specifications & Details
                    </label>
                    <textarea
                      rows="3"
                      required
                      value={specs}
                      onChange={(e) => setSpecs(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                      placeholder="e.g. Pure copper motor, heavy duty honeycomb pads..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
                  >
                    {loading ? 'Publishing to Database...' : 'Upload & Publish Product'}
                  </button>
                </form>
              </div>

              {/* Existing Products List & Delete Section */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-semibold">Manage Existing Products</h3>
                    <p className="text-sm text-slate-400">View all uploaded products from Firestore and delete unwanted ones.</p>
                  </div>
                  <button
                    onClick={fetchProducts}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-all"
                  >
                    🔄 Refresh List
                  </button>
                </div>

                {fetchLoading ? (
                  <p className="text-sm text-slate-500 text-center py-6 animate-pulse">Loading products from database...</p>
                ) : productsList.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-6 border border-dashed border-slate-800 rounded-xl">
                    No products found in database. Add one above!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {productsList.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between bg-slate-950 border border-slate-800 p-4 rounded-xl gap-4"
                      >
                        <div className="flex items-center gap-4">
                          {product.mediaUrl && (
                            <img
                              src={product.mediaUrl}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded-lg border border-slate-800"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                            />
                          )}
                          <div>
                            <h4 className="font-semibold text-white">{product.name}</h4>
                            <p className="text-xs text-blue-400 font-medium">{product.category}</p>
                            <p className="text-xs text-slate-400 mt-1">Price tag: <span className="text-slate-200">{product.price}</span></p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="bg-red-950/40 border border-red-900/50 hover:bg-red-900 text-red-300 px-4 py-2 rounded-lg text-xs font-medium transition-all"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'home' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Home Page Banners & Texts</h3>
              <p className="text-sm text-slate-400 mb-6">Home page ke headings aur hero section yahan se control honge.</p>
              <div className="p-6 border border-dashed border-slate-700 rounded-xl text-center text-slate-500">
                Home content editor module coming up next...
              </div>
            </div>
          )}

          {activeTab === 'catalogues' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <h3 className="text-lg font-semibold mb-4">Catalogue PDF Uploads</h3>
              <p className="text-sm text-slate-400 mb-6">Naye wholesale price lists aur catalogues yahan upload honge.</p>
              <div className="p-6 border border-dashed border-slate-700 rounded-xl text-center text-slate-500">
                Catalogue uploader module coming up next...
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}