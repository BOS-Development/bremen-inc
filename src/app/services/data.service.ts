import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '../interfaces/route.interface';
import { getPoll } from '../interfaces/getPoll.interface';
import { Coupon } from '../interfaces/coupon.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrls = {
    Poll: `https://nsf72f2hkswnf5r236jeae4mxy0ztibu.lambda-url.eu-west-2.on.aws/`,
    DiscountDelete: `https://ar274ds7lwhha4qi4chqfnmibi0whmkr.lambda-url.eu-west-2.on.aws/`,
    DiscountGet: `https://lim6kzxcqmdhmcdmt37jqhoby40aanps.lambda-url.eu-west-2.on.aws/`,
    RouteGet: `https://kpuepj2pm5eglbvtx65s36ouli0rrbeu.lambda-url.eu-west-2.on.aws/`,
    EntityGet: `https://3veea4vrj2vyzbc2ybfaho77ba0fojxf.lambda-url.eu-west-2.on.aws/`,
    DiscountPost: `https://mov7suyvkiow525j66hjk445ka0jkzbg.lambda-url.eu-west-2.on.aws/`,
    RoutePut: `https://uouoaxkmfcgbdvhmjao42koe4y0xiwrp.lambda-url.eu-west-2.on.aws/`,
    DiscountPut: `https://tohkktlzzgyy2ady45p4kl2fue0spacu.lambda-url.eu-west-2.on.aws/`,
    VerifyUserCode: `https://xgfhzto2qlc2mi27oxrruqzga40togjn.lambda-url.eu-west-2.on.aws/`,
    SigninEve: `https://svlw3hhrbugc77oxhsw46xczdm0dfuux.lambda-url.eu-west-2.on.aws/`,
    RouteDelete: `https://txs5uzhxs45rj5mxjkoxbkclse0twlqm.lambda-url.eu-west-2.on.aws/`,
    RoutePost: `https://tt45w7ldgyzftb36ik2jt3sk3u0qollk.lambda-url.eu-west-2.on.aws/`,
  };

  constructor(private http: HttpClient) { }

  getPoll() {
    return this.http.get<getPoll>(this.apiUrls.Poll);
  }

  getRoute(id: number) {
    return this.http.get<Route>(this.apiUrls.RouteGet + id);
  }

  putRoute(id: number, route: Route) {
    return this.http.put<Route>(this.apiUrls.RoutePut + id, { route });
  }

  postRoute(data: Route) {
    return this.http.post<Route>(this.apiUrls.RoutePost, { data });
  }

  deleteRoute(id: string) {
    return this.http.delete<Route>(this.apiUrls.RouteDelete + id);
  }

  signIn(code: string) {
    return this.http.post<any>(this.apiUrls.SigninEve, { data: code });
  }

  deleteDiscount(id: string, entityId: string) {
    return this.http.delete<Coupon>(this.apiUrls.DiscountDelete + entityId + '/' + id);
  }

  postDiscount(data: Coupon) {
    return this.http.post<Coupon>(this.apiUrls.DiscountPost, { data });
  }

  verifyEntity(id: string) {
    return this.http.get<any>(this.apiUrls.EntityGet + id);
  }

  verifyCoupon(id: string) {
    return this.http.get<any>(this.apiUrls.VerifyUserCode + id);
  }
}
