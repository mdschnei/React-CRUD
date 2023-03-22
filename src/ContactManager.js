import './ContactManager.css';
import { useEffect, useState } from 'react';
import ReadContacts from './ReadContacts';
import CreateContact from './CreateContact';
import DeleteContact from './DeleteContact';
import EditContact from './EditContact';

// Render the individual contacts
function Contact(props) {
  // Contact details are stored in state
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [phone, setPhone] = useState(props.phone)
  const [email, setEmail] = useState(props.email)
  const [address, setAddress] = useState(props.address)
  // Conditional flags exist depending on edit related circumstances
  const [editContact, setEditContact] = useState(false)
  const [showError, setShowError] = useState(false)

  function handleSubmitEdit(e) {
    // Prevent default stops the page from reloading, which is automatic submit button behaviour in JS
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      // Assume business logic where first name and last name are mandatory, while other fields are optional for a contact
      console.log("Null values for first name or last name")
      setShowError(true)
    } else {
      props.handleEditContact(props.id, {firstName, lastName, phone, email, address})
      setShowError(false)
      setEditContact(false)
    }
  }

  // Upon clicking the cancel button, revert fields to their initial values
  function handleCancelEdit() {
    setFirstName(props.firstName)
    setLastName(props.lastName)
    setPhone(props.phone)
    setEmail(props.email)
    setAddress(props.address)
    setEditContact(false)
  }
  
  return (
    <>
      {editContact
        ?
        // Conditionally show editing form if user has clicked the "Edit Contact" button
        <>
          <div className="contact">
            <form onSubmit={handleSubmitEdit}>
              <label className="text-input">
                First Name: <input name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </label>
              <label className="text-input">
                Last Name: <input name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
              </label>
              <label className="text-input">
                Phone Number: <input name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
              </label>
              <label className="text-input">
                Email: <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
              </label>
              <label className="text-input">
                Address: <input name="address" value={address} onChange={e => setAddress(e.target.value)} />
              </label>
              <button type="submit">Save</button>
              <button type="button" onClick={handleCancelEdit}>Cancel Edit</button>
            </form>
            <p className="error-text" > 
              {showError ? 'Please ensure both a first name and last name are entered before saving' : ''}
            </p>
          </div>
        </>
        : 
        // Display the contact info along with Edit and Delete buttons below 
        // These do not show while the user is actively editing the contact's info
        <>
          <div className="contact">
            <p>First Name: {firstName}</p>
            <p>Last Name: {lastName}</p>
            <p>Phone Number: {phone}</p>
            <p>Email: {email}</p>
            <p>Address: {address}</p>
          </div>
          
          <button className="edit-contact-button" onClick={() => setEditContact(true)}>Edit Contact</button>
          <button className="delete-contact-button" onClick={() => props.handleDeleteContact(props.id)} >Delete Contact</button>
        </>
      }     
      
    </>
  )
}


// Renders the add new contact form and functionality
function AddContact(props) {
  // All fields are initially blank
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [showError, setShowError] = useState(false)
  

  function handleSubmit(e) {
    // Prevent default stops the page from reloading, which is automatic submit button behaviour in JS
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      // Assume business logic where first name and last name are mandatory, while other fields are optional for a contact
      console.log("Null values for first name or last name")
      // Show error text to user if requirements not fulfilled
      setShowError(true)
      setTimeout(() => setShowError(false), 5000)
    } else {
      props.handleAddContact({firstName, lastName, phone, email, address})
      // Reset fields to empty once a contact is added
      setFirstName('')
      setLastName('')
      setPhone('')
      setEmail('')
      setAddress('')
      setShowError(false)
    }
  }

  // Displays the text box inputs where contact information can be added
  // Fields are two-way linked to their respective value in state such that each updates dynamically
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="text-input">
          First Name: <input name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </label>
        <label className="text-input">
          Last Name: <input name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
        </label>
        <label className="text-input">
          Phone Number: <input name="phone" value={phone} onChange={e => setPhone(e.target.value)} />
        </label>
        <label className="text-input">
          Email: <input name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="text-input">
          Address: <input name="address" value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p className="error-text" > 
        {showError ? 'Please ensure both a first name and last name are entered before submitting' : ''}
      </p>
    </>
  )
  
}

// Renders the list of contacts
function ContactList(props) {
  // Pass contact info to each contact component
  // ID is passed twice as both key and ID because the ID is needed within the component but React doesn't allow "key" to be accessed
  var contacts = props.data.map((contact) =>
    <Contact 
      key={contact.id} 
      id={contact.id}
      firstName={contact.firstName} 
      lastName={contact.lastName} 
      phone={contact.phone} 
      email={contact.email}
      address={contact.address}
      handleDeleteContact={(id) => props.handleDeleteContact(id)}
      handleEditContact={(id, info) => props.handleEditContact({id, ...info})}
    >
    </Contact>
  )
  
  return (
    <>
      <div className="contact-list-header">
        <p>You have <strong>{contacts.length}</strong> saved contact{contacts.length === 1 ? '' : 's'}</p>
        <p>List of Contacts:</p>
      </div>
      <ul>{contacts}</ul>
    </>
  );
}

// Top level component and main action area
function ContactManager() {
  // Tracks the active contacts after being fetched
  const [contacts, setContacts] = useState(null)

  // On initial page load, asynchronously call the ReadContacts function to obtain the current list of contacts
  useEffect(() => {
    ReadContacts().then(data => {
      setContacts(data)
    })
    .catch((error) => console.log(error))
  }, [])  

  function addNewContact(info) {
    // Add a new contact by passing the relevant info to the CreateContact function
    CreateContact({...info})
      .then((res) => {
        if (res === 201) {
          // After a successful addition, re-fetch the list of contacts to update the page
          ReadContacts().then(data => {
            setContacts(data)
          })
          .catch((error) => console.log(error))
        }
      })
  }

  function editContact(info) {
    // Edit a contact by passing the new set of info along with the relevant ID to the EditContact function
    EditContact(info)
      .then((res) => {
        if (res === 200) {
          // After a successful edit, re-fetch the list of contacts to update the page
          ReadContacts().then(data => {
            setContacts(data)
          })
          .catch((error) => console.log(error))
        }
      })
  }

  function deleteContact(id) {
    // Delete a contact by passing its ID to the DeleteContact function
    DeleteContact(id)
      .then((res) => {
        if (res === 200) {
          // After successful deletion, re-fetch the list of contacts to update the page
          ReadContacts().then(data => {
            setContacts(data)
          })
          .catch((error) => console.log(error))
        }
      })
  }

  return (
    <>
      {contacts ? 
        <>
          <div className="App">
            <ContactList 
              data={contacts} 
              handleDeleteContact={deleteContact}
              handleEditContact={editContact}
            ></ContactList>
          </div>
          <div className="add-contact">
            <AddContact handleAddContact={addNewContact}></AddContact>
          </div>
        </>
      :
      // Don't show content until the contacts have been retrieved
      <div>Loading contacts...</div>
      }
    </>
  );
}


export default ContactManager;
