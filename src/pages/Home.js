import React from 'react';
import Categories from '../components/Categories';
import Recommended from '../components/Recommended';

const Home = () => {
    return (
        <div className="home-page">
            <Categories />
            <Recommended />
        </div>
    );
};

export default Home;
