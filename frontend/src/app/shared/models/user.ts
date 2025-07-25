export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string; // Optional token for authentication
    // Add other user properties as needed
}