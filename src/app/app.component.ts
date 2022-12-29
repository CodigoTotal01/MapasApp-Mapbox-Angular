import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

//Puntto deentrada de aplciacion -< se ejecutara antes qeue cualquier cosa El primer compoennte renderizado 
export class AppComponent implements OnInit{
  ngOnInit(): void {
    (mapboxgl as any).accessToken = environment.mapboxToken;
  }

}
