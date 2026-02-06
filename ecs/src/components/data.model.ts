export interface Users {
    users: User[];
}

export interface User {
    _id: string | Object;
    name:   string;
    email:  string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt:  Date;
}