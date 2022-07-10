import { Coupon } from 'src/app/interfaces/coupon.interface';
import { Route } from './route.interface';
import { User } from './user.interface';
export interface getPoll {
  data: {
    bestDiscount: Coupon,
    discounts: Coupon[],
    routes: Route[],
    user: User
  }
}
