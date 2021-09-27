import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from 'src/app/shared/interfaces/stores.interface';
import { Order,  DetailsOrder } from '../interfaces/order.interface';


@Injectable({
  providedIn: 'root'

})
export class DataService {

  private apiURL = 'http://localhost:3000';
  constructor( private http: HttpClient) { }
  getStores(): Observable<Store[]>{   
      return this.http.get<Store[]>(`${this.apiURL}/stores`);
  }


  //ORDER
  
  saveOrder(order: Order): Observable<any>{
    return this.http.post<Order>(`${this.apiURL}/orders`, order);
  }

  saveDetailsOrder(details: DetailsOrder): Observable<DetailsOrder>{
    return this.http.post<DetailsOrder>(`${this.apiURL}/detailsOrders`, details);
  }

}