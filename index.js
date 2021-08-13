
const contacts = require('./db/ contacts')
const argv = require('yargs').argv;



function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':

            contacts.listContacts()
                .then(console.table)
                .catch(err => console.log(err.message))
            break;

        case 'get':

            contacts.getContactById(id)
                .then(console.log)
                .catch(err => console.log(err.message))
            break;

        case 'add':

            contacts.addContact(name, email, phone)
                .then(console.log)
                .catch(err => console.log(err.message))
            break;

        case 'remove':

            contacts.removeContact(id)
                .then(console.log)
                .catch(err => console.log(err.message))
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
}

invokeAction(argv);