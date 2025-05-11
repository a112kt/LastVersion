import React, { useState } from 'react';
import './AboutAs.css';

export default function AboutAs() {
  const [review, setReview] = useState({
    name: '',
    rating: 0,
    comment: '',
  });

  const [allReviews, setAllReviews] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({
      ...review,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review.name && review.rating && review.comment) {
      setAllReviews([...allReviews, review]);
      setReview({ name: '', rating: 0, comment: '' });
    }
  };

  return (
    <div className="pageWrapper">
      {/* Form Section */}
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
            />
          </div>

          <button type="submit" className="submitButton">Submit Review</button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="reviewSection">
        <h3 className="subTitle">Reviews</h3>
        {allReviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          allReviews.map((rev, index) => (
            <div key={index} className="reviewCard">
              <div className="reviewName">{rev.name}</div>
              <div className="reviewRating">Rating: {rev.rating} ⭐</div>
              <div className="reviewComment">{rev.comment}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}



