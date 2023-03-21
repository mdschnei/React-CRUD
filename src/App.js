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
  }
]


function Contact({firstName = 'First Name', lastName = 'Last Name', phone = 'Phone Number', email = 'Email', address = 'Address'}) {

  
  function handleEditContact() {
    
  }
  
  return (
    <>
      <div className="contact">
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <p>Phone Number: {phone}</p>
        <p>Email: {email}</p>
        <p>Address: {address}</p>
      </div>

      <button className="edit-contact-button" onClick={() => handleEditContact()}>Edit Contact</button>
    </>
  )
}

function AddContact(props) {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  
  function handleSubmit(e) {
    e.preventDefault()
    if (firstName === '' || lastName === '') {
      console.log("Null values for firstname or lastname")
    } else {
      props.handleAddContact({firstName, lastName, phone, email, address})
    }

  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label className="text-input">
          First Name: <input name="firstName" onChange={e => setFirstName(e.target.value)} />
        </label>
        <label className="text-input">
          Last Name: <input name="lastName" onChange={e => setLastName(e.target.value)} />
        </label>
        <label className="text-input">
          Phone Number: <input name="phone" onChange={e => setPhone(e.target.value)} />
        </label>
        <label className="text-input">
          Email: <input name="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="text-input">
          Address: <input name="address" onChange={e => setAddress(e.target.value)} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  )
  
}

// function EditContact(contactInfo) {
//   return (
//     <>
//       <label className="text-input">
//         First Name: <input name="firstName" defaultValue={contactInfo.firstName} />
//       </label>
//       <label className="text-input">
//         Last Name: <input name="lastName" defaultValue={contactInfo.lastName} />
//       </label>
//       <label className="text-input">
//         Phone Number: <input name="phone" defaultValue={contactInfo.phone} />
//       </label>
//       <label className="text-input">
//         Email: <input name="email" defaultValue={contactInfo.email} />
//       </label>
//       <label className="text-input">
//         Address: <input name="address" defaultValue={contactInfo.address} />
//       </label>
//     </>
//   )
// }

function ContactList({data}) {
  // var contactData = require('./contacts.json')
  // var contactArray = [];
  // for (var i in contactData) {
  //   contactArray.push(contactData[i])
  // }

  var contacts = data.map((contact) =>
    <Contact 
      key={contact.id} 
      firstName={contact.firstName} 
      lastName={contact.lastName} 
      phone={contact.phone} 
      email={contact.email}
      address={contact.address}
    >
    </Contact>
  )

  function handleDelete() {
    console.log(contacts)
  }
  
  return (
    <>
      <div className="contact-list">
        List of Contacts:
      </div>
      <ul>{contacts}</ul>
      <button onClick={handleDelete} >Delete</button>
    </>
  );
}

function ContactManager() {
  const [contacts, setContacts] = useState(existingContacts)
  const [id, setID] = useState(3)

  console.log(contacts)

  function addNewContact(info) {
    console.log(info)
    setContacts([...contacts, {id: id, ...info}])
    setID(id + 1)
    console.log(contacts)
  }

  return (
    <>
      <div className="App">
        <ContactList data={contacts}></ContactList>
      </div>
      <div className="add-contact">
        <AddContact handleAddContact={addNewContact}></AddContact>
      </div>
    </>
  );
}


export default ContactManager;
