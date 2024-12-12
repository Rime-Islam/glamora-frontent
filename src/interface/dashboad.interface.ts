export interface IUserDashboardData {
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