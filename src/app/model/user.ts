export interface User {
    firstname: string;
    lastname: string;
    email: string;
    type: 'owner' | 'user';
    objectId: string;

   
}