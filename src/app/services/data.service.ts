import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Route } from '../interfaces/route.interface';
import { getPoll } from '../interfaces/getPoll.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrls = {
    Poll: 'https://cnutrjxu4gegl4edpp4w5rbqwm0nfdez.lambda-url.eu-west-2.on.aws/',
    RouteGet: 'https://vl2ylqp2ktgzmsssyxfcicbvqa0zhtew.lambda-url.eu-west-2.on.aws/', // requires routeId
    RoutePut: 'https://gmi3usvmqytg2hip5eid74kba40drmxg.lambda-url.eu-west-2.on.aws/', // requires routeId
    RoutePost: 'https://uswwm4ywmcntl7jakytb7fgrum0kvtdg.lambda-url.eu-west-2.on.aws/',
    RouteDelete: 'https://pzin6slwz7v6wdb3bo4qux6jja0izvnc.lambda-url.eu-west-2.on.aws/', // requires routeId
    SignInEve: 'https://hn4y2jeshujoy7r5bk6n3hr6xa0lefwr.lambda-url.eu-west-2.on.aws/',
    DiscountDelete: 'https://vwpesntrbnnxlk4e5udft5ia5i0hybxw.lambda-url.eu-west-2.on.aws/', // {discountId}
    DiscountGet: 'https://53jl4pkrpqsub5yofvakdz3jfi0uhrgj.lambda-url.eu-west-2.on.aws/', // {discountId}
    DiscountPost: 'https://xaqmd7qmetxxyoarvjk35evswa0hpecd.lambda-url.eu-west-2.on.aws/',
    DiscountPut: 'https://ggb37yyglp5a42hqq6vgpkwo3e0psdqr.lambda-url.eu-west-2.on.aws/', // {discountId}
    EntityGet: 'https://xjtnzjn5nefdh2m4pdkin7dmda0jpnnq.lambda-url.eu-west-2.on.aws/' // {entityId}
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
    return this.http.post<any>(this.apiUrls.SignInEve, { data: code });
  }

  deleteDiscount(id: string) {
    return this.http.delete<any>(this.apiUrls.DiscountDelete + id);
  }

  postDiscount(data: any) {
    return this.http.post<Route>(this.apiUrls.DiscountPost, { data });
  }

  verifyEntity(id: string) {
    return this.http.get<any>(this.apiUrls.EntityGet + id);
  }
}
