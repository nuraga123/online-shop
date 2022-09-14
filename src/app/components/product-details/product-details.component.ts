import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProducts } from 'src/app/models/product';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product!: IProducts;
  productsSubcription!: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.productsSubcription =
      this.route.data.subscribe(
        (data) => {
          this.product = data['data']
        })
  }
}
