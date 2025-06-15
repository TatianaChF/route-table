import {Injectable} from '@angular/core';
import {BehaviorSubject, map, Observable, tap} from 'rxjs';
import {Route} from '../models/route.model';
import {RouteService} from './route.service';

@Injectable({
  providedIn: 'root'
})
export class RouteStateService {
  private routesSubject = new BehaviorSubject<Route[]>([]);
  routes$ = this.routesSubject.asObservable();

  state$ = this.routes$.pipe();

  constructor(private routeService: RouteService) {}

  loadRoutes(): Observable<Route[]> {
    return this.routeService.getRoutes().pipe(
      map(res => res.data),
      tap(routes => {
        console.log(routes);
      })
    );
  }

  refresh() {
    this.loadRoutes().subscribe();
  }
}
