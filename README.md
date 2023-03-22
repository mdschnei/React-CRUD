# Create, Read, Update, Delete Contacts App Created in React

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Running the App

To test the project, run both of the following in the project directory:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `json-server --watch src/contacts.json --port 3002`

Runs the json-server package and opens the server at port 3002. 
Open [http://localhost:3002](http://localhost:3002) to view it in your browser.

[http://localhost:3002/contacts](http://localhost:3002/contacts) will show the current list of contacts, while appending /:id to the end of the URL will show the contact information for a specified ID, for example [http://localhost:3002/contacts/1](http://localhost:3002/contacts/1).

### App Design

This app is a simple CRUD system that serves to demonstrate each of the four features. HTTP requests to perform the actions are made to a mocked backend supplied by the json-server package, with all contact info being stored in a corresponding json file named contacts.json. A default list of 3 contacts are stored an adjacent json file, and can be copied to the main file to quickly restore to a usable state for testing.

The main logic is contained in the ContactManager.js file, containing several nested components that render the list of contacts and UI. Each individual contact is housed in its own component which maintains its own state separately from any other contacts. This is important when using the update and delete features which are built in at the individual contact component level, as it ensures there is no ambiguity about which contact is being modified.

While all operations are initiated in the ContactManager.js file, the four service functions handling the HTTP create, read, update, and delete operations are housed in separate files for ease of readability and to simulate the more usual structure of a larger codebase. Each of these functions is a simple request handler that uses the fetch API and contact data to perform operations on the json server, returning either the parsed list of contacts in the case of ReadContacts.js or an HTTP response status code in the case of the other handlers.

Note that this app is not optimized for mobile screens, and the UI will probably break if insufficient width is available.

### Using the App

Using the app is fairly straightforward, with a simple-to-understand UI displayed to the user upon launch. Below the headers, contact cards are displayed to the user in rows, with their first name, last name, phone number, email, and local address appearing alongside a stock profile photo (shown for display purposes but not customizable). To the right side of the contact information are Update and Delete contact buttons corresponding to that contact. Clicking the delete button will immediately delete that contact, updating the page instantly to reflect the change. Clicking the update button will change the contact information into text inputs that the user can enter the amended information into, while the update and delete buttons will change into "Save and "Cancel" buttons, respectively. Changes are only made final once the user clicks either of these two buttons after making (or not making) changes.
