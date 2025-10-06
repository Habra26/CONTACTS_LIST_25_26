import DB from "../../DB";
import Contact from "../contact/Contact";
import getTemplate from "./template";


export default class ContactsList {
    constructor(data) {
        this.domElt = document.querySelector(data.el);
        DB.setApiURL(data.apiURL);
        this.contacts = [];
        this.loadContacts();
    }

    async loadContacts() {
        const contacts = await DB.findAll();
        this.contacts = contacts.map(contact => new Contact(contact, this));
        this.render();
    }

    getContactsCount() {
        return this.contacts.length;
    }
    
    renderContactsCount() {
        this.domElt.querySelector(".counter").innerText = this.getContactsCount();
    }

    render() {
        this.domElt.innerHTML = getTemplate();
        this.contacts.forEach(contact => contact.render(this.domElt.querySelector(".contacts-list")));
        this.renderContactsCount();
        this.initEvents();
    }

    async addContact(data) {
        const create = await DB.createContact(data);
        const contact = new Contact(create);
        this.contacts.push(contact);
        contact.render(this.domElt.querySelector(".contacts-list"));
        this.renderContactsCount();
    }

    async deleteOneById(id) {
        const resp = await DB.deleteOneById(id);
        const index = this.contacts.findIndex(((contact) => (contact.id == id)));
        this.contacts.splice(index, 1);
        this.domElt.querySelector(`[data-id='${id}']`).remove();
        this.renderContactsCount();
    }

    async updateContact(contact) {
        await DB.updateContact(contact);
    }

    initEvents() {
        this.domElt.querySelector('.add-btn').addEventListener('click', (e) => {
        e.preventDefault();

    this.addContact({
        firstname: this.domElt.querySelector(".new-firstname").value,
        lastname: this.domElt.querySelector(".new-lastname").value,
        email: this.domElt.querySelector(".new-email").value,
    });

        this.domElt.querySelector('.new-firstname').value = "";
        this.domElt.querySelector('.new-lastname').value = "";
        this.domElt.querySelector('.new-email').value = "";
    });

    }
}