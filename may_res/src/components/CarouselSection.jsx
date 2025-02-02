import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from 'prop-types';
import './CarouselSection.css'

const CarouselSection = ({ title, items }) => {
  const navigate = useNavigate();
  
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  const handleAddToCart = (item, e) => {
    e.stopPropagation(); // Prevent item click when clicking the button
    
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }

    // Get existing cart or initialize empty array
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add item to cart
    const updatedCart = [...existingCart, item];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    // Redirect to menu page with cart view
    navigate('/menu');
  };

  return (
    <section className="carousel-section">
      <h2>{title}</h2>
      <Slider {...settings}>
        {items.map((item) => (
          <div key={item.id} className="carousel-item">
            <img src={item.image} alt={item.name} className="carousel-image" />
            <div className="carousel-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p className="price">₹{item.price}</p>
              <button 
                className="add-to-cart-btn"
                onClick={(e) => handleAddToCart(item, e)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

CarouselSection.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default CarouselSection;