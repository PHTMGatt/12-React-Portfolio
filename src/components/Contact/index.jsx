import React, {useState} from 'react'
import './contact.css' 
const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const validateForm = () => {
        const newErrors = { name: '', email: '', message: '' };
    
        // Validate name
        if (!formData.name) {
          newErrors.name = 'Name is required.';
        }
    
        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
          newErrors.email = 'Email is required.';
        } else if (!emailPattern.test(formData.email)) {
          newErrors.email = 'Email is not valid.';
        }
    
        // Validate message
        if (!formData.message) {
          newErrors.message = 'Message is required.';
        }
    
        setErrors(newErrors);
    
        return Object.values(newErrors).every((error) => error === '');
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          // Handle form submission
          console.log('Form submitted successfully', formData);
          // You can also reset form here if needed
          setFormData({ name: '', email: '', message: '' });
        }
      };
    

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
          {errors.message && <span className="error">{errors.message}</span>}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default Contact