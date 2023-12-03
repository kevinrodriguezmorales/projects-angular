import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

    transform(dateReference: string): string {
        if (!dateReference) {
            return ''
        }
        const date = new Date(dateReference);
        return date.toISOString().substring(0, 10);
    }
}
