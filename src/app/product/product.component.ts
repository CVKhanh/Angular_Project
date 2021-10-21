import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  public productsList : any;
  constructor(private api : ApiService) { }

  ngOnInit() {
  this.api.getProduct()
  .subscribe(res=>{
    this.productsList = res
  })
  }

}
