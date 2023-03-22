async function EditContact(props) {
    const contactInfo = {
        firstName: props.firstName,
        lastName: props.lastName,
        phone: props.phone,
        email: props.email,
        address: props.address
    }

    const response = await fetch("http://localhost:3002/contacts/" + props.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(contactInfo)
    })
    .then(res => {
        console.log(res)
        console.log(res.status)
        return res.status
    })
    .catch(error => console.error("Error when editing contact:", error))
    // Return the status code, 200 is success
    return response
}

export default EditContact;