import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
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

fdescribe('Tes for ProductsService', () => {
    let service: ProductsService;
    let httpTestingController: HttpTestingController;
    let urlBase = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProductsService]
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
            let dataMehod: string = "";

            // Act
            service.getProducts().subscribe((products: Product[]) => {
                dataResponse = products
            })
            const req = httpTestingController.expectOne(urlBase);
            req.flush(mockProducts);
            dataMehod = req.request.method;
            tick();

            // Assert
            expect(dataResponse[0]).toEqual(mockProducts[0]);

            expect(dataResponse[0].id).toBeDefined();
            expect(dataResponse[0].name).toBeDefined();
            expect(dataResponse[0].description).toBeDefined();
            expect(dataResponse[0].logo).toBeDefined();
            expect(dataResponse[0].date_release).toBeDefined();
            expect(dataResponse[0].date_revision).toBeDefined();

            expect(dataMehod).toEqual('GET')
        }))
    })

    describe('Test for createProdut()', () => {
        it('should return an new product', fakeAsync(() => {
            let dataResponse: Product = {} as Product;
            let dataError;
            let dataMethod: string = "";

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
            dataMethod = request.request.method;
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

            expect(dataMethod).toEqual('POST')
        }))
    })

    describe('Test for updateProduct()', () => {
        it('should return an edited product', fakeAsync(() => {
            let dataResponse: Product | Partial<Product> | string = {} as Product;
            let dataError;
            let dataMethod: string = "";

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
            dataMethod = request.request.method;
            request.flush(mockProduct);
            tick();

            expect(dataError).toBeUndefined();
            expect(dataResponse.name).toEqual(mockProduct.name);

            expect(dataMethod).toEqual('PUT')

        }))
    })

    describe('Test for deleteProduct()', () => {
        it('should remove product', fakeAsync(() => {
            let dataResponse: string = "";
            let dataMethod: string = "";

            service.deleteProduct('trj-crd100').subscribe(
                res => {
                    dataResponse = res
                }
            )

            const request = httpTestingController.expectOne(`${urlBase}?id=trj-crd100`);
            dataMethod = request.request.method;
            request.flush("Product successfully removed");
            tick();

            expect(dataResponse).toEqual('Product successfully removed')
            expect(dataMethod).toEqual('DELETE')
        }))
    })

    describe('Test for verifyID()', () => {
        it('should verify existence of id', fakeAsync(() => {
            let dataResponse, dataMethod;
            let productID: string = "trj-crd100"

            service.verifyID(productID).subscribe(
                res => { dataResponse = res }
            )

            const req = httpTestingController.expectOne(`${urlBase}/verification?id=${productID}`);
            dataMethod = req.request.method;
            req.flush(true)
            tick()

            expect(dataResponse).toBeTrue()
            expect(dataMethod).toEqual('GET')
        }))
    })

    describe('Test for setProduct()', () => {
        it('should issue a product', fakeAsync(() => {
            let emittedProduct: Product | undefined;

            service.product$.subscribe(
                product => {
                    emittedProduct = product
                }
            )

            service.setProduct(mockProduct)

            expect(emittedProduct).toEqual(mockProduct);
        }))
    })
});
