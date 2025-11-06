import React from 'react';
import { FaFemale, FaMale, FaChild } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import './Categories.css';

const Categories = () => {
    const categories = [
        { name: 'Women', icon: <FaFemale /> },
        { name: 'Men', icon: <FaMale /> },
        { name: 'Kids', icon: <FaChild /> },
        { name: 'Others', icon: <MdMoreHoriz /> }
    ];

    return (
        <div className="categories-section">
            <div className="categories-header">
                <h2>Categories</h2>
            </div>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div key={index} className="category-card">
                        <div className="category-icon">{category.icon}</div>
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
