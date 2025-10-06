import getTemplate from './template';

export default class Contact {
    constructor(data, list) {
        this.id = data.id;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.createdAt = data.createdAt;
        this.domElt = null;
        this.list = list;
    }

    render (el) {
        const template = document.createElement('template');
        template.innerHTML = getTemplate(this);
        this.domElt = template.content.firstElementChild;
        this.initEvents();
        el.append(this.domElt);
    }

    editMode() {
        this.domElt.classList.toggle("isEditing");
    }

    async saveEdit() {
        const firstname = this.domElt.querySelector(".input-firstname").value;
        const lastname = this.domElt.querySelector(".input-lastname").value;
        const email = this.domElt.querySelector(".input-email").value;

        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;

        await this.list.updateContact(this);

        this.domElt.querySelector(".field-firstname").innerText = firstname;
        this.domElt.querySelector(".field-lastname").innerText = lastname;
        this.domElt.querySelector(".field-email").innerText = email;

        this.domElt.classList.remove("isEditing");
    }

    initEvents() {
        this.domElt.querySelector(".btn-delete").addEventListener('click', () => {
            this.list.deleteOneById(this.id);
        });

        this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
            this.editMode();
        });
        
        this.domElt.querySelector(".btn-check").addEventListener("click", () => {
            this.saveEdit();
        });
    }
}