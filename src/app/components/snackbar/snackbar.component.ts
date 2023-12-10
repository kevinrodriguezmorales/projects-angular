import { Component } from '@angular/core';
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
    public message: string = "";

    constructor(private _snackbarService: SnackbarService) {}

    public getMessage(): void {
        this._snackbarService.getSnackbar().subscribe((message: string) => {
            this.message = message
        })
    }

    public ngOnInit(): void {
        this.getMessage();
    }
}
