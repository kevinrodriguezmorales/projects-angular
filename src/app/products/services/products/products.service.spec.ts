import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ApiResponse } from 'src/app/core/models';
import { Product } from 'src/app/shared';
import { ProductsService } from './products.service';

const mockProducts: Product[] = [
    {
        id: "trj-crd",
        name: "Tarjetas de Credito",
        description: "Tarjeta de consumo bajo la modalidad de credito",
        logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
        date_release: "2023-02-01T00:00:00.000+00:00",
        date_revision: "2024-02-01T00:00:00.000+00:00"
    }
];

const mockProduct: Product = {
    id: "trj-crd",
    name: "Tarjetas de Credito",
    description: "Tarjeta de consumo bajo la modalidad de credito",
    logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
    date_release: "2023-02-01T00:00:00.000+00:00",
    date_revision: "2024-02-01T00:00:00.000+00:00"
}

const mockPartialData: Partial<Product> = {
    name: "no debe ser nulo",
    description: "no debe ser nulo"
}

const mockApiResponse: ApiResponse = {
    responses: [
        // get products
        { code: 200, description: mockProducts },
        { code: 400, description: 'Header "authorId" is missing' },

        // create product
        // 200 
        // 400 
        { code: 206, description: mockPartialData },

        // edit product
        // 200
        // 400
        // 206
        { code: 401, description: 'You must be the owner' },

        // delete product
        { code: 200, description: 'Product successfully removed' },
        // 400
        { code: 404, description: 'Not product found with that id' },

        // verify ID
        { code: 200, description: true }
    ]
}

const mockedService: {
    getProducts: () => Observable<Product[]>,
    setProduct: () => void,
    createProduct: () => Observable<Product | string>,
    editProduct: () => Observable<Product | string>,
    deleteProduct: () => Observable<string>,
    verifyID: () => Observable<boolean>
} = {
    getProducts: () => of([]),
    setProduct: () => { },
    createProduct: () => of(mockProduct),
    editProduct: () => of(mockProduct),
    deleteProduct: () => of(''),
    verifyID: () => of(true)
}

fdescribe('ProductsService', () => {
    let service: ProductsService;
    let httpTestingController: HttpTestingController;
    let urlBase = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
            // providers: [{ provide: ProductsService, useValue: mockedService }]
        });

        service = TestBed.inject(ProductsService);
        httpTestingController = TestBed.inject(HttpTestingController)
    });

    afterEach(() => {
        httpTestingController.verify();
    })

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Test for getProducts()', () => {

        it('should return the products', fakeAsync(() => {
            // Arrange
            let dataResponse: Product[] = [];

            // Act
            service.getProducts().subscribe((products: Product[]) => {
                dataResponse = products
            })
            const req = httpTestingController.expectOne(urlBase);
            req.flush(mockProducts);
            tick();

            // Assert
            expect(dataResponse[0]).toEqual(mockProducts[0]);

            expect(dataResponse[0].id).toBeDefined();
            expect(dataResponse[0].name).toBeDefined();
            expect(dataResponse[0].description).toBeDefined();
            expect(dataResponse[0].logo).toBeDefined();
            expect(dataResponse[0].date_release).toBeDefined();
            expect(dataResponse[0].date_revision).toBeDefined();
        }))
    })

    describe('Test for createProdut()', () => {

        it('should return an new product', fakeAsync(() => {
            let dataResponse: Product = {} as Product;
            let dataError;

            let newProduct: Product = {
                id: "trj-crd",
                name: "Tarjetas de Credito",
                description: "Tarjeta de consumo bajo la modalidad de credito",
                logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
                date_release: "2023-02-01T00:00:00.000+00:00",
                date_revision: "2024-02-01T00:00:00.000+00:00"
            }
            service.createProduct(newProduct).subscribe(response => {
                dataResponse = response;
            }, error => {
                dataError = error
            })

            const request = httpTestingController.expectOne(urlBase);
            request.flush(mockProduct);
            tick();

            expect(dataError).toBeUndefined();
            expect(dataResponse).toEqual(mockProduct);

            expect(dataResponse.id).toBeDefined();
            expect(dataResponse.name).toEqual(mockProduct.name);
            expect(dataResponse.description).toEqual(mockProduct.description);
            expect(dataResponse.logo).toEqual(mockProduct.logo);
            expect(dataResponse.date_release).toEqual(mockProduct.date_release);
            expect(dataResponse.date_revision).toEqual(mockProduct.date_revision);
        }))
    })

    describe('Test for updateProduct()', () => {
        it('should return an edited product', fakeAsync(() => {
            let dataResponse: Product | Partial<Product> | string = {} as Product;
            let dataError;

            let editedProduct: Product = {
                id: "trj-crd",
                name: "Tarjetas de Credito",
                description: "Tarjeta de consumo bajo la modalidad de credito",
                logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
                date_release: "2023-02-01T00:00:00.000+00:00",
                date_revision: "2024-02-01T00:00:00.000+00:00"
            }

            service.updateProduct(editedProduct).subscribe(response => {
                dataResponse = response
            }, error => {
                dataError = error
            })

            const request = httpTestingController.expectOne(urlBase);
            request.flush(mockProduct);
            tick();

            expect(dataError).toBeUndefined();
            expect(dataResponse.name).toEqual(mockProduct.name);
        }))

        it('should define headers correctly', fakeAsync(() => {
            const editedProduct: Product = {
                id: "trj-crd",
                name: "Tarjetas de Credito",
                description: "Tarjeta de consumo bajo la modalidad de credito",
                logo: "https://www.visa.com.ec/dam/VCOM/regional/lac/SPA/Default/Pay%20With%20Visa/Tarjetas/visa-signature-400x225.jpg",
                date_release: "2023-02-01T00:00:00.000+00:00",
                date_revision: "2024-02-01T00:00:00.000+00:00"
            }
            const expectHeaders = { 'authorId': '70009567' }

            service.updateProduct(editedProduct).subscribe(
                () => {},
                error => {
                    expect(error).toBeTruthy();
                    expect(error.error.error).toBe("Header 'authorId' is missing");
                }
            )

            const request = httpTestingController.expectOne(urlBase);

            expect(request.request.headers.get('authorId')).toEqual(expectHeaders['authorId'])
            request.error(new ErrorEvent('HttpErrorResponse', { error: "Header 'authorId' is missing" }), { status: 400, statusText: 'Bad Request' })

            tick()
        }))
    })
});
