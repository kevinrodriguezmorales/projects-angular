import { Product } from "src/app/shared";

export class FinancialProduct implements Product {
    public date_release: string = ""
    public date_revision: string = ""
    public description: string = ""
    public id: string = ""
    public logo: string = ""
    public name: string = ""

    constructor(id: string, name: string, description: string, logo: string, releaseDate?: string, revisionDate?: string) {
        this.id = id
        this.name = name
        this.description = description
        this.logo = logo
        this.date_release = releaseDate || this.setReleaseDate()
        this.date_revision = revisionDate || this.calculateRevisionDate()
    }

    public setReleaseDate(): string {
        const currentDate = new Date()
        const formatDate = currentDate.toISOString().substring(0, 10)
        return formatDate;
    }

    public calculateRevisionDate(): string {
        const releaseDate = new Date(this.date_release)
        const revisionDate = new Date(releaseDate)
        revisionDate.setFullYear(releaseDate.getFullYear() + 1)
        return revisionDate.toISOString().substring(0, 10)
    }

    static initializerFromAPI(data: any): FinancialProduct {
        let { id, name, description, logo, date_release, date_revision } = data;
        date_release = new Date(date_release).toISOString().substring(0, 10);
        date_revision = new Date(date_revision).toISOString().substring(0, 10);
        return new FinancialProduct(id, name, description, logo, date_release, date_revision)
    }
}
