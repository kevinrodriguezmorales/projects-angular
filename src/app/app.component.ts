import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ScrollService } from './core/services/scroll-service/scroll.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public disableScroll: boolean = false;

    constructor(
        private _scroll: ScrollService,
        private _renderer: Renderer2
    ) { }

    public ngOnInit(): void {
        this._scroll.disableScroll$.subscribe((disable: boolean) => {
            this.disableScroll = disable;
        })
    }
}
