import './App.css'; // Component-specific styles
import Header from './components/Header';
// import InfoSection from './components/InfoSection';
import CarouselSection from './components/CarouselSection';
import Footer from './components/Footer';
import dalmakhani from './assets/dalmakhani.jpeg'// Ensure the correct path
import dominos from './assets/dominos.jpeg'; // Ensure the correct path
import paneertikka from './assets/paneertikka.jpeg'; // Ensure the correct path
import SOB from './assets/SOB.jpeg'; // Ensure the correct path
import Navbar from './components/Navbar';
import Login from './components/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {GoogleOAuthProvider } from '@react-oauth/google'
// import { Menu } from 'lucide-react';
import Menu from './components/Menu'


const Home = ({ valueCombos, bestsellers }) => {
  return (
    <>
      <Navbar />
      <Header />
      {/* <InfoSection /> */}
      <CarouselSection title="Value Combos" items={valueCombos} />
      <CarouselSection title="Bestsellers" items={bestsellers} />
      <Footer />
    </>
  )
}


const App = () => {
  const valueCombos = [
    { id: 1, name: "Paneer Tikka combo", description: "Delicious savoury meal", image: paneertikka, price: 250},
    { id: 2, name: "Pizza Combo", description: "Tasty combo pack", image: dominos, price: 299 },
    { id: 3, name: "Dal Makhani Combo", description: "Desi indulgence of taste", image: dalmakhani, price: 259 },
    { id: 4, name: "Sex on the Beach", description: "Refreshing and Sparkling Taste", image: SOB, price: 159 }
  ];

  const bestsellers = [
    { id: 1, name: "Dish 1", description: "Top-rated dish", image: paneertikka, price: 250 },
    { id: 2, name: "Dish 2", description: "Customer favorite", image: "https://th.bing.com/th/id/OIP.NSXW9sowkQ2W1HDy1ZDsNQHaFJ?w=249&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7", price: 20 },
    { id: 3, name: "Dish 3", description: "Chef's special", image: dalmakhani, price: 259 },
    { id: 4, name: "Dish 4", description: "Highly recommended", image: "bestseller4.jpg", price: 25 }
  ];

  return (
    <GoogleOAuthProvider clientId='796057223185-ioqq8e09nahlm2iflhdp7mjdokeu5ttc.apps.googleusercontent.com'>
    <BrowserRouter>
      <>
      <Navbar/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/' element={<Home valueCombos={valueCombos} bestsellers={bestsellers}/>}/>
        </Routes>
      </>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
};

export default App;
