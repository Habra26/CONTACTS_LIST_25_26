export default class DB {
    static setApiURL(data) {
        this.apiURL = data;
    }


    static async findAll() {
        const response = await fetch(this.apiURL + "contacts");
        return response.json();
    }

    static async createContact(data) {
        const response = await fetch(this.apiURL + "contacts", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                createdAt: Date.now(),
            })
        });
        return response.json();
    }

    static async deleteOneById(id) {
        const response = await fetch(this.apiURL + "contacts/" + id, {
            method: "DELETE",
        });
        return response.json();
    }

    static async updateContact(data) {
        const response = await fetch(this.apiURL + "contacts/" + data.id, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                createdAt: Date.now(),
            })
        });
        return response.json();
    }

}