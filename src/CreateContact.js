// Function allowing for the creation of new contacts to the json-server backend
// Adds a new contact by defining its first name, last name, phone number, email, and address
// An integer ID with a value of 1 greater than the greatest current ID in the list is automatically associated with the new contact in the file
async function CreateContact(props) {
    const contactInfo = {
        firstName: props.firstName,
        lastName: props.lastName,
        phone: props.phone,
        email: props.email,
        address: props.address
    }

    const response = await fetch("http://localhost:3002/contacts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactInfo)
    }).then(res => {
        return res.status
    }
    ).catch((error) => console.log("Error adding contact:", error));
    // Return the status code, 201 is success
    return response
}

export default CreateContact;
