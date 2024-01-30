import { useEffect, useState } from "react";
import ContactForm from "../components/ContactForm";
import axios from "axios";
import RelationshipsTracker from "../components/RelationshipsTracker";
import constants from "../constants/constants";

const Home = () => {
  const [contacts, setContacts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch existing contacts from the backend on component mount
    const fetchContacts = async () => {
      try {
        const response = await axios.get(`${constants.serverURL}/contacts`);

        setContacts(response.data);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Error fetching contacts. Please try again later.");
      }
    };

    fetchContacts();
  }, []); // Run this effect only once on component mount

  return (
    <main className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <div className="">
          <a href="/">
            <h1 className="text-4xl font-bold">RelationsPilot</h1>
          </a>
          <p className="mb-4">
            Who would you like to improve your relationship with?
          </p>
        </div>

        {/* Contact collecting form */}
        <ContactForm setContacts={setContacts} />
      </div>

      {/* Relationships tracker */}
      <div className="w-1/2 h-screen flex flex-col justify-center flex-1 p-4 overflow-y-hidden">
        <div>
          <h1 className="text-3xl font-bold">Relations Tracker</h1>

          <p className="mb-4">
            Here are the people we are helping you build it with
          </p>
        </div>

        {error ? (
          <p className="text-red-600">Error: {error}</p>
        ) : (
          <>
            {contacts === null ? (
              <h1>Loading...</h1>
            ) : (
              <>
                {contacts.length === 0 ? (
                  <h1 className="text-5xl font-black">
                    Nothing to show here...
                  </h1>
                ) : (
                  <RelationshipsTracker
                    contacts={contacts}
                    setContacts={setContacts}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default Home;
