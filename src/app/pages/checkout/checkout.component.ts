import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { tap, switchMap, delay } from 'rxjs/operators';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { NgForm } from '@angular/forms';
import { Order, Details } from 'src/app/shared/interfaces/order.interface';
import { Product } from '../products/interface/product.interface';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../products/services/products.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
model = {
    name:'virginia',
    store:'',
    shippingAddress:'',
    city: ''
};
isDelivery = true;
cart: Product[] = [];
stores: Store[] = [];


constructor(
  private dataSvc: DataService,
  private shoppingCartSvc: ShoppingCartService,
  private router: Router,
  private productsSvc: ProductsService ) {
    this.checkIfCartIsEmpty(); 
   }

  ngOnInit(): void {
    this.getStores();
    this.getDataCart();
    this.prepareDetails();
   //  this.addToCart();
  }

  private getStores():void{  
        this.dataSvc.getStores()
      .pipe(
        tap( (stores: Store[]) => this.stores = stores ) ) 
      .subscribe()
  }


       //methodo para la fecha
  onPickupOrDelivery( value: boolean): void{
      this.isDelivery = value;
  }




  
  
  onSubmit({ value: formData }: NgForm): void {
    console.log('guardar', formData);
    const data: Order = {
        ... formData,
        date: this.getCurrentDay(),
        isDelivery: this.isDelivery
      }
    this.dataSvc.saveOrder(data)
    .pipe(
      tap(res => console.log('Order ->', res )),
          switchMap(({ id:orderId }) => {
            //const orderId = order.id;
            const details = this.prepareDetails();      
            return this.dataSvc.saveDetailsOrder({details, orderId});
      }),
      //tap( res => console.log('Finish ->', res)),
      tap(() => this.router.navigate(['/checkout/thank-you-page'])),
      delay(2000),
      tap( () => this.shoppingCartSvc.resetCart() ),
    )
    .subscribe();      
  }








  private getCurrentDay():string{ //devuelve la fecha en formato string
    return new Date().toLocaleDateString()
  }

  private prepareDetails(): Details[] {
    const details: Details[] = [];
    this.cart.forEach((product:Product) => {
      const {id:productId, name:productName, qty:quantity, stock} = product;
      const updateStock = (stock - quantity);

      this.productsSvc.updateStock(productId, updateStock)
      .pipe(
        tap (() => details.push({productId, productName, quantity}))
      )
      .subscribe()
      
    })
    return details;
  }











  private getDataCart():void{
    this.shoppingCartSvc.cartAction$ 
    .pipe(
      tap((products: Product[]) => this.cart = products)
    )
    .subscribe()
  }

 //verif si cart esta vacion
  private checkIfCartIsEmpty():void {
    this.shoppingCartSvc.cartAction$
    .pipe(
      tap((products: Product[]) => {
      if (Array.isArray(products) && !products.length){
        this.router.navigate(['/products']);
      }
    })
    )
    .subscribe()
  }

}
