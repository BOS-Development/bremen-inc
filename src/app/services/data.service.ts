import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Route } from '../interfaces/route.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public headers = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*')
    .set('Accept', 'application/vnd.bremeninc.v1+json');

  public apiUrlList = {
    Poll: 'https://cnutrjxu4gegl4edpp4w5rbqwm0nfdez.lambda-url.eu-west-2.on.aws/',
    RouteGet: 'https://vl2ylqp2ktgzmsssyxfcicbvqa0zhtew.lambda-url.eu-west-2.on.aws/', // requires routeId
    RoutePut: 'https://gmi3usvmqytg2hip5eid74kba40drmxg.lambda-url.eu-west-2.on.aws/', // requires routeId
    RoutePost: 'https://uswwm4ywmcntl7jakytb7fgrum0kvtdg.lambda-url.eu-west-2.on.aws/',
    RouteDelete: 'https://pzin6slwz7v6wdb3bo4qux6jja0izvnc.lambda-url.eu-west-2.on.aws/', // requires routeId
    SigninEve: 'https://hn4y2jeshujoy7r5bk6n3hr6xa0lefwr.lambda-url.eu-west-2.on.aws/'
  };

  constructor(private http: HttpClient) {}

  getPoll() {
    return this.http.get<any>(this.apiUrlList.Poll, { headers: this.headers });
  }

  getRoute(id: number) {
    return this.http.get<Route>(this.apiUrlList.RouteGet + id, { headers: this.headers });
  }

  putRoute(id: number, route: Route) {
    return this.http.put<Route>(this.apiUrlList.RoutePut + id, { route }, { headers: this.headers });
  }

  postRoute(routes: Route[]) {
    return this.http.put<Route>(this.apiUrlList.RoutePost, { routes }, { headers: this.headers });
  }

  deleteRoute(id: number) {
    return this.http.put<Route>(this.apiUrlList.RouteDelete + id, { headers: this.headers });
  }
}
