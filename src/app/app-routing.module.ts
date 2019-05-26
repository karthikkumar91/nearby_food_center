import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path : "",component:HeaderComponent,children:[
    {path: "",component:MapComponent},
    
  ]},
  {path : "details/:id/:lat/:lng", component : DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
