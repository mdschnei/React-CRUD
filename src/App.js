import './App.css';
import { useState } from 'react';

const existingContacts = [
  {
      "id": 1,
      "firstName": "Alison",
      "lastName": "McKenzie",
      "phone": "9287289187",
      "email": "amckenzie73@gmail.com",
      "address": "127 Firestone Court, Mississauga ON"
  },
  {   
      "id": 2,
      "firstName": "Tommy",
      "lastName": "Baker",
      "phone": "2739280192",
      "email": "tommybaker12@gmail.com",
      "address": "82 Almet Avenue, Oakville ON"
  },
  {
    "id": 3,
      "firstName": "Jeanette",
      "lastName": "Aprile",
      "phone": "8270207712",
      "email": "jeanette.aprile@gmail.com",
      "address": "927 Sonwa Drive, Kelowna BC"
  }
]


function Contact(props) {
  const [firstName, setFirstName] = useState(props.firstName)
  const [lastName, setLastName] = useState(props.lastName)
  const [phone, setPhone] = useState(props.phone)
  const [email, setEmail] = useState(props.email)
  const [address, setAddress] = useState(props.address)
  const [editContact, setEditContact] = useState(false)
  const [showError, setShowError] = useState(false)

  function handleSubmitEdit(e) {
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
        <>
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
        </>
        : 
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

function AddContact(props) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [showError, setShowError] = useState(false)
  
  function handleSubmit(e) {
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      // Assume business logic where first name and last name are mandatory, while other fields are optional for a contact
      console.log("Null values for first name or last name")
      setShowError(true)
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

function ContactManager() {
  const [contacts, setContacts] = useState(existingContacts)
  // Start IDs at 4 since there are 3 in the pre-existing set
  const [id, setID] = useState(4)

  function addNewContact(info) {
    console.log(info)
    setContacts([...contacts, {id: id, ...info}])
    setID(id + 1)
  }

  function deleteContact(id) {
    // Find the specified contact by its ID and remove it from the array
    // IDs of existing contacts do not change after contacts are removed or added, so looking up index in the array by contact ID alone is not reliable
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  function editContact(info) {
    // Create a copy of the contacts array
    // Find the array index of the contact-to-be-edited and change its contact info in the copied array
    // Save the modified contacts array to state
    var editIndex = contacts.findIndex(contact => contact.id === info.id)
    var newContacts = [...contacts]
    newContacts[editIndex] = info
    setContacts(newContacts)
  }

  return (
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
  );
}


export default ContactManager;
