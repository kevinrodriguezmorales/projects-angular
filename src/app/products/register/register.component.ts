import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, distinctUntilChanged, map, startWith, takeUntil } from 'rxjs';
import { SnackbarService } from 'src/app/components/services/snackbar/snackbar.service';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { ProductsService } from '../services/products/products.service';
import { Location } from '@angular/common';
import { Product } from 'src/app/shared';
import { FinancialProduct } from '../utils';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
    public USER_FLOW: string = "Register";

    public form: FormGroup;
    public deadline: string = "";

    public unsubscribe = new Subject();
    public suscriptions: Subscription = new Subscription();

    public response: { state: boolean, message: Product | Partial<Product> | string } = {
        state: false,
        message: ""
    }

    public product = new FinancialProduct("","","", "");

    constructor(
        private _formBuilder: FormBuilder,
        private _helper: HelperService,
        private _productService: ProductsService,
        private _snackbar: SnackbarService,
        private _location: Location
    ) {
        this.form = this._formBuilder.group({
            id: [this.product.id, [Validators.required, Validators.minLength(3), Validators.maxLength(10)], this.verifyID.bind(this)],
            name: [this.product.name, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
            description: [this.product.description, [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
            logo: [this.product.logo, [Validators.required, this.checkURLImage]],
            date_release: [this.product.date_release, Validators.required],
            date_revision: [{ value: this.product.date_revision, disabled: true }, Validators.required],
        })
    }

    public setDates(): void {
        this.product.date_release = this.form.get("date_release")?.value;
        this.product.date_revision = this.product.calculateRevisionDate();
        this.form.get("date_revision")?.setValue(this.product.date_revision)
    }

    public createProduct(): void {
        const values = this.form.value;
        this.product.id = values.id;
        this.product.name = values.name;
        this.product.description = values.description;
        this.product.logo = values.logo;

        this.suscriptions.add(
            this._productService.createProduct(this.product).subscribe((response: Product | Partial<Product> | string ) => {
                this.response = {
                    state: true,
                    message: response
                }
                this._snackbar.showSnackbar(3000, 'Producto creado exitosamente');
                this.goBack()
            }, (error: HttpErrorResponse) => {
                this.response = {
                    state: false,
                    message: error.error
                }

                if (typeof this.response.message === "string") {
                    if (this.response.message.includes("Can't create because product is duplicate")) {
                        this._snackbar.showSnackbar(5000, "El producto ya ha sido creado");
                    }
                } else {
                    this._snackbar.showSnackbar(5000, "Se presentó un problema al crear, inténtalo nuevamente");
                }
            })
        )
    }

    public verifyID(control: AbstractControl) {
        return this._productService.verifyID(control.value).pipe(
            map((res: boolean) => {
                return res ? { exists: true } : null
            })
        )
    }

    public goBack(): void {
        this._location.back();
    }

    public resetForm(): void {
        const defaultValues = {
            date_release: this._helper.setCurrentDate()
        }
        this.form.reset(defaultValues);
        this.setDates();
        this.response = {
            state: false,
            message: ''
        }
    }

    public checkURLImage(control: AbstractControl) {
        if (control.value.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|svg)(\?(.*))?$/gmi)) {
            return null
        }
        return { wrongURL: true }
    }

    public ngOnInit(): void {
        this.setDates();
        this.deadline = this._helper.setCurrentDate();

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
