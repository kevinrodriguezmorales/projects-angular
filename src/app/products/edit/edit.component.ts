import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Product } from 'src/app/shared';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, distinctUntilChanged, startWith, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/components/services/snackbar/snackbar.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { ProductsService } from '../services/products/products.service';
import { FinancialProduct } from '../utils';

@Component({
    selector: 'app-edit',
    templateUrl: '../register/register.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent {
    // public productID: string | null = "";
    public USER_FLOW: string = "Edit";

    public form: FormGroup;
    public deadline: string = "";

    public unsubscribe = new Subject();
    public suscriptions: Subscription = new Subscription();

    public response: { state: boolean, message: Product | Partial<Product> | string } = {
        state: false,
        message: ""
    }
    
    public product = new FinancialProduct("","","", "")

    constructor(
        private _formBuilder: FormBuilder,
        private _helper: HelperService,
        // private _route: ActivatedRoute,
        private _productService: ProductsService,
        private _snackbar: SnackbarService,
        private _location: Location
    ) {
        this.form = this._formBuilder.group({
            id: [{ value: this.product.id, disabled: true }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
            name: [this.product.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            description: [this.product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            logo: [this.product.logo, [Validators.required, this.checkURLImage]],
            date_release: [this.product.date_release, Validators.required],
            date_revision: [{ value: this.product.date_revision, disabled: true }, Validators.required],
        })
    }

    public resetForm() {
        const defaultValues = {
            date_release: this._helper.setCurrentDate()
        }
        this.form.reset(defaultValues);
    }

    public setDates(): void {
        this.product.date_release = this.form.get("date_release")?.value;
        this.product.date_revision = this.product.calculateRevisionDate();
        this.form.get("date_revision")?.setValue(this.product.date_revision)
        console.log(this.product)
    }

    public createProduct(): void {
        const values = this.form.value;
        this.product.name = values.name;
        this.product.description = values.description;
        this.product.logo = values.logo;

        this.suscriptions.add(
            this._productService.updateProduct(this.product).subscribe((response: Product | Partial<Product> | string ) => {
                this.response = {
                    state: false,
                    message: response
                }
                this._snackbar.showSnackbar(3000, 'Producto editado exitosamente');
                this.goBack()
            }, (error: HttpErrorResponse) => {
                this.response = {
                    state: false,
                    message: error.error
                }
                this._snackbar.showSnackbar(5000, "Se presentó un problema al editar, inténtalo nuevamente");
            })
        )
    }

    public goBack(): void {
        this._location.back();
    }

    public loadProduct(): void {
        this.suscriptions.add(
            this._productService.product$.subscribe((product: Product) => {
                if (Object.keys(product).length === 0) {
                    this.goBack();
                    return
                }

                this.product = FinancialProduct.initializerFromAPI(product);
                this.form.patchValue({
                    date_release: this.product.date_release,
                    date_revision: this.product.date_revision,
                    description: this.product.description,
                    id: this.product.id,
                    logo: this.product.logo,
                    name: this.product.name,
                })
            })
        )
    }

    public checkURLImage(control: AbstractControl) {
        if (control.value.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|svg)(\?(.*))?$/gmi)) {
            return null
        }
        return { wrongURL: true }
    }

    public ngOnInit(): void {
        this.deadline = this._helper.setCurrentDate();
        this.loadProduct();

        this.form.get('date_release')?.valueChanges.pipe(
            takeUntil(this.unsubscribe)
        ).subscribe(() => {
            this.setDates();
        })
    }

    public ngOnDestroy(): void {
        this.unsubscribe.next(null);
        this.unsubscribe.complete();
        if (this.suscriptions) {
            this.suscriptions.unsubscribe();
        }
    }
}
