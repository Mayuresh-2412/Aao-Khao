import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Menu, X, User, LogOut } from 'lucide-react';
import picture from '../assets/icons8-user-30.png';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (!e.target.closest('.dropdown')) {
      setIsDropdownOpen(false);
    }
  };
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <div className='main-container'>
        <nav className={`nav-container ${isScrolled ? 'scrolled' : ''}`}>
          <div className='nav-content'>
            <div className='nav-flex'>
              <h1>
                <Link to='/' className='nav-title'>Aao Khao</Link>
              </h1>
              
              <button
                className='menu-button'
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
              </button>
              
              <div className={`nav-links ${isMenuOpen ? 'show-links' : ''}`}>
                <Link to='/menu' className={`nav-link ${isScrolled ? 'scrolled' : ''}`}>Menu</Link>
                <div className='dropdown'>
                  <button
                    className={`dropdownTrigger ${isScrolled ? 'scrolled' : ''}`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Order/Get
                    {isDropdownOpen ? (
                      <ChevronUp className='w-4 h-4' />
                    ) : (
                      <ChevronDown className='w-4 h-4' />
                    )}
                  </button>
                  {isDropdownOpen && (
                    <div className='dropDownMenu'>
                      <a href='#' className='dropDownItem' style={{ textDecoration: 'none' }}>Dine-in</a>
                      <a href='#' className='dropDownItem' style={{ textDecoration: 'none' }}>Takeaway</a>
                      <a href='#' className='dropDownItem' style={{ textDecoration: 'none' }}>Delivery</a>
                    </div>
                  )}
                </div>
                
                {user ? (
                  <div className='profile-section'>
                    <div className='user-info'>
                      {user.picture ? (
                        <img
                          src={picture}
                          alt='profile'
                          className='profile-picture'
                        />
                      ) : (
                        <User className='w-6 h-6' />
                      )}
                      <span className='user-name'>{user.authMethod === 'google' ? user.name : user.email}</span>
                      <button onClick={handleLogout} className='logout-button'>
                        <LogOut className='w-4 h-4' /> Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <Link to='/login' className='nav-button'>Login</Link>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
