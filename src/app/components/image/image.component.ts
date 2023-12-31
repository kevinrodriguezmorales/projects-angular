import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss']
})
export class ImageComponent {
    @Input() src: string = ""
    @Input() alt: string = ""

    public displayImage: boolean = true;

    public errorInImage(): void {
        this.displayImage = false;
    }
}
