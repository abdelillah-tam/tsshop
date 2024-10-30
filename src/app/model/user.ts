export class User {
    firstname: string;
    lastname: string;
    email: string;
    type: 'owner' | 'user';
    objectId: string;

    constructor(firstName: string,
        lastName: string,
        email: string,
        type: 'owner' | 'user',
        objectId: string) {
        this.firstname = firstName;
        this.lastname = lastName;
        this.email = email;
        this.type = type;
        this.objectId = objectId;
    }
}