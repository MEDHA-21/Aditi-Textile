import React from 'react';
import { BiVideo } from 'react-icons/bi';
import './Videos.css';

const Videos = () => {
    // Mock video data
    const videos = [
        {
            id: 1,
            thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
            title: 'Summer Collection 2025',
            duration: '5:30',
            views: '12K views'
        },
        {
            id: 2,
            thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400',
            title: 'How to Style Cotton Sarees',
            duration: '8:15',
            views: '25K views'
        },
        {
            id: 3,
            thumbnail: 'https://images.unsplash.com/photo-1558769132-cb1aea3c4bf5?w=400',
            title: 'Behind the Scenes - Textile Making',
            duration: '12:45',
            views: '8K views'
        },
        {
            id: 4,
            thumbnail: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400',
            title: 'Fashion Tips for Traditional Wear',
            duration: '6:20',
            views: '18K views'
        }
    ];

    return (
        <div className="videos-page">
            <div className="page-header">
                <h1>Fashion Videos</h1>
                <p>Watch our latest collections and styling tips</p>
            </div>

            <div className="videos-grid">
                {videos.map((video) => (
                    <div key={video.id} className="video-card">
                        <div className="video-thumbnail">
                            <img src={video.thumbnail} alt={video.title} />
                            <div className="play-overlay">
                                <BiVideo size={40} />
                            </div>
                            <span className="video-duration">{video.duration}</span>
                        </div>
                        <div className="video-info">
                            <h3>{video.title}</h3>
                            <p>{video.views}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videos;
