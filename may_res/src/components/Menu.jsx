import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const res = await axios.get('http://localhost:4598/api/menu');
                setMenuItems(res.data);
            } catch (error) {
                console.error('Error fetching menu items:', error);
                setError('Failed to load menu items.');
            }
        };
        fetchMenuItems();

        
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const addToCart = (item) => {
        if (!user) {
            navigate('/login');
            return;
        }
        setCart([...cart, item]);
    };

    const placeOrder = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
    
        // if (!user?._id) {
        //     alert("Please log in to place an order.");
        //     navigate('/login');
        //     return;
        // }
    
        const orderDetails = {
            items: cart.map(item => ({ name: item.name, price: item.price })),
            total: cart.reduce((sum, item) => sum + item.price, 0),
            date: new Date().toISOString() // Add date for tracking
        };
    
        try {
            console.log(orderDetails)
            await axios.post('http://localhost:4598/api/orders', orderDetails);
            alert('Order placed successfully!');
            setCart([]); // Clear the cart
        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
            alert('Failed to place order.');
        }
    };
    
    return (
        <div className="menu-container">
            <h2 className="heading">Our Menu</h2>

            {error && <p className="error">{error}</p>}

            {menuItems.length > 0 ? (
                <div className="menu-grid">
                    {menuItems.map((item) => (
                        <div key={item._id} className="menu-card">
                            <div className="menu-content">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="menu-image" 
                            />
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <span className="menu-price">₹{item.price}</span>
                            </div>
                            <button className="add-to-cart" onClick={() => addToCart(item)}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                !error && <p className="no-items">No menu items available.</p>
            )}

            {/* ye cart wala code h isko separate kr nd components me cart.jsx bna de toh mtlb ye alag page pe khulga nd navbar pr clickable button bhi add kr dena cart ka*/}
            {cart.length > 0 && (
                <div className="cart-container">
                    <h2 className="heading">Cart</h2>
                    <ul className="cart-list">
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                {item.name} - ₹{item.price}
                            </li>
                        ))}
                    </ul>
                    <button className="place-order" onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            )}
        </div>
    );
};

export default Menu;
