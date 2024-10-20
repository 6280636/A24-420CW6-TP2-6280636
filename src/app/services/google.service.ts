import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { lastValueFrom } from 'rxjs';
const googleApiKey = "AIzaSyAz0JyubKCNVYUdCYvGyYF17HzRjee9cQc";
const youtubeURL = "https://youtube.com/embed/"
@Injectable({
  providedIn: 'root'
})
export class GoogleService {

  constructor(public http : HttpClient, public sanitizer : DomSanitizer) { }

  async searchVideoId(searchText : string) : Promise <string>{
    const url = "https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key="+ googleApiKey + "&q=" + searchText;
    try {
        let result = await lastValueFrom (this.http.get<any>(url));        
        let videoId = result.items[0].id.videoId;
        return  videoId ? videoId : '';
        
    }catch(error){
      console.error("Error");  
      return '';
    }
  }  

  getSafeUrl(pVideoID : string) : SafeResourceUrl{
    // Remplissez la variable this.videoUrl avec l'URL de la vidéo à afficher MAIS n'oubliez pas de "sanitize" l'URL.
    // Il vous suffira de concaténer la constante youtubeURL avec this.videoId puis de sanitizer.
    let video = youtubeURL + pVideoID;   
    return this.sanitizer.bypassSecurityTrustResourceUrl(video);
  }
}
