import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable} from 'rxjs';
import {Route, RouteData} from '../models/route.model';


@Injectable({
  providedIn: 'root'
})
export class RouteService {
  private url = '/data.json';

  constructor(private http: HttpClient) {}

  getRoutes(): Observable<RouteData> {
    return this.http.get<RouteData>(this.url).pipe(
      catchError(error => {
        console.log(error);
        throw new Error('Не удалось загрузить данные');
      })
    );
  }
}
