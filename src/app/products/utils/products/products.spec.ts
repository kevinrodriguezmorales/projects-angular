import { FinancialProduct } from "./products";

fdescribe('Test for FinantialProduct', () => {
    let product: FinancialProduct;
    let productFromAPI: {};
    let currentDate = new Date().toISOString().substring(0, 10);

    beforeEach(() => {
        product = new FinancialProduct("trj-crd100", "Tarjeta de credito", "Tarjeta de credito con multiples beneficios", "https://unplush.com/tarjeta.jpg");
        productFromAPI = {
            id: "trj-crd",
            name: "Tarjetas de Credito",
            description: "Tarjeta de consumo bajo la modalidad de credito",
            logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
            date_release: "2023-02-01T00:00:00.000+00:00",
            date_revision: "2024-02-01T00:00:00.000+00:00"
        }
    })

    describe('Test for data', () => {
        it('should create an instance', () => {
            expect(product).toBeTruthy();
        });
    })

    describe('Test for setDataRelease()', () => {
        it('should be equal to the current date', () => {
            expect(product.setReleaseDate()).toEqual(currentDate);
        })
    })

    describe('Test for setReleaseDate()', () => {
        it('should add a year to date_release', () => {
            product.date_release = "2025-01-10";
            expect(product.calculateRevisionDate()).toEqual("2026-01-10")
        })
    })

    describe('Test for initializerFromAPI()', () => {
        it('should create an instance from API', () => {
            expect(FinancialProduct.initializerFromAPI(productFromAPI)).toBeTruthy();
        })

        describe('Test for data from API', () => {
            it('should be formatted date_release(YYYY-MM-DD)', () => {
                expect(FinancialProduct.initializerFromAPI(productFromAPI).date_release).toEqual("2023-02-01")
            })
            
            it('should be formatted date_revision(YYYY-MM-DD)', () => {
                expect(FinancialProduct.initializerFromAPI(productFromAPI).date_revision).toEqual("2024-02-01")
            })
        })
    })

});
