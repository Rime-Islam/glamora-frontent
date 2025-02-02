export interface IUserDashboardData {
  customer: any;
  data: any;
    totalOrders: number; 
    totalSpent: number;
    totalDiscounts: number; 
    orderStatus: {
      [status: string]: number; 
    };
    paymentStatus: {
      [status: string]: number; 
    };
    totalFollowers: number; 
    totalReviews: number; 
  }