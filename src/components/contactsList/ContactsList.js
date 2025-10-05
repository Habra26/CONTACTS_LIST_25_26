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
        this.contacts = contacts.map(contact => new Contact(contact));
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

    async addFirstname(data) {
        const firstname = await DB.create(data);
        const newFirstname = new Contact(firstname);
        this.contacts.push(newFirstname);
        newFirstname.render(this.domElt.querySelector('.contacts-list'));
        this.renderContactsCount();
    }

    initEvents() {
        this.domElt.querySelector('.new-firstname').addEventListener("change", (e) => {
            this.addFirstname(e.target.value);
            e.target.value = "";
        });
    }
}