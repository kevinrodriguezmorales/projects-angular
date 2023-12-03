import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalLetters'
})
export class CapitalLettersPipe implements PipeTransform {

    transform(value: string): unknown {
        const words = value.split(' ');
        const filterWords = words.filter(word => word.trim() != '');
        let collectionInitials;
        let finalText;

        if (filterWords.length > 1) {
            const composedText = filterWords.slice(0, 2);
            collectionInitials = composedText.map(word => word.slice(0, 1));
            finalText = collectionInitials.join('').toUpperCase();
        } else {
            collectionInitials = filterWords[0].slice(0, 2);
            finalText = collectionInitials.toUpperCase();
        }

        return finalText;
    }

}
