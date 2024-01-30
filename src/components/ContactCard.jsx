/* eslint-disable react/prop-types */
import axios from "axios";
import { Link } from "react-router-dom";
import constants from "../constants/constants";

const ContactCard = ({ name, phone, email, _id, onDelete }) => {
  const handleDelete = async () => {
    try {
      // Send a DELETE request to the backend to delete the contact
      await axios.delete(`${constants.serverURL}/contacts/${_id}`);

      onDelete(_id); // Notify the parent component about the deletion
    } catch (error) {
      alert("Error deleting contact. Please try again later.");
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-md rounded-md h-max">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">Phone: {phone}</p>
      <p className="text-gray-600">
        Email: {email ? email : <strong>Not provided</strong>}
      </p>

      <div className="w-full flex items-center justify-between mt-2">
        {/* Edit link */}
        <Link to={`/edit/${_id}`} className="text-blue-500 underline block">
          Edit
        </Link>

        {/* Delete Button */}
        <div
          onClick={handleDelete}
          className="text-red-500 hover:underline block cursor-pointer"
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
