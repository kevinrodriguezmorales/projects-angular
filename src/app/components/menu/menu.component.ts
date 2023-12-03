import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { ScrollService } from 'src/app/core/services/scroll-service/scroll.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuComponent {
    @Input() position: Array<number> = [];
    @Input() toggleMenu: boolean = false;
    @Output() onDestroyMenu: EventEmitter<void> = new EventEmitter<any>();

    constructor(private _scroll: ScrollService) { }

    public closeMenu(): void {
        this.toggleMenu = false;
        
        if (this.toggleMenu == false) {
            this._scroll.scrollDisabled(false)
            this.onDestroyMenu.emit()
        }
    }

    public ngOnInit(): void { }

    public ngOnDestroy(): void { }

    public ngAfterViewInit(): void { }
}
