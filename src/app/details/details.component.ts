/// <reference types="@types/googlemaps" />
import { Component, OnInit,ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader} from '@agm/core';
import {ActivatedRoute} from '@angular/router'
import {ApiCallService} from'../api-call.service'

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

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
  id:any;
  photo:any
  lat: number; 
  lng: number;
  catagories:string;
  cross:string
  address:string
  public change:boolean;
  
  constructor(private mapsAPILoader : MapsAPILoader, private ngZone: NgZone,
    private router : ActivatedRoute,private api :ApiCallService) { 
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

    this.router.params.subscribe((data)=>{
      this.id=data.id;
      this.lat=parseFloat(data.lat);
      this.lng=parseFloat(data.lng);
      // console.log(data.id);
      this.api.getPhotos(this.id).subscribe(res=>{
        var value = res['response']
        console.log(value)
        const prefix = value.photos.items[0].prefix;
        const suffix = value.photos.items[0].suffix;
        this.photo =prefix+"324x190"+suffix;
        console.log(this.photo);
      })
    })
    this.api.getApi(this.lat,this.lng).subscribe(res=>{
      var headerFullLocation = res['response']
      this.location = headerFullLocation.headerFullLocation
      this.name=headerFullLocation.groups[0].items[0].venue.name
      this.catagories = headerFullLocation.groups[0].items[0].venue.categories[0].name
      this.address = headerFullLocation.groups[0].items[0].venue.location.address
      this.cross = headerFullLocation.groups[0].items[0].venue.location.crossStreet
    })
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
