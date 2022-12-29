import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChildActivationStart } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { map } from 'rxjs';

interface MarcadorColor{
  color: string;
  market?: mapboxgl.Marker;
  centro?:[number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      width: 100%;
      height: 100%;
    }

    .list-group {
      position: fixed;
      top:20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor: pointer;
    }
    `
    ]
})

export class MarcadoresComponent implements AfterViewInit {
  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 18;
  center: [number, number] =  [-75.9210294333568, 45.28719674822362];
  //Arreglo de marcadores
  marcadores: MarcadorColor[]= [];

  constructor() { }
  ngAfterViewInit(): void { //cuando el mapa esta listo para ser usado
    //! demomento esta undefined porque segun yo le flata carga, ya qye no puede obtener la referencia 
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement, //elemento propiamente html 
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    //cuando el mapa esta listo le metemos todo 
    this.leerLocalStorage()

    // const markethtml: HTMLElement = document.createElement('div');
    // markethtml.innerHTML ="Hola mundo";
      // new mapboxgl.Marker()
      // .setLngLat(this.center)
      // .addTo(this.mapa);


  }


  agregarMarcador(){
    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new  mapboxgl.Marker({
      draggable: true,
      // color: color
      color
    }).setLngLat(this.center).addTo(this.mapa); //al toque se agrega
    this.marcadores.push({
 
      color,
      market: nuevoMarcador,
    });

    this.guardarMarcadoresLocalStorage();
  }

  irMarcador(market: mapboxgl.Marker){
    //ubicacion donde yo quiera que se mueva 
      this.mapa.flyTo({
        center: market.getLngLat(),
      })
  }


  // ! confia , ? cuando exista - opcional
  //objeto serializado como string ->string -> pero tampoco abuses pe 
  guardarMarcadoresLocalStorage(){
    const lngLatArr: MarcadorColor[] =[];
      this.marcadores.forEach(m=>{

        const color = m.color;
        const {lng, lat} = m.market!.getLngLat();
        lngLatArr.push({
          color: color,
          centro: [lng, lat]
        });
      });
    localStorage.setItem('marcadores', JSON.stringify(lngLatArr));

  }


  leerLocalStorage(){
    if(!localStorage.getItem('marcadores')){
        return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('marcadores')!);
    lngLatArr.forEach(m=>{
      const newMaker = new mapboxgl.Marker({
          color: m.color,
          draggable: true
      }).setLngLat(m.centro!).addTo(this.mapa);

      this.marcadores.push({
        market: newMaker,
        color: m.color,
      });

      newMaker.on("dragend", ()=>{
        this.guardarMarcadoresLocalStorage();
      })
    });
  }

  borrarMarcador(i: number){
    this.marcadores[i].market?.remove();
    this.marcadores.splice(i, 1)
    this.guardarMarcadoresLocalStorage();

  }
}
