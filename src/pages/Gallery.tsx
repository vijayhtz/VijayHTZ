import React, { useState, useEffect } from 'react';
import { unsplash } from '../unsplash';
import './Gallery.css';

const Gallery: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = ['All', 'Wedding', 'Birthday', 'Corporate', 'Videos'];

  // Fetch photos dynamically from Unsplash
  useEffect(() => {
    const fetchPhotos = async () => {
      // Do not fetch if 'Videos' is selected as Unsplash only gives photos
      if (filter === 'Videos') {
        setPhotos([]);
        return;
      }

      setLoading(true);
      setError('');
      try {
        // Query formulation
        const query = filter === 'All' ? 'event decoration' : `${filter} decoration`;

        // Search photos endpoint
        const result = await unsplash.search.getPhotos({
          query: query,
          page: 1,
          perPage: 12,
          orientation: 'landscape'
        });

        if (result.errors) {
          setError(result.errors[0]);
        } else if (result.response) {
          // Format Unsplash results into our gallery items structure
          const formattedPhotos = result.response.results.map((photo: any, index: number) => {
            // Give some masonry variety
            let span = 'col-span-1 row-span-1';
            if (index === 0 || index === 7) span = 'col-span-2 row-span-2';
            else if (index === 3) span = 'col-span-2 row-span-1';

            return {
              id: photo.id,
              type: filter === 'All' ? 'Gallery' : filter,
              fileType: 'image',
              src: photo.urls.regular,
              span: span
            };
          });
          setPhotos(formattedPhotos);
        }
      } catch (err) {
        console.error('Failed to fetch from Unsplash:', err);
        setError('Failed to load images. Please check your API key.');
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, [filter]);

  // Combine fetched photos with static video assets since Unsplash doesn't provide video search
  const videoItems = filter === 'All' || filter === 'Videos' ? [
    { id: 'vid1', type: 'Videos', fileType: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4', span: 'col-span-2 row-span-2', poster: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&w=800&q=80' }
  ] : [];

  const displayItems = [...photos, ...videoItems];

  return (
    <div className="page-container">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Our Portfolio</h1>
          <p className="page-subtitle animate-fade-in">A glimpse into the magical moments we've created.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {/* Filters */}
          <div className="gallery-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Loading and Error States */}
          {loading && <div className="text-center py-8"><p>Loading gorgeous images...</p></div>}
          {error && <div className="text-center py-8" style={{ color: 'red' }}><p>{error}</p></div>}

          {/* Grid */}
          {!loading && !error && (
            <div className="masonry-gallery">
              {displayItems.map(item => (
                <div key={item.id} className={`gallery-item ${item.span} animate-fade-in`}>
                  {item.fileType === 'image' ? (
                    <>
                      <img src={item.src} alt={`${item.type} Decoration`} loading="lazy" />
                      <div className="item-overlay">
                        <span className="item-category">{item.type}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <video
                        src={item.src}
                        poster={item.poster}
                        controls
                        className="gallery-video"
                      >
                        Your browser does not support the video tag.
                      </video>
                      <div className="video-badge">Video</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

          {!loading && !error && displayItems.length === 0 && (
            <div className="text-center" style={{ padding: '3rem' }}>
              <p>More updates coming soon to this category!</p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Gallery;
