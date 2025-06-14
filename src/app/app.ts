import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Route, RouteData} from './models/route.model';
import {RouteService} from './services/route.service';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
  imports: [CommonModule]
})
export class App implements OnInit {
  routes: Route[] = [];

  constructor(private routeService: RouteService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.routeService.getRoutes().subscribe(res => {
      this.routes = res.data;
      this.cdr.detectChanges();
      console.log(this.routes);
    });
  }
}
