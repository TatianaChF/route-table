import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Route} from '../models/route.model';


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private url = '/data.json';

  constructor(private http: HttpClient) {}

  getRoutes(): Observable<Route[]> {
    return this.http.get<Route[]>(this.url);
  }
}
