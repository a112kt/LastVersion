import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './shop.css';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const userId = token ? JSON.parse(atob(token.split('.')[1])).userId : null;

  const authHeader = {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/cart/${userId}`, authHeader);
      setCart(res.data.items || []);
    } catch (err) {
      console.error('Failed to fetch cart:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:8000/api/cart/${userId}/update`, { productId, quantity }, authHeader);
      fetchCart();
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${userId}/remove/${productId}`, authHeader);
      fetchCart();
    } catch (err) {
      console.error('Failed to remove item:', err);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/cart/${userId}/clear`, authHeader);
      setCart([]); 
      fetchCart(); 
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  const getSubtotal = () => {
    return cart.reduce((total, item) => {
      const price = item.productId.price;
      return total + price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    if (userId && token) {
      fetchCart();
    }
  }, []);

  if (loading) return <div>Loading cart...</div>;

  return (
    <div className="container">
      <div className="cart-page main_color2">
        <div className="cart-container p-10">
          <h2 className="cartHeader">
            Cart <i className="cart-icon fa-solid fa-cart-shopping"></i>
          </h2>

          {cart.length === 0 ? (
            <div className="text-center mt-10">
              <p className="text-lg text-gray-700">
                Your cart is empty.{' '}
                <Link
                  to="/product"
                  className="text-[#270708] underline font-semibold hover:text-red-700"
                >
                  Go to Products
                </Link>
              </p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId._id} className="cart-item grid grid-cols-4 cartItems">
                <img className="itemImg" src={item.productId.imageUrl} alt={item.productId.name} />
                <div className="item-details">
                  <p>{item.productId.name}</p>
                  <p>₹{item.productId.price}</p>
                </div>
                <div className="grid grid-cols-7">
                  <button
                    className="borderCircle"
                    onClick={() => updateQuantity(item.productId._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="borderCircle"
                    onClick={() => updateQuantity(item.productId._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div>
                  <button onClick={() => removeItem(item.productId._id)} className="deleteBtn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}

          <hr />
          <p className="my-4">Subtotal: ₹{getSubtotal()}</p>
          <div className="my-4 grid grid-cols-2">
            <button className="btn" onClick={clearCart}>Clear Cart</button>
            <button className="btn">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
