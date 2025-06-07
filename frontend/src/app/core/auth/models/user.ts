export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    token: string;
    profilePictureUrl: string | null;
}