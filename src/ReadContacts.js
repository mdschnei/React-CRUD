async function ReadContacts() {
    const contacts = await fetch("http://localhost:3002/contacts")
        .then(res => res.json())
        .then(result => {
            console.log(result)
            return result
        })
        .catch(error => console.error("Error when reading contacts:", error))
    // Return the list of contacts
    return contacts
}

export default ReadContacts;