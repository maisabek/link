import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{HomeComponent} from './home/home.component';
import {ReleaseDetailsComponent} from './release-details/release-details.component'
import {ReleaseComponent} from './release/release.component'
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'releaseDetails/:id',component:ReleaseDetailsComponent},
  {path:'release',component:ReleaseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
