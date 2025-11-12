import React, { useState } from 'react';
import { BiPlus, BiEdit, BiTrash, BiHome, BiBuilding, BiMapPin } from 'react-icons/bi';
import { MdLocationOn, MdPhone, MdAccessTime } from 'react-icons/md';
import { FaGoogle } from 'react-icons/fa';
import './Addresses.css';

const Addresses = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);

    // Store Address
    const storeAddress = {
        name: 'Aditi Textile',
        address: 'FXG3+FMQ, Dhubopara, Bada Bazar, Khetrajpur',
        city: 'Sambalpur',
        state: 'Odisha',
        pincode: '768003',
        phone: '079780 66232',
        hours: 'Open ⋅ Closes 8 pm',
        rating: '4.05',
        googleMapsLink: 'https://share.google/ldg3BC7MIOhH2X2nC',
        type: 'store'
    };

    // User's saved addresses
    const [savedAddresses, setSavedAddresses] = useState([
        {
            id: 1,
            name: 'Home',
            fullName: 'Rakhi Bhagat',
            phone: '9876543210',
            address: '123, Near Temple Road',
            city: 'Sambalpur',
            state: 'Odisha',
            pincode: '768001',
            type: 'home',
            isDefault: true
        },
        {
            id: 2,
            name: 'Office',
            fullName: 'Rakhi Bhagat',
            phone: '9876543210',
            address: '456, Business Complex, Main Road',
            city: 'Sambalpur',
            state: 'Odisha',
            pincode: '768002',
            type: 'work',
            isDefault: false
        }
    ]);

    const [formData, setFormData] = useState({
        name: '',
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        type: 'home'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingAddress) {
            setSavedAddresses(savedAddresses.map(addr => 
                addr.id === editingAddress.id ? { ...formData, id: addr.id, isDefault: addr.isDefault } : addr
            ));
        } else {
            setSavedAddresses([...savedAddresses, { 
                ...formData, 
                id: Date.now(),
                isDefault: savedAddresses.length === 0 
            }]);
        }
        resetForm();
    };

    const resetForm = () => {
        setFormData({
            name: '',
            fullName: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            pincode: '',
            type: 'home'
        });
        setShowAddForm(false);
        setEditingAddress(null);
    };

    const handleEdit = (address) => {
        setFormData(address);
        setEditingAddress(address);
        setShowAddForm(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this address?')) {
            setSavedAddresses(savedAddresses.filter(addr => addr.id !== id));
        }
    };

    const handleSetDefault = (id) => {
        setSavedAddresses(savedAddresses.map(addr => ({
            ...addr,
            isDefault: addr.id === id
        })));
    };

    const getAddressIcon = (type) => {
        switch (type) {
            case 'home':
                return <BiHome size={20} />;
            case 'work':
                return <BiBuilding size={20} />;
            default:
                return <BiMapPin size={20} />;
        }
    };

    return (
        <div className="addresses-page">
            <div className="page-header">
                <h1>My Addresses</h1>
                <p>Manage your delivery addresses</p>
            </div>

            {/* Store Address Section */}
            <div className="store-section">
                <h2 className="section-title">Visit Our Store</h2>
                <div className="store-card">
                    <div className="store-header">
                        <div>
                            <h3>{storeAddress.name}</h3>
                            <div className="store-rating">
                                <FaGoogle size={16} color="#4285F4" />
                                <span>{storeAddress.rating} Google reviews</span>
                            </div>
                            <p className="store-type">Women's clothing store in Sambalpur, Odisha</p>
                        </div>
                    </div>

                    <div className="store-details">
                        <div className="store-detail-item">
                            <MdLocationOn size={20} color="#e63946" />
                            <div>
                                <strong>Address</strong>
                                <p>{storeAddress.address}</p>
                                <p>{storeAddress.city}, {storeAddress.state} {storeAddress.pincode}</p>
                            </div>
                        </div>

                        <div className="store-detail-item">
                            <MdPhone size={20} color="#e63946" />
                            <div>
                                <strong>Phone</strong>
                                <p><a href={`tel:${storeAddress.phone}`}>{storeAddress.phone}</a></p>
                            </div>
                        </div>

                        <div className="store-detail-item">
                            <MdAccessTime size={20} color="#e63946" />
                            <div>
                                <strong>Hours</strong>
                                <p>{storeAddress.hours}</p>
                            </div>
                        </div>
                    </div>

                    <div className="store-actions">
                        <a 
                            href={storeAddress.googleMapsLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="directions-btn"
                        >
                            <MdLocationOn size={20} />
                            Get Directions
                        </a>
                        <a 
                            href={`tel:${storeAddress.phone}`}
                            className="call-btn"
                        >
                            <MdPhone size={20} />
                            Call Now
                        </a>
                    </div>
                </div>
            </div>

            {/* Saved Addresses Section */}
            <div className="addresses-section">
                <div className="section-header">
                    <h2 className="section-title">Delivery Addresses</h2>
                    <button 
                        className="add-address-btn"
                        onClick={() => setShowAddForm(true)}
                    >
                        <BiPlus size={20} />
                        Add New Address
                    </button>
                </div>

                <div className="addresses-grid">
                    {savedAddresses.map((address) => (
                        <div key={address.id} className="address-card">
                            {address.isDefault && (
                                <span className="default-badge">Default</span>
                            )}
                            
                            <div className="address-header">
                                <div className="address-type">
                                    {getAddressIcon(address.type)}
                                    <span>{address.name}</span>
                                </div>
                                <div className="address-actions">
                                    <button onClick={() => handleEdit(address)}>
                                        <BiEdit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(address.id)}>
                                        <BiTrash size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="address-details">
                                <p className="recipient-name">{address.fullName}</p>
                                <p>{address.address}</p>
                                <p>{address.city}, {address.state} - {address.pincode}</p>
                                <p className="phone-number">Phone: {address.phone}</p>
                            </div>

                            {!address.isDefault && (
                                <button 
                                    className="set-default-btn"
                                    onClick={() => handleSetDefault(address.id)}
                                >
                                    Set as Default
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Add/Edit Address Modal */}
            {showAddForm && (
                <div className="address-modal" onClick={resetForm}>
                    <div className="address-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={resetForm}>×</button>
                        <h2>{editingAddress ? 'Edit Address' : 'Add New Address'}</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Address Label *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Home, Office"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Address Type *</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="home">Home</option>
                                        <option value="work">Work</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Full Name *</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    placeholder="Enter recipient's full name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    placeholder="10-digit mobile number"
                                    pattern="[0-9]{10}"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Address *</label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="House no., Building name, Street"
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>City *</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        placeholder="City"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>State *</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleInputChange}
                                        placeholder="State"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Pincode *</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                        placeholder="6-digit pincode"
                                        pattern="[0-9]{6}"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="cancel-btn" onClick={resetForm}>
                                    Cancel
                                </button>
                                <button type="submit" className="save-btn">
                                    {editingAddress ? 'Update Address' : 'Save Address'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Addresses;
