export interface IUser {
    name: ReactNode | MotionValue<number> | MotionValue<string>;
    userId: string;
    email: string;
    role: "CUSTOMER" | "VENDOR" | "ADMIN";
    isBlocked: boolean;
    Admin: any[]; // Update this if you have a specific structure for Admin data
    vendor: IVendor | null;
    customer: ICustomer | null;
  }
export interface ICreateUser {
    name: string;
    email: string;
    address: string;
    password: string;
    mobile: number;
    accountType: "CUSTOMER" | "VENDOR" | "ADMIN";
  }
  
  export interface IVendor {
    vendorId: string;
    email: string;
    name: string;
    image: string | null;
    address: string;
    mobile: number;
    gender: string | null;
    userId: string;
  }
  
  export interface ICustomer {
    customerId: string;
    email: string;
    name: string;
    image: string | null;
    address: string;
    mobile: number;
    gender: string | null;
    userId: string;
  }