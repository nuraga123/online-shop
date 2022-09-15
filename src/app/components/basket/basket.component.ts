import { Subscription } from 'rxjs/internal/Subscription';
import { IProducts } from './../../models/product';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/service/products.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  constructor(private ProductsService: ProductsService) { }

  basket!: IProducts[]

  basketSubscription!: Subscription

  ngOnInit(): void {
    this.basketSubscription = this.ProductsService.getProductFromBasket().subscribe(
      (data) => { this.basket = data; }
    )
  }

  ngOnDestroy(): void {
    if (this.basketSubscription) this.basketSubscription.unsubscribe()
  }

}
