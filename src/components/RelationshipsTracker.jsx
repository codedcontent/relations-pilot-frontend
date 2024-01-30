/* eslint-disable react/prop-types */
import ContactCard from "./ContactCard";

const RelationshipsTracker = ({ contacts, setContacts }) => {
  const handleDeleteContact = (deletedContactId) => {
    // Update the state by filtering out the deleted contact
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact._id !== deletedContactId)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-96 overflow-y-auto">
      {contacts.map((contactInfo, index) => (
        <ContactCard
          key={index}
          {...contactInfo}
          onDelete={handleDeleteContact}
        />
      ))}
    </div>
  );
};

export default RelationshipsTracker;
