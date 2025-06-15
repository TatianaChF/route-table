import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Route, RouteData} from './models/route.model';
import {RouteService} from './services/route.service';
import {CommonModule} from '@angular/common';
import {RouteStateService} from './services/route-state.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [CommonModule]
})
export class App implements OnInit {
  routes: Route[] = [];

  constructor(private routeState: RouteStateService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.routeState.routes$.subscribe(routes => {
      this.routes = routes;
    });

    this.loadRoutes();
  }

  loadRoutes() {
    this.routeState.loadRoutes().pipe(
      finalize(() => console.log('Загрузка завершена'))
    ).subscribe();
  }

  refresh() {
    this.routeState.refresh();
  }
}
