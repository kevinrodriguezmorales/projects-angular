import { Injectable } from '@angular/core';
import { Observable, Subject, timer } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SnackbarService {
    private snackbarSubject = new Subject<string>();

    constructor() { }

    public showSnackbar(duration: number, message: string): void {
        this.snackbarSubject.next(message);

        timer(duration).subscribe(() => {
            this.hideSnackbar();
        })
    }

    public getSnackbar(): Observable<string> {
        return this.snackbarSubject;
    }

    public hideSnackbar(): void {
        this.snackbarSubject.next('');
    }
}
