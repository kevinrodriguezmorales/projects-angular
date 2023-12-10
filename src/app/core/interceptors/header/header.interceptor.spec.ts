import { TestBed } from '@angular/core/testing';

import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HeaderInterceptor } from './header.interceptor';

fdescribe('InterceptorHeaderInterceptor', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let urlBase = "https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp/products";
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, HttpClientModule ],
            providers: [
                HeaderInterceptor,
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: HeaderInterceptor,
                    multi: true
                }
            ]
        })

        httpClient = TestBed.inject(HttpClient)
        httpTestingController = TestBed.inject(HttpTestingController)
    });

    it('should be created', () => {
        const interceptor: HeaderInterceptor = TestBed.inject(HeaderInterceptor);
        expect(interceptor).toBeTruthy();
    });

    it('should add headers to the request', () => {
        const headerKey = 'authorId';
        const headerValue = '70009567'

        httpClient.get(urlBase).subscribe()

        const httpRequest = TestBed.inject(HttpTestingController).expectOne(urlBase)

        expect(httpRequest.request.headers.has(headerKey)).toBeTruthy();
        expect(httpRequest.request.headers.get(headerKey)).toBe(headerValue)

        httpRequest.flush({});
        httpTestingController.verify()

    })
});
