import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogComponent {
    @Input() toggleDialog!: boolean;
    @Output() onDestroyDialog: EventEmitter<void> = new EventEmitter<any>();
    
    public closeDialog(): void {
        this.toggleDialog = false
        this.onDestroyDialog.emit()
    }

    public ngOnInit(): void { }
}
