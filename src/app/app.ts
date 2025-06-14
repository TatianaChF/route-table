import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Route} from './models/route.model';
import {RouteService} from './services/route.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  routes: Route[] = [];

  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.routeService.getRoutes().subscribe(res => {
      this.routes = res;
      console.log(this.routes);
    });
  }
}
