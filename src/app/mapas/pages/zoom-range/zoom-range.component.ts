import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl'
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }
    .row{
      background: white;
        position: fixed;
        bottom: 50px;
        left: 50px;
        padding: 10px;
        border-radius: 5px;
      z-index:999;
      width: 400px;
    }
    `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy{
  //tomar un elemento html  y usarlo una propiedad comun y corriente 
  @ViewChild('mapa') divMapa!: ElementRef;

  mapa!: mapboxgl.Map; //póniendo el tipado

  zoomLevel: number = 18;
  //como una tupla
  center: [number, number] =  [-75.9210294333568, 45.28719674822362];
  constructor() { }
  ngOnDestroy(): void {
    //destruir cada uno de mis listener 
    this.mapa.off('zoom', ()=>{});
    this.mapa.off('zoomend',()=>{});
    this.mapa.off('move',()=>{});
  }

  ngAfterViewInit(): void { //cuando el mapa esta listo para ser usado
    //! demomento esta undefined porque segun yo le flata carga, ya qye no puede obtener la referencia 
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, //elemento propiamente html 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });


    this.mapa.on('zoom', (event) => {
      this.zoomLevel = this.mapa.getZoom();
    });


    this.mapa.on('zoomend', (event) => {
      if (this.mapa.getZoom() > 18) {
        this.mapa.zoomTo(18) //mover el zoom - rebote 
      }
    });

    //Mivimiento del mapa 

    this.mapa.on('move', (event)=> {
      const target = event.target;
      const {lng, lat} =target.getCenter();
      this.center = [lng, lat];
    })


  }


  zoomOut() {
    this.mapa.zoomOut();

  }
  zoomIn() {
    this.mapa.zoomIn();

  }


  zoomCambio(value: string){
   this.mapa.zoomTo(Number(value));
  }


}
