

const fs = require('fs/promises');
const path = require('path');
const { stringify } = require('querystring');

const contactsPath = path.normalize('db/ contacts.json');

async function listContacts() {

    try {
        const data = await fs.readFile(contactsPath)
        const contacts = JSON.parse(data)
        return contacts
    }
    catch (error) {
        throw error
    }
}

async function getContactById(contactId) {

    const allContacts = await listContacts()
    const contact = allContacts.find(contact => contact.id === contactId)
    if (!contact) {
        throw new Error('Not found')
    }
    return contact
}

async function removeContact(contactId) {

    const allContacts = await listContacts()
    const index = allContacts.findIndex(contact => contact.id === contactId)
    if (index === -1) {
        throw new Error('Not found')
    }
    const rewriteListContacts = allContacts.filter(contact => contact.id !== contactId)
    fs.writeFile(contactsPath, JSON.stringify(rewriteListContacts))
    return allContacts[index]
}

async function addContact(name, email, phone) {

    const allContacts = await listContacts()
    const id = allContacts[allContacts.length - 1].id + 1
    const newContact = {
        id, name, email, phone
    }
    const newContactsList = [...allContacts, newContact]
    fs.writeFile(contactsPath, JSON.stringify(newContactsList))
    return newContact
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}