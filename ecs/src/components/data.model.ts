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

export interface Claims{
    claims: Claim[];
}

export interface Claim {
    _id: string | Object;
    category: Category;
    description: string;
    amount: number;
    status: string;
    receipt: string; // I'll keep this as a string for now, but it should be changed to the proper type soon @Max
    createdAt: Date;
}

export interface Categories {
    categories: Category[];
}

export interface Category {
    _id:    string | Object;
    name:   string;
    default:    boolean;
}
