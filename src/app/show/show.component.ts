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
  date?: Date;
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
      /* console.log(this.lati); */
      console.log(this.artistName);
      /* console.log(this.markerPositions); */
    }
  }
  
  async searchShows(){
    
    let x = await lastValueFrom(this.httpService.get<any>("https://rest.bandsintown.com/artists/"+ this.artistName+"/events?app_id=API_KEY"));
    console.log(x);
    this.markerPositions = [];
    this.tabShows = [];
    if(x.length > 0){
      for(let event of x){
       
          this.lati = parseFloat(event.venue.latitude);
          this.long = parseFloat(event.venue.longitude);
          this.city = event.venue.city;
          this.country = event.venue.country;
          let newShow = new Show (event.venue.city, event.venue.country, event.datetime);
          this.tabShows.push(newShow);
          
          this.markerPositions.push({lat: this.lati, lng: this.long}) ; 
          
        }
        console.log(this.tabShows);
        console.log(this.markerPositions);
      }
    
    
      } 
  }
 

