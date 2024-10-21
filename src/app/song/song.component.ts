import { Component, Input, OnInit } from '@angular/core';
import { GoogleService } from '../services/google.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Album } from '../models/album';
import { SpotifyService } from '../services/spotify.service';
import { Song } from '../models/song';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {
album ?: Album;
tabSongs: Song[] = [];
  /* @Input()  album!: Album; */
  /* videoSearchText : string = "";*/
videoId : string = "";
  /*videoUrl ?: SafeResourceUrl; */

constructor(public httpService : SpotifyService, public route: ActivatedRoute,
      public google : GoogleService) { }

ngOnInit() {
  const albumId = this.route.snapshot.paramMap.get('id');
  if(albumId){
  this.loadSongs(albumId)
  }
}
async loadSongs(albumId: string){
  const album = new Album(albumId, "", "");
  try {
      this.tabSongs = await this.httpService.getSongs(album);
      console.log(this.tabSongs);
        } catch (error) {
      console.error('Error loading songs:', error);
        }
    }

  async serarchVideo(song : Song):Promise<void> {
    try{
    this.videoId = await this.google.searchVideoId(song.name);
    console.log(this.videoId);
    }catch(error) {
      console.error('Error searching for video:', error);
    }
  }  
 
}

