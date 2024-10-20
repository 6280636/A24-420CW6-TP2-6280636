import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { SpotifyService } from '../services/spotify.service';
import { ArtistComponent } from '../artist/artist.component';
import { Artist } from '../models/artist';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {  
  artist? : Artist;
  /* artistName : string = ""; */
  tabAlbums : Album[] = [];  
  constructor(public httpService: SpotifyService, public route: ActivatedRoute) { }

  ngOnInit(): void {    
    const artistId = this.route.snapshot.paramMap.get('id');
    
    if (artistId) {
      this.loadAlbums(artistId);
    }
  }
 
  async loadAlbums(artistId: string ) {
    try {      
      const artist = new Artist(artistId, '', ''); // Crear un objeto Artist básico
      this.tabAlbums = await this.httpService.getAlbums(artist); // Llama al servicio para obtener los álbumes      
      
      } catch (error) {
      console.error('Error fetching albums:', error);
        }
    }     

  }
