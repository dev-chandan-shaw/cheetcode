export interface IUser {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string; // Optional token for authentication
    profilePictureUrl?: string; // Optional profile picture URL
    // Add other user properties as needed
}