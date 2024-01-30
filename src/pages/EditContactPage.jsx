import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import TextField from "../components/TextField";

const EditContactPage = () => {
  const { id } = useParams();
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch contact details from the backend based on the ID
    const fetchContactDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/contacts/${id}`
        );
        setContact(response.data);
      } catch (error) {
        setError("Error fetching contact details from the server.");
        console.error("Error fetching contact details:", error);
      }
    };

    fetchContactDetails();
  }, [id]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update the contact details in the backend
      await axios.put(`http://localhost:3001/api/contacts/${id}`, contact);

      // Handle the response as needed
      alert("Contact updated successfully");
    } catch (error) {
      setError("Error updating contact details.");
      console.error("Error updating contact details:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto mt-8">
      <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">
        &lt; Back to Contact List
      </Link>

      <h1 className="text-3xl font-bold mb-4">Edit Contact</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleFormSubmit} className="w-96 mt-8">
        {/* Name */}
        <TextField
          title="Name"
          type={"text"}
          value={contact.name}
          handleChange={handleInputChange}
          name="name"
        />

        {/*Phone Number */}
        <TextField
          title="Phone Number"
          type={"text"}
          value={contact.phone}
          handleChange={handleInputChange}
          name="phone"
        />

        {/*Email */}
        <TextField
          title="Email"
          type={"text"}
          value={contact.email}
          handleChange={handleInputChange}
          name="email"
        />

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditContactPage;
