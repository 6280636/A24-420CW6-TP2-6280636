import { Song } from "./song";

export class Album {
    constructor(public id : string, public name : string, public image : string, public songs : Song[] = []){}
}
