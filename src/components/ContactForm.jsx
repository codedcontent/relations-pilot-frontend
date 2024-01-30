/* eslint-disable react/prop-types */
import { useState } from "react";
import TextField from "./TextField";
import axios from "axios";
import constants from "../constants/constants";

const ContactForm = ({ setContacts }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [error, setError] = useState(null);

  const clearForm = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    // Prevent refresh on submit
    e.preventDefault();

    const contactsEndpoint = `${constants.serverURL}/contacts`;

    try {
      // Send form data to the backend
      const response = await axios.post(contactsEndpoint, formData);

      if (response.status === 201) {
        // The backend returns the saved contact details
        const newContact = response.data;

        // Update the local state with the saved contact
        setContacts((prev) => [...prev, newContact]);

        clearForm();
        setError(null); // Clear any previous errors
      } else {
        setError("Unexpected response from the server. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        setError(
          `Server error: ${error.response.status} - ${error.response.data.message}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        setError(
          "No response from the server. Please check your internet connection."
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <form className="w-96 mt-8" onSubmit={handleSubmit}>
      {/* Name */}
      <TextField
        title="Name"
        type={"text"}
        value={formData.name}
        handleChange={handleChange}
        name="name"
      />

      {/*Phone Number */}
      <TextField
        title="Phone Number"
        type={"text"}
        value={formData.phone}
        handleChange={handleChange}
        name="phone"
      />

      {/*Email */}
      <TextField
        title="Email"
        type={"email"}
        value={formData.email}
        handleChange={handleChange}
        name="email"
      />

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
