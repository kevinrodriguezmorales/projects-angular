import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponseItem } from 'src/app/core/models';
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
    
    private productSource: BehaviorSubject<Product> = new BehaviorSubject<Product>({} as Product);
    public product$ = this.productSource.asObservable();

    constructor(
        private _http: HttpClient
    ) { }
    
    public getProducts(): Observable<Product[]> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.get<any>(this.baseUrl + ApiEndPoint.PRODUCTS, { headers })
    }

    public setProduct(product: Product): void {
        this.productSource.next(product);
    }

    public createProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.post<Product>(this.baseUrl + ApiEndPoint.PRODUCTS, product, { headers })
    }

    public updateProduct(product: Product): Observable<Product | Partial<Product> | string> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.put<Product | Partial<Product> | string>(this.baseUrl + ApiEndPoint.PRODUCTS, product, { headers })
    }

    public deleteProduct(productID: string): Observable<string> {
        const headers = new HttpHeaders({
            "authorId": 70009567
        });

        return this._http.delete<string>(this.baseUrl + ApiEndPoint.PRODUCTS + `?id=${productID}`, { headers })
    }

    public verifyID(productID: string): Observable<boolean> {
        return this._http.get<boolean>(this.baseUrl + ApiEndPoint.VERIFICATION + `?id=${productID}`)
    }
}
