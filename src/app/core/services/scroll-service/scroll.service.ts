import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ScrollService {
    private disabledScrollSource: Subject<boolean> = new BehaviorSubject<boolean>(false);
    public disableScroll$ = this.disabledScrollSource.asObservable();

    constructor() { }

    public scrollDisabled(disable: boolean): void {
        this.disabledScrollSource.next(disable);
    }
}
