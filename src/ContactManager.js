import './ContactManager.css';
import { useEffect, useState } from 'react';
import ReadContacts from './ReadContacts';
import CreateContact from './CreateContact';
import DeleteContact from './DeleteContact';
import UpdateContact from './UpdateContact';

// Render the individual contacts
function Contact(props) {
  // Contact details are stored in state
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [phone, setPhone] = useState(props.phone)
  const [email, setEmail] = useState(props.email)
  const [address, setAddress] = useState(props.address)
  // Conditional flags exist depending on update related circumstances
  const [updateContact, setUpdateContact] = useState(false)
  const [showError, setShowError] = useState(false)

  // Handling for clicking the submit button to update a contact's information
  function handleSubmitUpdate(e) {
    // Prevent default stops the page from reloading, which is automatic submit button behaviour in JS
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      // Assume business logic where first name and last name are mandatory, while other fields are optional for a contact
      console.log("Null values for first name or last name")
      setShowError(true)
    } else {
      props.handleUpdateContact(props.id, {firstName, lastName, phone, email, address})
      setShowError(false)
      setUpdateContact(false)

      // Kind of unnecessary but immediately updates fields to match the 'N/A' in the database without needing a reload, otherwise fields would just be empty after save
      setFirstName(firstName.trim())
      setLastName(lastName.trim())
      if (!phone) {
        setPhone('N/A')
      } if (!email) {
        setEmail('N/A')
      } if (!address) {
        setAddress('N/A')
      }
    }
  }

  // Upon clicking the cancel button, revert fields to their initial values
  function handleCancelUpdate() {
    setFirstName(props.firstName)
    setLastName(props.lastName)
    setPhone(props.phone)
    setEmail(props.email)
    setAddress(props.address)
    setUpdateContact(false)
    setShowError(false)
  }
  
  return (
    <>
      {updateContact
        ?
        // Conditionally show updating form if user has clicked the "Update Contact" button
        <>
          <div className="contact-card">
            <div className="profile-photo">
              <img className="profile" alt="profile" src={require('./profile.jpg')} />
            </div>
            <form onSubmit={handleSubmitUpdate} className="contact-update-form">
              <div className="contact-info">
                <label className="text-input">
                  First Name: <input name="firstName" className="contact-field" value={firstName} onChange={e => setFirstName(e.target.value)} />
                </label>
                <label className="text-input">
                  Last Name: <input name="lastName" className="contact-field" value={lastName} onChange={e => setLastName(e.target.value)} />
                </label>
                <label className="text-input">
                  Phone Number: <input name="phone" className="contact-field" value={phone} onChange={e => setPhone(e.target.value)} />
                </label>
                <label className="text-input">
                  Email: <input name="email" className="contact-field" value={email} onChange={e => setEmail(e.target.value)} />
                </label>
                <label className="text-input">
                  Address: <input name="address" className="contact-field" value={address} onChange={e => setAddress(e.target.value)} />
                </label>
              </div>
              <div className="contact-buttons">
                <button className="update-contact-button" type="submit">Save</button>
                <button className="delete-contact-button" type="button" onClick={handleCancelUpdate}>Cancel Update</button>
              </div>
            </form>
            <p className="error-text" > 
              {showError ? 'Please ensure both a first name and last name are entered before saving' : ''}
            </p>
          </div>
        </>
        : 
        // Display the contact info along with Update and Delete buttons below 
        // These do not show while the user is actively updating the contact's info
        <>
          <div className="contact-card">
            <div className="profile-photo">
              <img className="profile" alt="profile" src={require('./profile.jpg')} />
            </div>
            <div className="contact-info">
              <div className="contact-field">First Name: {firstName}</div>
              <div className="contact-field">Last Name: {lastName}</div>
              <div className="contact-field">Phone Number: {phone}</div>
              <div className="contact-field">Email: {email}</div>
              <div className="contact-field">Address: {address}</div>
            </div>
            <div className="contact-buttons">
              <button className="update-contact-button" onClick={() => setUpdateContact(true)}>Update Contact</button>
              <button className="delete-contact-button" onClick={() => props.handleDeleteContact(props.id)} >Delete Contact</button>
            </div>
          </div>
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
      // Timeout is kind of buggy because if the button is clicked again there is resetting the timer, but at least it doesn't stay on the screen permanently
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
      <h2>Add a new contact:</h2>
      <div className="contact-card">
        <form onSubmit={handleSubmit}>
          <label className="text-input">
            First Name: <input name="firstName" className="contact-field" value={firstName} onChange={e => setFirstName(e.target.value)} />
          </label>
          <label className="text-input">
            Last Name: <input name="lastName" className="contact-field" value={lastName} onChange={e => setLastName(e.target.value)} />
          </label>
          <label className="text-input">
            Phone Number: <input name="phone" className="contact-field" value={phone} onChange={e => setPhone(e.target.value)} />
          </label>
          <label className="text-input">
            Email: <input name="email" className="contact-field" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <label className="text-input">
            Address: <input name="address" className="contact-field" value={address} onChange={e => setAddress(e.target.value)} />
          </label>
          <button type="submit" className="add-contact-button">Add Contact</button>
        </form>
        <p className="error-text" > 
          {showError ? 'Please ensure both a first name and last name are entered before submitting' : ''}
        </p>
      </div>
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
      handleUpdateContact={(id, info) => props.handleUpdateContact({id, ...info})}
    >
    </Contact>
  )
  
  return (
    <>
      <div>
        <h2>You have <strong>{contacts.length}</strong> saved contact{contacts.length === 1 ? '! Better hold on to them.' : 's!'} {contacts.length === 0 ? 'Now that\'s just sad.' : ''} {contacts.length >= 6 ? 'Wow, you\'re pretty popular!' : ''}</h2>
        {contacts.length !== 0 ? <h2>List of Contacts:</h2> : <></>}
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
    .catch((error) => console.error(error))
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
          .catch((error) => console.error(error))
        }
      })
  }

  function updateContact(info) {
    // Update a contact by passing the new set of info along with the relevant ID to the UpdateContact function
    UpdateContact(info)
      .then((res) => {
        if (res === 200) {
          // After a successful update, re-fetch the list of contacts to update the page
          ReadContacts().then(data => {
            setContacts(data)
          })
          .catch((error) => console.error(error))
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
          .catch((error) => console.error(error))
        }
      })
  }

  return (
    <>
      {contacts ? 
        <>
          <div className="main-container">
            <h1 className="main-header">Contact Manager</h1>
            <div>
              <ContactList 
                data={contacts} 
                handleDeleteContact={deleteContact}
                handleUpdateContact={updateContact}
              ></ContactList>
            </div>
            <div>
              <AddContact handleAddContact={addNewContact}></AddContact>
            </div>
          </div>
        </>
      :
      // Don't show content until the contacts have been retrieved
      // If you see this on the page for more than an instant then something has gone wrong
      <>
        <h1>Loading contacts...</h1>
        <h1>If you're seeing this, you may have forgotten to run the json-server script!</h1>
      </>
      }
    </>
  );
}


export default ContactManager;
