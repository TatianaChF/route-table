import {ChangeDetectorRef, Component, OnInit, OnDestroy} from '@angular/core';
import {Route} from './models/route.model';
import {CommonModule} from '@angular/common';
import {RouteStateService} from './services/route-state.service';
import {finalize, Subscription} from 'rxjs';
import {MatSortModule, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [CommonModule, MatSortModule]
})
export class App implements OnInit, OnDestroy {
  routes: Route[] = [];
  sortedRoutes: Route[] = [];

  private subscription = new Subscription();

  constructor(
    private routeState: RouteStateService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const routeSub = this.routeState.routes$.subscribe(routes => {
      this.routes = routes;
      this.sortedRoutes = routes;
      this.cdr.detectChanges();
    });
    this.subscription.add(routeSub);

    this.loadRoutes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadRoutes() {
    this.routeState.loadRoutes().pipe(
      finalize(() => console.log('Загрузка завершена'))
    ).subscribe();
  }

  sortData(sort: Sort): void {
    const data = this.routes.slice();

    if (!sort.active || sort.direction === '') {
      this.sortedRoutes = data;
      return;
    }

    this.sortedRoutes = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';

      switch (sort.active) {
        case 'address':
          return this.compare(a.address, b.address, isAsc)
        case 'gateway':
          return this.compare(b.gateway, b.gateway, isAsc)
        case 'interface':
          return this.compare(a.interface, b.interface, isAsc);
        default:
          return 0;
      }
    })
  }

  compare(a: number | string, b: number | string, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
}
