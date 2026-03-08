import React, { useState, useEffect } from 'react';
import { unsplash } from '../unsplash';
import PackageCard from '../components/PackageCard';
import './Packages.css';

const Packages: React.FC = () => {
  const [weddingImages, setWeddingImages] = useState<string[]>([]);
  const [birthdayImages, setBirthdayImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const weddingResult = await unsplash.search.getPhotos({
          query: "luxury royal wedding setup",
          perPage: 3,
          orientation: "landscape"
        });
        if (weddingResult.response) {
          setWeddingImages(weddingResult.response.results.map(p => p.urls.regular));
        }

        const birthdayResult = await unsplash.search.getPhotos({
          query: "kids birthday party decoration",
          perPage: 3,
          orientation: "landscape"
        });
        if (birthdayResult.response) {
          setBirthdayImages(birthdayResult.response.results.map(p => p.urls.regular));
        }
      } catch (err) {
        console.error("Error fetching package images:", err);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="page-container">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title animate-fade-in">Event Packages</h1>
          <p className="page-subtitle animate-fade-in">Carefully curated configurations for your special day</p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="packages-category">
            <h2 className="section-title">Wedding Packages</h2>
            <div className="packages-grid">
              <PackageCard
                level="Basic"
                title="Simple Elegance"
                price="₹ 35,000"
                image={weddingImages[0] || "https://images.unsplash.com/photo-1519741497674-611481863552"}
                features={[
                  "Standard Stage Setup (10x10)",
                  "Basic Artificial Floral Backdrop",
                  "100 Standard Chairs",
                  "Basic Ambient Lighting",
                  "Red Carpet Entry (Small)"
                ]}
              />
              <PackageCard
                level="Standard"
                title="Grand Celebration"
                isPopular={true}
                price="₹ 75,000"
                image={weddingImages[1] || "https://images.unsplash.com/photo-1511578314322-379afb476865"}
                features={[
                  "Premium Stage Setup (20x15)",
                  "Fresh & Artificial Floral Mix",
                  "200 Premium Chairs with Covers",
                  "Advanced LED Lighting",
                  "Red Carpet Entry (Large)",
                  "Basic Sound System & Mic",
                  "Welcome Board"
                ]}
              />
              <PackageCard
                level="Premium"
                title="Royal Wedding"
                price="₹ 1,50,000"
                image={weddingImages[2] || "https://images.unsplash.com/photo-1606800052052-a08af7148866"}
                features={[
                  "Luxury Stage Setup (Custom Size)",
                  "100% Fresh Exotic Floral Decor",
                  "300 VIP Seating (Sofas & Chairs)",
                  "Complete Intelligent Lighting Setup",
                  "Entry Walkway Decor with Cold Pyros",
                  "Professional DJ Sound System",
                  "LED Wall Screen",
                  "Mandap Setup"
                ]}
              />
            </div>
          </div>

          <div className="packages-category mt-8">
            <h2 className="section-title">Birthday Packages</h2>
            <div className="packages-grid">
              <PackageCard
                level="Basic"
                title="Cute Setup"
                price="₹ 8,000"
                image={birthdayImages[0] || "https://images.unsplash.com/photo-1530103862676-de8892bf309c"}
                features={[
                  "Balloon Arch (Standard Colors)",
                  "Cake Table Setup",
                  "Happy Birthday Banner",
                  "30 Standard Chairs",
                  "Basic Lighting"
                ]}
              />
              <PackageCard
                level="Standard"
                title="Thematic Party"
                isPopular={true}
                price="₹ 18,000"
                image={birthdayImages[1] || "https://images.unsplash.com/photo-1558636508-e0db3814bd1d"}
                features={[
                  "Customized Theme Backdrop",
                  "Premium Balloon Ring & Bunches",
                  "Decorated Cake Table with Props",
                  "LED Name Board",
                  "50 Chairs with Covers",
                  "Party Lights & Music System",
                  "Welcome Standee"
                ]}
              />
              <PackageCard
                level="Premium"
                title="Ultimate Bash"
                price="₹ 35,000"
                image={birthdayImages[2] || "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"}
                features={[
                  "Grand 3D Theme Decor",
                  "Organic Balloon Installations",
                  "Luxury Cake & Return Gift Tables",
                  "Neon Name Signs",
                  "100 Premium Chairs",
                  "DJ Setup & Intelligent Lighting",
                  "Entry Arch & Character Cutouts",
                  "Fog Machine/Cold Pyros"
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;
