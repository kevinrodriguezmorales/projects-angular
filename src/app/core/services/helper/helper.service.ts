import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class HelperService {

    constructor() { }

    public formatDateForQuery(dateReference: string): string {
        const dateInstance = new Date(dateReference);
        const offsetMinutes = dateInstance.getTimezoneOffset();
        dateInstance.setMinutes(dateInstance.getMinutes() + offsetMinutes);
        return dateInstance.toISOString();
    }

    public normalizedText(text: string): string {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    }

    public setCurrentDate(): string {
        const currentDate = new Date();
        const formatDate = currentDate.toISOString().substring(0, 10);
        return formatDate;
    }
}
