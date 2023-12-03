import { Component, ComponentFactoryResolver, ElementRef, QueryList, Renderer2, ViewChildren, ViewContainerRef } from '@angular/core';
import { Product } from 'src/app/shared';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { ScrollService } from 'src/app/core/services/scroll-service/scroll.service';
import { ProductsService } from '../services/products/products.service';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { SnackbarService } from 'src/app/components/services/snackbar/snackbar.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

    public products: Array<Product> = [];
    public productsPerPage: Array<Product> = [];
    public filteredData: Array<Product> = [];
    public searchTerm: string = '';
    public itemsPerPage: number = 5;
    public quantitiesRecords: Array<number> = [5, 10, 20];
    public selectedProduct: Product | null = null;

    public buttonPosition: Array<number> = [];

    public isLoading: boolean = false;
    public showDialogComponent: boolean = false;
    public showMenuComponent: boolean = false;

    public confirmDeleteProduct: boolean = false;

    constructor(
        private _helper: HelperService,
        private _scroll: ScrollService,
        private _productService: ProductsService,
        private _snackbar: SnackbarService
    ) { }

    public trackById(index: number, item: Product): string {
        return item.id
    }

    public search(): void {
        if (this.searchTerm.length == 0) {
            this.loadProducts();
            this.filteredData = [...this.productsPerPage];
        } else if (this.searchTerm.length > 2) {
            const normalizedSearchTerm = this._helper.normalizedText(this.searchTerm);
            this.filteredData = this.productsPerPage.filter((item: Product) => {
                const normalizedName = this._helper.normalizedText(item.name)
                const normalizedDescription = this._helper.normalizedText(item.description)
                return normalizedName.includes(normalizedSearchTerm) || normalizedDescription.includes(normalizedSearchTerm);
            })
        }
    }

    public resetSearchTerm(): void {
        this.searchTerm = "";
    }

    public loadProducts(): void {
        this.isLoading = true;
        this._productService.getProducts().subscribe((data: Array<Product>) => {
            this.isLoading = false;
            this.products = data;

            this.productsPerPage = this.products.slice(0, this.itemsPerPage);
            this.filteredData = [...this.productsPerPage];
        }, error => {
            this.isLoading = false;
        })
    }

    public toggleMenu(product: Product, event: MouseEvent): Array<number> {
        this.selectedProduct = this.selectedProduct === product ? null : product;
        this.showMenuComponent = true;

        this.buttonPosition = [];
        if (this.selectedProduct) {
            const button = event.currentTarget as HTMLButtonElement;
            const rect = button.getBoundingClientRect();
            this.buttonPosition.push(rect.x)
            this.buttonPosition.push(rect.y)
            this._scroll.scrollDisabled(true);
        }

        return this.buttonPosition
    }

    public closeMenuRef(): void {
        this.showMenuComponent = false;
        this.selectedProduct = null;
    }

    public editProduct(product: Product): void {
        this._productService.setProduct(product);
        this._scroll.scrollDisabled(false);
    }
    
    public showDeleteDialog(product: Product): void {
        this.showMenuComponent = false;
        this.showDialogComponent = true;
        this.selectedProduct = product;
    }

    public deleteProduct(productID: string | undefined): void {
        if (productID != undefined) {
            this._productService.deleteProduct(productID).subscribe(res => {
                console.log(res)
            }, (errorResponse: HttpErrorResponse ) => {
                if (errorResponse.error.text.includes("Product successfully removed")) {
                    this.closeDialogRef();
                    
                    this._snackbar.showSnackbar(5000, "Producto eliminado")
                    this.loadProducts();
                }
            })
        }
        
    }

    public closeDialogRef() {
        this.selectedProduct = null;
        this.showDialogComponent = false;
        this._scroll.scrollDisabled(false);
    }

    public ngOnInit(): void {
        this.loadProducts();
    }

    public ngAfterViewInit(): void { }
}
