import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Artist } from '../models/artist';
import { ActivatedRoute } from '@angular/router';
import { Show } from '../models/show';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  lati: number = 0;
  long: number = 0;
  city: string | null = null;
  country: string | null = null;
  artistName?: string | null = null;
  tabShows: Show[] = [];

  zoom : number = 2;
  center : google.maps.LatLngLiteral = {lat: 42, lng: -4};
  markerPositions: google.maps.LatLngLiteral[] = [];
 
  constructor( public httpService: HttpClient, public route: ActivatedRoute) { }
  async ngOnInit(){
    this.artistName = await this.route.snapshot.paramMap.get('name');
    if (this.artistName){
      await this.searchShows();
      console.log(this.lati);
      console.log(this.artistName);
      console.log(this.markerPositions);
    }
  }
  
  async searchShows(){
    
    let x = await lastValueFrom(this.httpService.get<any>("https://rest.bandsintown.com/artists/luismiguel/events?app_id=API_KEY"))
    console.log(x);
    this.markerPositions = [];
    if(x.length > 0){
    this.lati = x.venue.latitude;
    this.long = x.venue.longitude;  
    this.city = x.venue.city;
    this.country = x.venue.country;  
   

    /* this.tabShows = [x.venue.city, x.venue.country]; */

    /* this.markerPositions = [{lat: this.lati, lng: this.long}] */   
      } 
  }
  addBalloon() : void {
    if(this.lati != null && this.long != null)
      this.markerPositions.push({lat: this.lati, lng: this.long}) 
       
    // Ajoutez un marqueur dans votre tableau de marqueurs en vous servant des données this.inputLat et this.inputLng !
  }

}
