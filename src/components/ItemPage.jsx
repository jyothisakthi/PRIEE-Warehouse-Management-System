import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ItemPage.css';
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const items = [
    {
      id: 1,
      image: '/images/item-groups.png',
      title: 'Item Groups',
      description: 'Create multiple variants of the same item using Item Groups',
      buttonText: 'New Item Group',
      path: '/NewItemGroup',
    },
    {
      id: 2,
      image: '/images/items.png',
      title: 'Items',
      description: 'Create standalone items and services that you buy and sell',
      buttonText: 'New Item',
      path: '/itemPageRoute',
    },
    {
      id: 3,
      image: '/images/composite.png',
      title: 'Composite Items',
      description: 'Group different items together and sell them as a single item',
      buttonText: 'New Composite Item',
      path: '/NewCompositeItem',
    },
    {
      id: 4,
      image: '/images/price-list.png',
      title: 'Price Lists',
      description: 'Tweak your item prices for specific contacts or transactions',
      buttonText: 'New Price List',
      path: '/NewPriceList',
    },
  
  
];

const ItemPage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
            <Navbar />
            <div className="main-container">
                <Sidebar />
    <div className="right-pane">
      <div className="item-page-header">
        <select className="dropdown">
          <option>All Items</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <button className="add-button" onClick={() => navigate("/NewItemGroup")}>+</button>
      </div>

      <div className="card-container">
      {items.map(item => (
  <div className="card" key={item.id}>
    <img src={item.image} alt={item.title} className="card-img" />
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <button
      className="card-button"
      onClick={() => navigate(item.path)}
    >
      {item.buttonText}
    </button>
  </div>
))}

      </div>
    </div>
    </div>
    </div>
  );
};

export default ItemPage;