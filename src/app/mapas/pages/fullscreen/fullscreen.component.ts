import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
//toma toda la libreria de js y lo llmaremos map
@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styles:[
    `
    #mapa{
      width: 100%;
      height: 100%;
    }
    `
  ]
})
export class FullscreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var map = new mapboxgl.Map({
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-75.9210294333568, 45.28719674822362]
      ,zoom: 16
    });
  }

}
