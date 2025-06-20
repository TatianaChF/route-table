import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {Route, RouteData} from './models/route.model';
import {CommonModule} from '@angular/common';
import {RouteStateService} from './services/route-state.service';
import {finalize, Subscription} from 'rxjs';
import {Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [CommonModule]
})
export class App implements OnInit, OnDestroy {
  routes: Route[] = [];
  sortedRoutes: Route[] = [];

  private subscriptions = new Subscription();

  constructor(private routeState: RouteStateService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const routeSub = this.routeState.routes$.subscribe(routes => {
      this.routes = routes;
      this.cdr.detectChanges();
    });
    this.subscriptions.add(routeSub);

    this.loadRoutes();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadRoutes() {
    this.routeState.loadRoutes().pipe(
      finalize(() => console.log('Загрузка завершена'))
    ).subscribe();
  }

  sortData(sort: Sort) {
    const data = this.routes.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedRoutes = data;
      return;
    }
  }
}
