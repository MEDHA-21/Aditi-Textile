import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    MdDashboard, 
    MdInventory, 
    MdShoppingCart, 
    MdRateReview, 
    MdPeople,
    MdLogout,
    MdAdd,
    MdEdit,
    MdDelete,
    MdImage
} from 'react-icons/md';
import { BiSearch } from 'react-icons/bi';
import './ShopkeeperDashboard.css';

const ShopkeeperDashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('products');
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [userSession, setUserSession] = useState(null);

    // Suppress ResizeObserver errors
    useEffect(() => {
        const resizeObserverErrHandler = (e) => {
            if (e.message && e.message.includes('ResizeObserver loop')) {
                e.stopImmediatePropagation();
            }
        };
        window.addEventListener('error', resizeObserverErrHandler);
        return () => window.removeEventListener('error', resizeObserverErrHandler);
    }, []);

    // Check authentication on mount
    useEffect(() => {
        const session = localStorage.getItem('shopkeeper_session');
        if (!session) {
            navigate('/shopkeeper-login');
        } else {
            setUserSession(JSON.parse(session));
        }
    }, [navigate]);
    
    // Mock data - will be replaced with real data
    const [products, setProducts] = useState([
        { id: 1, name: 'Sambalpuri Cotton Saree', category: 'women', price: 2499, stock: 15, status: 'active' },
        { id: 2, name: 'Traditional Silk Saree', category: 'women', price: 4999, stock: 8, status: 'active' },
        { id: 3, name: 'Traditional Kurta', category: 'men', price: 1299, stock: 20, status: 'active' },
    ]);

    const [orders, setOrders] = useState([
        { id: 'ORD001', customer: 'Priya Sharma', items: 2, total: 7498, status: 'pending', date: '2025-11-10' },
        { id: 'ORD002', customer: 'Rahul Kumar', items: 1, total: 1299, status: 'processing', date: '2025-11-11' },
        { id: 'ORD003', customer: 'Anjali Singh', items: 3, total: 9997, status: 'shipped', date: '2025-11-09' },
    ]);

    const [productForm, setProductForm] = useState({
        name: '',
        category: 'women',
        price: '',
        stock: '',
        discount: '',
        description: '',
        image: null
    });

    const handleLogout = () => {
        // Clear shopkeeper session
        localStorage.removeItem('shopkeeper_session');
        navigate('/shopkeeper-login');
    };

    const handleProductFormChange = (e) => {
        const { name, value } = e.target;
        setProductForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setProductForm(prev => ({
            ...prev,
            image: file
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const newProduct = {
            id: products.length + 1,
            name: productForm.name,
            category: productForm.category,
            price: parseInt(productForm.price),
            stock: parseInt(productForm.stock),
            discount: parseInt(productForm.discount) || 0,
            status: 'active'
        };
        setProducts([...products, newProduct]);
        setProductForm({ name: '', category: 'women', price: '', stock: '', discount: '', description: '', image: null });
        setShowAddProduct(false);
        alert('Product added successfully!');
    };

    const handleDeleteProduct = (id) => {
        // Only shopkeeper can delete
        if (userSession?.role !== 'shopkeeper') {
            alert('Only shopkeeper can delete products');
            return;
        }
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleUpdateOrderStatus = (orderId, newStatus) => {
        setOrders(orders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
        ));
        alert(`Order ${orderId} status updated to ${newStatus}`);
    };

    const stats = {
        totalProducts: products.length,
        lowStock: products.filter(p => p.stock < 10).length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalRevenue: orders.reduce((sum, order) => sum + order.total, 0)
    };

    // Check if user has permission for certain actions
    const canDelete = userSession?.role === 'shopkeeper';
    const canAddProduct = userSession?.role === 'shopkeeper';

    if (!userSession) {
        return <div>Loading...</div>;
    }

    return (
        <div className="shopkeeper-dashboard">
            <div className="dashboard-sidebar">
                <div className="sidebar-header">
                    <h2>Aditi Textile</h2>
                    <p>{userSession.role === 'shopkeeper' ? 'Shopkeeper Portal' : 'Worker Portal'}</p>
                    <small style={{ fontSize: '12px', opacity: 0.8 }}>Welcome, {userSession.name}</small>
                </div>
                <nav className="sidebar-nav">
                    <button 
                        className={activeTab === 'dashboard' ? 'active' : ''}
                        onClick={() => {
                            setShowAddProduct(false);
                            setActiveTab('dashboard');
                        }}
                    >
                        <MdDashboard size={20} />
                        Dashboard
                    </button>
                    <button 
                        className={activeTab === 'products' ? 'active' : ''}
                        onClick={() => {
                            setShowAddProduct(false);
                            setActiveTab('products');
                        }}
                    >
                        <MdInventory size={20} />
                        Products
                    </button>
                    <button 
                        className={activeTab === 'orders' ? 'active' : ''}
                        onClick={() => {
                            setShowAddProduct(false);
                            setActiveTab('orders');
                        }}
                    >
                        <MdShoppingCart size={20} />
                        Orders
                    </button>
                    <button 
                        className={activeTab === 'reviews' ? 'active' : ''}
                        onClick={() => {
                            setShowAddProduct(false);
                            setActiveTab('reviews');
                        }}
                    >
                        <MdRateReview size={20} />
                        Reviews
                    </button>
                    <button 
                        className={activeTab === 'customers' ? 'active' : ''}
                        onClick={() => {
                            setShowAddProduct(false);
                            setActiveTab('customers');
                        }}
                    >
                        <MdPeople size={20} />
                        Customers
                    </button>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    <MdLogout size={20} />
                    Logout
                </button>
            </div>

            <div className="dashboard-content">
                {/* Dashboard Tab */}
                {activeTab === 'dashboard' && (
                    <div className="dashboard-tab">
                        <h1>Dashboard Overview</h1>
                        <div className="stats-grid">
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#e63946' }}>
                                    <MdInventory size={28} />
                                </div>
                                <div className="stat-info">
                                    <h3>{stats.totalProducts}</h3>
                                    <p>Total Products</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#f59e0b' }}>
                                    <MdShoppingCart size={28} />
                                </div>
                                <div className="stat-info">
                                    <h3>{stats.pendingOrders}</h3>
                                    <p>Pending Orders</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#10b981' }}>
                                    <MdInventory size={28} />
                                </div>
                                <div className="stat-info">
                                    <h3>₹{stats.totalRevenue.toLocaleString()}</h3>
                                    <p>Total Revenue</p>
                                </div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-icon" style={{ background: '#ef4444' }}>
                                    <MdInventory size={28} />
                                </div>
                                <div className="stat-info">
                                    <h3>{stats.lowStock}</h3>
                                    <p>Low Stock Alert</p>
                                </div>
                            </div>
                        </div>

                        <div className="recent-orders">
                            <h2>Recent Orders</h2>
                            <div className="orders-list">
                                {orders.slice(0, 5).map(order => (
                                    <div key={order.id} className="order-item">
                                        <div>
                                            <strong>{order.id}</strong>
                                            <p>{order.customer}</p>
                                        </div>
                                        <div>
                                            <strong>₹{order.total}</strong>
                                            <p>{order.items} items</p>
                                        </div>
                                        <span className={`status-badge ${order.status}`}>{order.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Tab */}
                {activeTab === 'products' && (
                    <div className="products-tab">
                        <div className="tab-header">
                            <h1>Products Management</h1>
                            {canAddProduct && (
                                <button className="add-btn" onClick={() => setShowAddProduct(true)}>
                                    <MdAdd size={20} />
                                    Add Product
                                </button>
                            )}
                        </div>

                        <div className="search-bar">
                            <BiSearch size={20} />
                            <input type="text" placeholder="Search products..." />
                        </div>

                        <div className="products-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product Name</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>#{product.id}</td>
                                            <td>{product.name}</td>
                                            <td><span className="category-badge">{product.category}</span></td>
                                            <td>₹{product.price}</td>
                                            <td className={product.stock < 10 ? 'low-stock' : ''}>{product.stock}</td>
                                            <td><span className="status-badge active">{product.status}</span></td>
                                            <td>
                                                <button className="action-btn edit"><MdEdit /></button>
                                                {canDelete && (
                                                    <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)}>
                                                        <MdDelete />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                    <div className="orders-tab">
                        <h1>Orders Management</h1>
                        <div className="orders-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td><strong>{order.id}</strong></td>
                                            <td>{order.customer}</td>
                                            <td>{order.items}</td>
                                            <td>₹{order.total}</td>
                                            <td>{order.date}</td>
                                            <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                                            <td>
                                                <select 
                                                    value={order.status}
                                                    onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                                                    className="status-select"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipped">Shipped</option>
                                                    <option value="delivered">Delivered</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                    <div className="reviews-tab">
                        <h1>Reviews Management</h1>
                        <p className="coming-soon">Reviews management coming soon...</p>
                    </div>
                )}

                {/* Customers Tab */}
                {activeTab === 'customers' && (
                    <div className="customers-tab">
                        <h1>Customers Management</h1>
                        <p className="coming-soon">Customer management coming soon...</p>
                    </div>
                )}
            </div>

            {/* Add Product Modal */}
            {showAddProduct && (
                <div className="modal-overlay" onClick={() => setShowAddProduct(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <label>Product Name *</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={productForm.name}
                                    onChange={handleProductFormChange}
                                    required 
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Category *</label>
                                    <select 
                                        name="category"
                                        value={productForm.category}
                                        onChange={handleProductFormChange}
                                        required
                                    >
                                        <option value="women">Women</option>
                                        <option value="men">Men</option>
                                        <option value="kids">Kids</option>
                                        <option value="others">Others</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Price (₹) *</label>
                                    <input 
                                        type="number" 
                                        name="price"
                                        value={productForm.price}
                                        onChange={handleProductFormChange}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Stock Quantity *</label>
                                    <input 
                                        type="number" 
                                        name="stock"
                                        value={productForm.stock}
                                        onChange={handleProductFormChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Discount (%)</label>
                                    <input 
                                        type="number" 
                                        name="discount"
                                        value={productForm.discount}
                                        onChange={handleProductFormChange}
                                        min="0"
                                        max="100"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea 
                                    name="description"
                                    value={productForm.description}
                                    onChange={handleProductFormChange}
                                    rows="4"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Product Image</label>
                                <div className="file-upload">
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        id="product-image"
                                    />
                                    <label htmlFor="product-image" className="upload-label">
                                        <MdImage size={24} />
                                        {productForm.image ? productForm.image.name : 'Choose Image'}
                                    </label>
                                </div>
                            </div>
                            <div className="modal-actions">
                                <button type="button" className="cancel-btn" onClick={() => setShowAddProduct(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="submit-btn">
                                    Add Product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopkeeperDashboard;
