/// <reference types="@types/googlemaps" />
import { Component, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader} from '@agm/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef : ElementRef;
  public zoom: number=18;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;
  public placeID : String;
  public location: any;
  public name: any;
  public locationnames: any;
  public change:boolean=true;
  constructor(private mapsAPILoader : MapsAPILoader, private ngZone: NgZone) { 
    console.log("length:------->",this.latlongs.length); 
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) =>{
      
      if(this.latlongs.length == 0){
      this.latitude=position.coords.latitude;
      this.longitude=position.coords.longitude;

     }
        });
      }
  }

  ngOnInit() {
    this.zoom=18;
    this.latitude ;
    this.longitude;
    this.searchControl=new FormControl();

    this.mapsAPILoader.load().then( () => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement,{
        types: [],
    
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run( () => {
          
          const place:google.maps.places.PlaceResult = autocomplete.getPlace();
          this.placeID = place.place_id;
          if(place.geometry === undefined || place.geometry === null){
            return;
          }
          const latlong={
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng(),
          };
          console.log(latlong)
          this.latlongs = [];
          this.latlongs.push(latlong);
          this.setCurrentPosition()  
        });
      });
    });
  }
  setCurrentPosition(){
    
    if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition((position) =>{
      this.latlongs.map(element => {
        this.latitude=element.latitude;
        this.longitude=element.longitude;
        this.change=true;
        console.log(this.latitude,this.longitude); 
      });
      this.zoom=8;
      });
    }
  }
}
