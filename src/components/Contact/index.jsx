import React, {useState} from 'react'

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
  const {name, value} = e.target;
  setFormData({...formData, [name]: value });
};

const validateForm = () => {
  const newErrors = {name: '', email: '', message: ''};
}

// Validate Name
if (!formData.name) {
  newErrors.name = 'Name is required';
}

//Validate Email

export default Contact