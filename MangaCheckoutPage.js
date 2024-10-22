// src/components/MangaCheckoutPage.js
import React, { useState } from 'react';
import { database } from '../firebaseConfig';
import { ref, push } from 'firebase/database';
import '../styles/MangaCheckoutPage.css';

const MangaCheckoutPage = () => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState('');
  const [mangaTitle, setMangaTitle] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [gst] = useState(18);  // GST Percentage

  // Calculate total price with GST
  const calculateTotal = (price, quantity) => {
    const totalPrice = price * quantity;
    return totalPrice + (totalPrice * gst) / 100;
  };

  // Add to Cart and Firebase
  const handleAddToCart = () => {
    const totalPriceWithGST = calculateTotal(price, quantity);
    const purchase = {
      customerName: name,
      mangaTitle,
      price,
      quantity,
      totalPriceWithGST,
      purchaseDate: new Date().toLocaleString(),
    };

    // Save to Firebase
    const cartRef = ref(database, 'mangaCheckout');
    push(cartRef, purchase);

    setCart([...cart, purchase]);
    setMangaTitle('');
    setPrice('');
    setQuantity(1);
  };

  return (
    <div className="manga-checkout-page">
      <h2>Manga Checkout</h2>
      <form>
        <input
          type="text"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Manga Title"
          value={mangaTitle}
          onChange={(e) => setMangaTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button type="button" onClick={handleAddToCart}>Add to Cart</button>
      </form>

      {/* Display Cart */}
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Manga</th>
            <th>Quantity</th>
            <th>Total Price (Incl. GST)</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, index) => (
            <tr key={index}>
              <td>{item.customerName}</td>
              <td>{item.mangaTitle}</td>
              <td>{item.quantity}</td>
              <td>${item.totalPriceWithGST.toFixed(2)}</td>
              <td>{item.purchaseDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MangaCheckoutPage;
