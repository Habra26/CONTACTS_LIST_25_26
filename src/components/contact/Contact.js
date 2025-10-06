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

    initEvents() {
        this.domElt.querySelector(".btn-delete").addEventListener('click', () => {
            this.list.deleteOneById(this.id);
        });

        this.domElt.querySelector(".btn-edit").addEventListener("click", () => {
            this.editMode();
        });
    }
}