import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Feedback.css';

const FeedbackForm = () => {
  const [rate, setRate] = useState(1);
  const [comment, setComment] = useState('');
  const [allReviews, setAllReviews] = useState([]);
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState(null); 

 
  useEffect(() => {
    const fetchReviews = async () => {
      try {
      
        const response = await axios.get('http://localhost:8000/api/feedback');
        setAllReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setMessage('Failed to load feedbacks.');
      }
    };

    fetchReviews();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
      
        await axios.put(`http://localhost:8000/api/feedback/update/${editId}`, { rate, comment }); 
        setMessage('Feedback updated successfully!');
      } else {

        await axios.post('http://localhost:8000/api/feedback', { rate, comment });
        setMessage('Feedback submitted successfully!');
      }

      const response = await axios.get('http://localhost:8000/api/feedback'); 
      setAllReviews(response.data);

     
      setRate(1);
      setComment('');
      setEditId(null); 
    } catch (error) {
      console.error('Error submitting or updating feedback:', error);
      setMessage('Failed to submit or update feedback. Please try again.');
    }
  };

  const handleEdit = (id, currentComment, currentRate) => {

    setEditId(id);
    setComment(currentComment);
    setRate(currentRate);
  };

  
  const handleDelete = async (id) => {
    try {
    
      await axios.delete(`http://localhost:8000/api/feedback/delete/${id}`);
      const response = await axios.get('http://localhost:8000/api/feedback'); 
      setAllReviews(response.data);
      setMessage('Feedback deleted successfully!');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      setMessage('Failed to delete feedback. Please try again.');
    }
  };

  return (
    <div className="pageWrapper">
      {/* Form Section */}
      <div className="container1">
        <h3 className="title">{editId ? 'Edit Feedback' : 'Leave a Feedback'}</h3>
        <form onSubmit={handleSubmit} className="form">
          <div className="formGroup">
            <label className="label">Rate (1-5):</label>
            <input
              className="input"
              type="number"
              min="1"
              max="5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              required
            />
          </div>
          <div className="formGroup">
            <label className="label">Comment:</label>
            <textarea
              className="textarea"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submitButton">
            {editId ? 'Update Feedback' : 'Submit Feedback'}
          </button>
        </form>
        {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
      </div>

      {/* Reviews Section */}
      <div className="reviewSection">
        <h3 className="subTitle">Reviews</h3>
        {allReviews.length === 0 ? (
          <p>No feedbacks yet.</p>
        ) : (
          allReviews.map((rev) => (
            <div key={rev._id} className="reviewCard">
              <div className="reviewName">Rating: {rev.rate} ⭐</div>
              <div className="reviewComment">{rev.comment}</div>
              <button onClick={() => handleEdit(rev._id, rev.comment, rev.rate)} className="editButton">Edit</button>
              <button onClick={() => handleDelete(rev._id)} className="deleteButton">Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeedbackForm;

