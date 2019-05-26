import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
interface Location{
  latitude;
  longitude;
  response: any;
  headerFullLocation:any
  result
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {
  private credentials = 'client_id= ERXASQWJPXQZGFA5PUBVB3FR03K012B0ADMYRAJP4VPLBBDE&client_secret= QL0WDHGJLQVZZDFWIYFV15NGV5C3KJUWXOLVK5AAX3D1DR3J'
  private map_key = 'AIzaSyBOQcBlbuSNv1F9GHCp8BAp6ZfDJoRLjXQ';
  private url = '';
  private location = "udupi";
  result:any;
  data:any;
  check:any;
  photo:any;
  private hasChanges: boolean = false;
  constructor(private http : HttpClient) { }


  getApi(lat ,lng){
    return this.http.get<Location>('https://api.foursquare.com/v2/venues/explore?ll='+lat+','+lng+'&v=20181106&limit=20&radius=500&section=food&client_id=ERXASQWJPXQZGFA5PUBVB3FR03K012B0ADMYRAJP4VPLBBDE&client_secret=QL0WDHGJLQVZZDFWIYFV15NGV5C3KJUWXOLVK5AAX3D1DR3J')
  }
  getPhotos(locationnames){
    return this.http.get('https://api.foursquare.com/v2/venues/'+locationnames+'/photos?ll=40.7,-74&client_id=ERXASQWJPXQZGFA5PUBVB3FR03K012B0ADMYRAJP4VPLBBDE&client_secret=QL0WDHGJLQVZZDFWIYFV15NGV5C3KJUWXOLVK5AAX3D1DR3J&v=20173009')
  }
}
