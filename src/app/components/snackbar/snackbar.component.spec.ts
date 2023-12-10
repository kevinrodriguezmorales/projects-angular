import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { SnackbarService } from '../services/snackbar/snackbar.service';
import { SnackbarComponent } from './snackbar.component';

fdescribe('SnackbarComponent', () => {
    let component: SnackbarComponent;
    let fixture: ComponentFixture<SnackbarComponent>;
    let snackbarService: SnackbarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ SnackbarComponent ],
            providers: [ SnackbarService ]
        })

        fixture = TestBed.createComponent(SnackbarComponent);
        component = fixture.componentInstance;
        snackbarService = TestBed.inject(SnackbarService)
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should the message be "Producto editado correctamente" when I change in the HTML', () => {
        component.message = "Producto editado correctamente"
        fixture.detectChanges();

        let debugElement = fixture.debugElement.query(By.css('.snackbar span'));
        let element = debugElement.nativeElement;

        expect(element.textContent).toEqual('Producto editado correctamente')
    })

    it('should update message when service emits a message', fakeAsync(() => {
        const expectMessage = 'Producto creado correctamente';
        spyOn(snackbarService, 'getSnackbar').and.returnValue(of(expectMessage))
        fixture.detectChanges();

        let debugElement = fixture.debugElement.query(By.css('.snackbar span'));
        let element = debugElement.nativeElement;

        component.ngOnInit();
        tick();
        
        expect(component.message).toEqual("Producto creado correctamente");
        expect(element.textContent).toEqual("Producto creado correctamente")
    }))
});
