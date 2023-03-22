// Function allowing for the reading of contacts from the json-server backend
// Reads in the entire list of contacts by making an HTTP GET call (which is the default method for fetch()) to the contacts.json file
// Parses the json list and returns the formatted results
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