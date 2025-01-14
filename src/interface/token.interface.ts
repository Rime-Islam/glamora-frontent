export interface IUserToken {
    userEmail: string;
    role: "CUSTOMER" | "ADMIN" | "VENDOR" | "SUPERADMIN"; // Add other roles if needed
    iat: number; 
    exp: number; 
  }