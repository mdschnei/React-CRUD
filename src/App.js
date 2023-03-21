import './App.css';

function Contact({firstName = 'First Name', lastName = 'Last Name', phone = 'Phone Number', email = 'Email', address = 'Address'}) {
  return (
    <div className="contact">
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{phone}</p>
      <p>{email}</p>
      <p>{address}</p>
    </div>
  )
}

function ContactList() {
  var contactData = require('./contacts.json')
  const contacts = contactData.map((contact) =>
    <Contact 
      key={contact.id} 
      firstName={contact.firstName} 
      lastName={contact.lastName} 
      phone={contact.phoneNumber} 
      email={contact.email}
      address={contact.address}
    >
    </Contact>
  )
  
  return (
    <>
      <div className="contact-list">
        List of Contacts:
      </div>
      <ul>{contacts}</ul>
    </>
  );
  // return (
  //   <>
  //     <div className="contact-list">
  //       List of Contacts:
  //     </div>
  //     <Contact></Contact>
  //   </>
  // )
}

function App() {
  return (
    <div className="App">
      <ContactList></ContactList>
    </div>
  );
}

export default App;
