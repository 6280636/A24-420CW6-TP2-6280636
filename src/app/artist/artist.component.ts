import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/Spotify.service';
import { Artist } from '../models/artist';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {

  artistName : string = "";
  artist ?: Artist;
  tabArtistes : Artist[] = [];
  jsonData : string | null = null;
 
  constructor(public httpService: SpotifyService) { }

  async ngOnInit() {
   await this.httpService.connect(); 
   this.jsonData = localStorage.getItem("favori")
   if(this.jsonData != null){
    this.tabArtistes = JSON.parse(this.jsonData);
   }
  }

  async getArtist() : Promise<void>{
    // Allo 👋
    this.artist=await this.httpService.searchArtist(this.artistName);
    this.addArtiste();
    this.artistName='';
  }

  async addArtiste(){
    if (this.artist){
      let exist = this.tabArtistes.some(a =>a.id === this.artist?.id);
      if(!exist){
      this.tabArtistes.push(this.artist);
      this.artist = undefined;
      this.saveAlbum();
      }
    }
  }
  async deleteArtist(artistId: string):Promise<void>{
    this.tabArtistes = await this.tabArtistes.filter(a =>a.id !== artistId)
    this.saveAlbum();
  }
  saveAlbum(){
    localStorage.setItem("favori", JSON.stringify(this.tabArtistes))
  }
}

