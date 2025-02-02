import { useEffect, useState } from 'react';
import restro from '../assets/restro.jpg';
import swiggy from '../assets/swiggy_logo.png';
import zomato from '../assets/Zomato_logo.png';
import newspaper from '../assets/TOI.webp';

const Header = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  // Replace these coordinates with your restaurant's actual location
  const restaurantLocation = {
    lat: 18.517755,
    lng: 73.841766
  };

  useEffect(() => {
    // Load Google Maps Script
    const loadGoogleMaps = () => {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAjmtslSlLhChagxBOUCmT4ECgBkMjcx_k`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    loadGoogleMaps();
  }, []);

  const initializeMap = () => {
    // Create map instance
    const mapInstance = new window.google.maps.Map(document.getElementById('restaurant-map'), {
      center: restaurantLocation,
      zoom: 15,
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add marker
    const markerInstance = new window.google.maps.Marker({
      position: restaurantLocation,
      map: mapInstance,
      title: '[Restaurant Name]',
      animation: window.google.maps.Animation.DROP
    });

    setMap(mapInstance);
    setMarker(markerInstance);
  };

  const handleGetDirections = () => {
    // Open Google Maps in a new tab with directions to the restaurant
    const url = `https://www.google.com/maps/dir/?api=1&destination=${restaurantLocation.lat},${restaurantLocation.lng}`;
    window.open(url, '_blank');
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Left: Restaurant Image */}
        <div className="image-container">
          <img src={restro} alt="Restaurant" className="restaurant-image" />
        </div>

        {/* Right: About Us, Ratings, and Map */}
        <div className="info-section">
          {/* About Us Section */}
          <div className="about-us">
            <h1>Welcome to Aao Khao</h1>
            <p>
              At Aao Khao, we offer a culinary journey like no other. From authentic dishes to 
              modern twists, every meal is crafted with passion and fresh ingredients. Enjoy a cozy 
              ambiance and impeccable service that will make your dining experience unforgettable.
            </p>
          </div>

          {/* Ratings Section */}
          <div className="ratings">
            <div className="rating-item">
              <a href="https://www.zomato.com" target="_blank" rel="noopener noreferrer">
                <img src={zomato} alt="Zomato" className="rating-logo" />
              </a>
              <p>⭐⭐⭐⭐⭐ (4.8)</p>
            </div>
            <div className="rating-item">
              <a href="https://www.swiggy.com" target="_blank" rel="noopener noreferrer">
                <img src={swiggy} alt="Swiggy" className="rating-logo" />
              </a>
              <p>⭐⭐⭐⭐⭐ (4.7)</p>
            </div>
            <div className="rating-item">
              <a href="https://timesofindia.indiatimes.com/" target="_blank" rel="noopener noreferrer">
                <img src={newspaper} alt="Newspapers" className="rating-logo" />
              </a>
              <p>⭐⭐⭐⭐⭐ (4.9)</p>
            </div>
          </div>

          {/* Map Section */}
          <div className="map-section">
            <div id="restaurant-map" className="google-map"></div>
            <button className="get-directions-btn" onClick={handleGetDirections}>
              Get Directions
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;