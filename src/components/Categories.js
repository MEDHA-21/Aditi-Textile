import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFemale, FaMale, FaChild } from 'react-icons/fa';
import { MdMoreHoriz } from 'react-icons/md';
import './Categories.css';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        { name: 'Women', icon: <FaFemale />, path: '/products/women' },
        { name: 'Men', icon: <FaMale />, path: '/products/men' },
        { name: 'Kids', icon: <FaChild />, path: '/products/kids' },
        { name: 'Others', icon: <MdMoreHoriz />, path: '/products/others' }
    ];

    const handleCategoryClick = (path) => {
        navigate(path);
    };

    return (
        <div className="categories-section">
            <div className="categories-header">
                <h2>Categories</h2>
            </div>
            <div className="categories-grid">
                {categories.map((category, index) => (
                    <div 
                        key={index} 
                        className="category-card"
                        onClick={() => handleCategoryClick(category.path)}
                    >
                        <div className="category-icon">{category.icon}</div>
                        <span className="category-name">{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
