// PRODUCTOS QUE SE VAN AGREGANDO AL CARRITO
import { Injectable } from "@angular/core";
import { Product } from 'src/app/pages/products/interface/product.interface';
import { Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService{
    products: Product[] = []; // MI ARRAY INICIALIZADO VACIO
    //DECLARACION DE OBSERVABLES
    private cartSubject = new Subject<Product[]>(); //agrega producto de tipo
    private totalSubject = new Subject<number>(); // guarda el total  tipo numerico
    private quantitySubject = new Subject<number>(); // cuenta la cantidad de productos del al carrito tipo numerico
    
    //DEVOLVER OBSERVABLES CON GET PARA QUE ESTEN DISPONIBLES
    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }
    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }


 

    // METODOS PRIVADOS
    private addToCart(product:Product):void{
        this.products.push(product); //subiendo el producto que recibimos
        this.cartSubject.next(this.products); //pasando valor al observable
    }  
    private calcTotal():void{
        const total = this.products.reduce( (acc, prod) => acc +=prod.price, 0); 
        this.totalSubject.next(total); //pasando valor al observable
    }
    private quantityProducts():void{
        const quantity = this.products.length;
        this.quantitySubject.next(quantity); //pasando valor al observable
    }  

 
    //METODO PUBLICO PARA ACTUALIZAR EL CART
    updateCart(product: Product): void{
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
    }
}