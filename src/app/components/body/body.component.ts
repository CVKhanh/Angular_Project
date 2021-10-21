import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {

  public totalItem: number = 0;
  public productList: any;
  public products : any = [];
  public grandTotal !: number;

  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit() :void {
    this.api.getProduct()
      .subscribe(res => {
        this.productList = res;

        //add to cart
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        })
      })

    //total cart
    this.cartService.getProducts()
      .subscribe(res => {
        this.totalItem = res.length;
        
        this.products = res;
        this.grandTotal = this.cartService.getTotalPrice();
      })
  }

  //add to cart
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  removeItem(item1:any){
    this.cartService.removeCartItem(item1);
  }
  // emptycart(){
  //   this.cartService.removeAllCart();
  // }
  inc(item){
    if(item.quantity != 5){
      item.quantity += 1;
      item.priceF += item.priceFcal;
      item.priceB += item.priceBcal;
    }
  }
  dec(item){
    if(item.quantity != 1){
      item.quantity -= 1;
      item.priceF -= item.priceFcal;
      item.priceB -= item.priceBcal;
    }
  }
}
