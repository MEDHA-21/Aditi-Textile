import React, { useState } from 'react';
import { BiPackage, BiTime, BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { MdLocalShipping } from 'react-icons/md';
import './Orders.css';

const Orders = () => {
    const [activeTab, setActiveTab] = useState('all');

    const orders = [
        {
            id: 'ORD001',
            date: '2025-11-05',
            items: [
                {
                    name: 'Sambalpuri Cotton Saree - Red',
                    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400',
                    quantity: 1,
                    price: 2499
                }
            ],
            total: 2499,
            status: 'delivered',
            deliveryDate: '2025-11-08'
        },
        {
            id: 'ORD002',
            date: '2025-11-08',
            items: [
                {
                    name: 'Traditional Kurta Set',
                    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400',
                    quantity: 2,
                    price: 1899
                }
            ],
            total: 3798,
            status: 'shipped',
            estimatedDelivery: '2025-11-12'
        },
        {
            id: 'ORD003',
            date: '2025-11-09',
            items: [
                {
                    name: 'Handloom Cotton Dupatta',
                    image: 'https://images.unsplash.com/photo-1562137369-1a1a0bc66744?w=400',
                    quantity: 1,
                    price: 899
                },
                {
                    name: 'Kids Traditional Dress',
                    image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400',
                    quantity: 1,
                    price: 1299
                }
            ],
            total: 2198,
            status: 'processing',
            estimatedDelivery: '2025-11-14'
        },
        {
            id: 'ORD004',
            date: '2025-10-28',
            items: [
                {
                    name: 'Sambalpuri Silk Saree',
                    image: 'https://images.unsplash.com/photo-1583391733981-e8ad2f7ab344?w=400',
                    quantity: 1,
                    price: 4999
                }
            ],
            total: 4999,
            status: 'cancelled',
            cancelDate: '2025-10-29'
        }
    ];

    const getStatusIcon = (status) => {
        switch (status) {
            case 'delivered':
                return <BiCheckCircle size={20} />;
            case 'shipped':
                return <MdLocalShipping size={20} />;
            case 'processing':
                return <BiTime size={20} />;
            case 'cancelled':
                return <BiXCircle size={20} />;
            default:
                return <BiPackage size={20} />;
        }
    };

    const getStatusClass = (status) => {
        return `status-badge status-${status}`;
    };

    const filteredOrders = activeTab === 'all' 
        ? orders 
        : orders.filter(order => order.status === activeTab);

    return (
        <div className="orders-page">
            <div className="page-header">
                <h1>My Orders</h1>
                <p>Track and manage your orders</p>
            </div>

            <div className="order-tabs">
                <button 
                    className={activeTab === 'all' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('all')}
                >
                    All Orders
                </button>
                <button 
                    className={activeTab === 'processing' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('processing')}
                >
                    Processing
                </button>
                <button 
                    className={activeTab === 'shipped' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('shipped')}
                >
                    Shipped
                </button>
                <button 
                    className={activeTab === 'delivered' ? 'tab-active' : ''}
                    onClick={() => setActiveTab('delivered')}
                >
                    Delivered
                </button>
            </div>

            <div className="orders-list">
                {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                        <div key={order.id} className="order-card">
                            <div className="order-header">
                                <div className="order-info">
                                    <h3>Order #{order.id}</h3>
                                    <p className="order-date">Placed on {new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                </div>
                                <div className={getStatusClass(order.status)}>
                                    {getStatusIcon(order.status)}
                                    <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                                </div>
                            </div>

                            <div className="order-items">
                                {order.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="item-details">
                                            <h4>{item.name}</h4>
                                            <p>Quantity: {item.quantity}</p>
                                            <p className="item-price">₹{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-footer">
                                <div className="order-total">
                                    <span>Total Amount:</span>
                                    <span className="total-amount">₹{order.total}</span>
                                </div>
                                {order.status === 'delivered' && order.deliveryDate && (
                                    <p className="delivery-info">Delivered on {new Date(order.deliveryDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                )}
                                {order.status === 'shipped' && order.estimatedDelivery && (
                                    <p className="delivery-info">Estimated delivery: {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                )}
                                {order.status === 'processing' && order.estimatedDelivery && (
                                    <p className="delivery-info">Expected by {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                )}
                                {order.status === 'cancelled' && order.cancelDate && (
                                    <p className="delivery-info">Cancelled on {new Date(order.cancelDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-orders">
                        <BiPackage size={60} />
                        <h3>No orders found</h3>
                        <p>You don't have any {activeTab !== 'all' ? activeTab : ''} orders yet</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Orders;
