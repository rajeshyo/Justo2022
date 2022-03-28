import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';

export interface Product {
  id: number;
  name: string;
  price: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0 },
    { id: 1, name: 'Pizza Classic', price: 5.49, amount: 0 },
    { id: 2, name: 'Sliced Bread', price: 4.99, amount: 0 },
    { id: 3, name: 'Salad', price: 6.99, amount: 0 }
  ];
 
  private cart = [];
  public cartItemCount = 0;
  public wishlistItemCount = 0;
 
  constructor(    private http: HttpClient,
    ) {

      this.getCartItemCount();
    }
 
  getProducts() {
    return this.data;
  }
 
  getCart() {

    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');

    var formdata = new FormData();
    formdata.append('_operation','getCartProducts');
    formdata.append('_session',session);
    // formdata.append('productId',id);
    formdata.append('userId',userid);

    let total = 0;
    this.http.post( url,formdata,{})
    .toPromise()
    .then((response:any) => {
//console.log('cart-count', response.result.products)
      this.cart =response.result.products;
     
           //alert(data['TotalCount']);
           return this.cart;
           });  
  }
 
  getCartItemCount() {
    let url = environment.baseurl
    const session = localStorage.getItem('session');
    const userid = localStorage.getItem('userid');

    var formdata = new FormData();
    formdata.append('_operation','getCartProductsAndWishListCount');
    formdata.append('_session',session);
    // formdata.append('productId',id);
    formdata.append('userId',userid);

    let total = 0;
    this.http.post( url,formdata,{}).toPromise()
    .then((response:any) => {
     console.log('cart-count', response); 
     if(response.success == true){
     this.cartItemCount = response.result.cartProductsCount;
     this.wishlistItemCount = response.result.whishListProductCount;
     }
           });  
  }
 
 /*  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  } */
}