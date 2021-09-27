// PRODUCTOS QUE SE VAN AGREGANDO AL CARRITO
import { Injectable } from "@angular/core";
import { Product } from 'src/app/pages/products/interface/product.interface';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartService{
    products: Product[] = []; // MI ARRAY INICIALIZADO VACIO
    //DECLARACION DE OBSERVABLES
    private cartSubject = new BehaviorSubject<Product[]>([]); //agrega producto de tipo
    private totalSubject = new BehaviorSubject<number>(0); // guarda el total  tipo numerico
    private quantitySubject = new BehaviorSubject<number>(0); // cuenta la cantidad de productos del al carrito tipo numerico
    
    //DEVOLVER OBSERVABLES CON GET PARA QUE ESTEN DISPONIBLES
    get totalAction$(): Observable<number> {
        return this.totalSubject.asObservable();
    }
    get quantityAction$(): Observable<number> {
        return this.quantitySubject.asObservable();
    }
    get cartAction$(): Observable<Product[]> {
        return this.cartSubject.asObservable();
    }

       //METODO PUBLICO PARA ACTUALIZAR EL CART
       updateCart(product: Product): void{
        this.addToCart(product);
        this.quantityProducts();
        this.calcTotal();
        }

        resetCart(): void{
            this.cartSubject.next([]);
            this.totalSubject.next(0);
            this.quantitySubject.next(0);
        }
 

    // METODOS PRIVADOS
    private quantityProducts():void{
        const quantity = this.products.reduce( (acc, prod) => acc += prod.qty, 0); 
        this.quantitySubject.next(quantity); //pasando valor al observable
    }  

    private addToCart(product:Product):void{
        const isProductInCart = this.products.find(({ id }) => id === product.id) //verificamos si el producto ya esta cliqueado
        if(isProductInCart){ 
            isProductInCart.qty +=  1;
        }else{
            this.products.push({ ... product, qty: 1 })
        }
        this.cartSubject.next(this.products); //pasando valor al observable
    } 
     
    private calcTotal():void{
        const total = this.products.reduce( (acc, prod) => acc +=(prod.price * prod.qty), 0); 
        this.totalSubject.next(total); //pasando valor al observable
    }
  

 
 
}