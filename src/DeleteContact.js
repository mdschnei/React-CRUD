// Function allowing for the deletion of contacts from the json-server backend
// Deletes a contact by identifying it by its ID and performing an HTTP DELETE request
async function DeleteContact(id) {
    const response = await fetch("http://localhost:3002/contacts/" + id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        return res.status
    })
    .catch(error => console.error("Error when deleting contact:", error))
    // Return the status code, 200 is success
    return response
}

export default DeleteContact;