// Function allowing for the updating of existing contacts from the json-server backend
// Updates a contact by identifying it by its ID and performing an HTTP PUT request with the updated info
// A possible improvement could be checking if the values are unchanged before launching the UpdateContact call to prevent unnecessary HTTP calls
async function UpdateContact(props) {
    const contactInfo = {
        firstName: props.firstName.trim(),
        lastName: props.lastName.trim(),
        phone: props.phone.trim() || "N/A",
        email: props.email.trim() || "N/A",
        address: props.address.trim() || "N/A"
    }

    const response = await fetch("http://localhost:3002/contacts/" + props.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactInfo)
    })
    .then(res => {
        return res.status
    })
    .catch(error => console.error("Error when updating contact:", error))
    // Return the status code, 200 is success
    return response
}

export default UpdateContact;