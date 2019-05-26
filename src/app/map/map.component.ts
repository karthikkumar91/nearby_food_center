import { Component, OnInit,Input,AfterViewInit,OnChanges} from '@angular/core';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import {ApiCallService} from '../api-call.service'
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('1.5s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('1.5s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ],
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit,OnChanges{
  public zoom: number=18;
  @Input('lat')lat;
  @Input('lng')lng;
  constructor(private api: ApiCallService) { }
  public location:any;
  public locationnames: any;
  ngOnInit() {
    console.log(this.lat)
   }

ngOnChanges(){
  this.api.getApi(this.lat, this.lng).subscribe(result => {
    const api1 = result.response.groups.map(res => res.items)
    this.location = api1.map(res => res.map(res1 => res1.venue.location ))[0];
    this.locationnames = api1.map(res => res.map(res1 => res1.venue))[0];
    console.log(this.locationnames)
    console.log("full details:-------->",result);
    })
}
}
   