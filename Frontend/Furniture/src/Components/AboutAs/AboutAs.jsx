import React, { useState, useEffect } from 'react';
import './AboutAs.css';
import axios from 'axios';

export default function AboutAs() {
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [allReviews, setAllReviews] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await axios.get('http://localhost:8000/reviews');
      setAllReviews(res.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert('You must be logged in to submit a review.');
      return;
    }

    try {
      if (editIndex !== null) {
   
     
        // Create new review
        const newReview = { ...review, name: username };
        await axios.post('http://localhost:8000/reviews', newReview, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      setReview({ rating: 0, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const selectedReview = allReviews[index];
    setReview({ rating: selectedReview.rating, comment: selectedReview.comment });
  };

  return (
    <div className="pageWrapper">
      <div className="container1">
        <p className="description">Welcome to our page! We'd love to hear your thoughts.</p>
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Rating:</label>
            <select
              name="rating"
              value={review.rating}
              onChange={handleChange}
              className="select"
              required
            >
              <option value="0">Select Rating</option>
              <option value="1">1 - Poor</option>
              <option value="2">2 - Fair</option>
              <option value="3">3 - Good</option>
              <option value="4">4 - Very Good</option>
              <option value="5">5 - Excellent</option>
            </select>
          </div>

          <div className="formGroup">
            <label className="label">Comment:</label>
            <textarea
              name="comment"
              value={review.comment}
              onChange={handleChange}
              className="textarea"
              placeholder="Write your feedback..."
              required
            />
          </div>

          <button type="submit" className="submitButton" disabled={!token}>
            {editIndex !== null ? 'Update Review' : 'Submit Review'}
          </button>
        </form>
      </div>

      <div className="reviewSection">
        <h3 className="subTitle">Reviews</h3>
        <div className="reviewGrid">
          {allReviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            allReviews.map((rev, index) => (
              <div key={rev._id} className="reviewCard">
                <div className="reviewName">{rev.name}</div>
                <div className="reviewRating">Rating: {rev.rating} ⭐</div>
                <div className="reviewComment">{rev.comment}</div>
                {rev.name === username && (
                  <div className="buttonGroup">
                    <button className="deleteBtn" onClick={() => handleDelete(rev._id)}>Delete</button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

