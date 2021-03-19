import { Component } from '@angular/core';

interface Media {
    title: string;
    src: string;
    type: string;
}

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    name = 'Angular';
    playlist = [
        {
            title: 'Pale Blue Dot',
            src: 'http://static.videogular.com/assets/videos/videogular.mp4',
            type: 'video/mp4',
        },
        {
            title: 'Big Buck Bunny',
            src:
                'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
            type: 'video/mp4',
        },
        {
            title: 'Elephants Dream',
            src:
                'http://static.videogular.com/assets/videos/elephants-dream.mp4',
            type: 'video/mp4',
        },
    ];

    currentIndex = 0;
    currentItem = this.playlist[this.currentIndex];
    api: any;

    constructor() {}

    onPlayerReady(api: any) {
        this.api = api;

        this.api
            .getDefaultMedia()
            .subscriptions.loadedMetadata.subscribe(this.playVideo.bind(this));
        this.api
            .getDefaultMedia()
            .subscriptions.ended.subscribe(this.nextVideo.bind(this));
    }

    nextVideo() {
        this.currentIndex++;

        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
        }

        this.currentItem = this.playlist[this.currentIndex];
    }

    playVideo() {
        this.api.play();
    }

    onClickPlaylistItem(item: Media, index: number) {
        this.currentIndex = index;
        this.currentItem = item;
    }
}
