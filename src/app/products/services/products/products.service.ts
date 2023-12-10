import { HttpClient } from '@angular/common/http';
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
    private productSource: BehaviorSubject<Product> = new BehaviorSubject<Product>({} as Product);
    public product$ = this.productSource.asObservable();

    constructor(
        private _http: HttpClient
    ) { }
    
    public getProducts(): Observable<Product[]> {
        return this._http.get<any>(this.baseUrl + ApiEndPoint.PRODUCTS)
    }

    public createProduct(product: Product): Observable<Product> {
        return this._http.post<Product>(this.baseUrl + ApiEndPoint.PRODUCTS, product)
    }

    public setProduct(product: Product): void {
        this.productSource.next(product);
    }
    
    public updateProduct(product: Product): Observable<Product | Partial<Product> | string> {
        return this._http.put<Product | Partial<Product> | string>(this.baseUrl + ApiEndPoint.PRODUCTS, product)
    }

    public deleteProduct(productID: string): Observable<string> {
        return this._http.delete<string>(this.baseUrl + ApiEndPoint.PRODUCTS + `?id=${productID}`)
    }

    public verifyID(productID: string): Observable<boolean> {
        return this._http.get<boolean>(this.baseUrl + ApiEndPoint.VERIFICATION + `?id=${productID}`)
    }
}
