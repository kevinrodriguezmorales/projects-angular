import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/shared';
import { environment } from 'src/environments/enviroment';

export enum ApiEndPoint {
    PRODUCTS = "/bp/products",
    VERIFICATION = "/bp/products/verification"
}

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    private baseUrl = environment._APIProducts;
    static productApiEndPoint: string = "/bp/products";
    private productSource: BehaviorSubject<Product> = new BehaviorSubject<Product>({} as Product);
    public product$ = this.productSource.asObservable();

    constructor(
        private _http: HttpClient
    ) { }
    
    public getProducts(): Observable<any> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.get<any>(this.baseUrl + ApiEndPoint.PRODUCTS, { headers })
    }

    public setProduct(product: Product): void {
        this.productSource.next(product);
    }

    public createProduct(product: Product): Observable<any> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.post<any>(this.baseUrl + ApiEndPoint.PRODUCTS, product, { headers })
    }

    public editProduct(product: Product): Observable<any> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.put<any>(this.baseUrl + ApiEndPoint.PRODUCTS, product, { headers })
    }

    public deleteProduct(productID: string): Observable<any> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.delete<any>(this.baseUrl + ApiEndPoint.PRODUCTS + `?id=${productID}`, { headers })
    }

    public verifyID(productID: string): Observable<any> {
        return this._http.get<any>(this.baseUrl + ApiEndPoint.VERIFICATION + `?id=${productID}`)
    }
}
