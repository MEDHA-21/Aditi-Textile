import React, { useState } from 'react';
import { BiVideo } from 'react-icons/bi';
import { FaYoutube } from 'react-icons/fa';
import './Videos.css';

const Videos = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    // YouTube Videos
    const youtubeVideos = [
        {
            id: 1,
            videoId: 'Tq27C-w_SuQ',
            title: 'Sambalpuri Fashion Collection',
            thumbnail: 'https://img.youtube.com/vi/Tq27C-w_SuQ/maxresdefault.jpg',
            type: 'video'
        },
        {
            id: 2,
            videoId: 'FzlBp-uKtv0',
            title: 'Traditional Wear Styling',
            thumbnail: 'https://img.youtube.com/vi/FzlBp-uKtv0/maxresdefault.jpg',
            type: 'video'
        },
        {
            id: 3,
            videoId: 'HvpSRQqw1n8',
            title: 'Latest Fashion Trends',
            thumbnail: 'https://img.youtube.com/vi/HvpSRQqw1n8/maxresdefault.jpg',
            type: 'video'
        }
    ];

    // YouTube Shorts from Aditi's Corner channel
    const youtubeShorts = [
        {
            id: 4,
            videoId: 'Zaovg2Wx6WQ',
            title: 'Sambalpuri Saree Collection',
            thumbnail: 'https://img.youtube.com/vi/Zaovg2Wx6WQ/maxresdefault.jpg',
            type: 'short'
        },
        {
            id: 5,
            videoId: 'KLulwt0GxUg',
            title: 'Handloom Weaving Showcase',
            thumbnail: 'https://img.youtube.com/vi/KLulwt0GxUg/maxresdefault.jpg',
            type: 'short'
        },
        {
            id: 6,
            videoId: 'beu896gBASI',
            title: 'Sambalpuri Kurti Showcase',
            thumbnail: 'https://img.youtube.com/vi/beu896gBASI/maxresdefault.jpg',
            type: 'short'
        }
    ];

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const closeVideoPlayer = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="videos-page">
            <div className="page-header">
                <div className="header-content">
                    <h1>Fashion Videos</h1>
                    <p>Watch our latest collections and styling tips</p>
                </div>
                <a 
                    href="https://www.youtube.com/@AditisCorner-z6h" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="youtube-channel-link"
                >
                    <FaYoutube size={24} />
                    Visit Channel
                </a>
            </div>

            {/* YouTube Shorts Section */}
            <div className="video-section">
                <h2 className="section-title">YouTube Shorts</h2>
                <div className="videos-grid">
                    {youtubeShorts.map((video) => (
                        <div 
                            key={video.id} 
                            className="video-card"
                            onClick={() => handleVideoClick(video)}
                        >
                            <div className="video-thumbnail">
                                <img src={video.thumbnail} alt={video.title} />
                                <div className="play-overlay">
                                    <BiVideo size={40} />
                                </div>
                                <span className="shorts-badge">Shorts</span>
                            </div>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p className="channel-name">Aditi's Corner</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full YouTube Videos Section */}
            <div className="video-section">
                <h2 className="section-title">YouTube Videos</h2>
                <div className="videos-grid">
                    {youtubeVideos.map((video) => (
                        <div 
                            key={video.id} 
                            className="video-card"
                            onClick={() => handleVideoClick(video)}
                        >
                            <div className="video-thumbnail">
                                <img src={video.thumbnail} alt={video.title} />
                                <div className="play-overlay">
                                    <BiVideo size={40} />
                                </div>
                            </div>
                            <div className="video-info">
                                <h3>{video.title}</h3>
                                <p className="channel-name">Aditi's Corner</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Video Player Modal */}
            {selectedVideo && (
                <div className="video-modal" onClick={closeVideoPlayer}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={closeVideoPlayer}>×</button>
                        <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                            title={selectedVideo.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Videos;
