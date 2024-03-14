import React, { useState } from 'react'; 

const CheckoutForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (!name || !email || !phone) {
      // error message 
      return;
    }

    try {
      // Payment Gateway Endpoint

      const token = await initiatePayment(name, email, phone); 

       window.location.href = '<payment-gateway-url>';
    } catch (error) {
      // errors messages
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... form and submit button ... */}
    </form>
  );
};

export default CheckoutForm;
