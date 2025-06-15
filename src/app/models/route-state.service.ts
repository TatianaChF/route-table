import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Route} from './route.model';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  private routesSubject = new BehaviorSubject<Route[]>([]);
  routes$ = this.routesSubject.asObservable();
}
