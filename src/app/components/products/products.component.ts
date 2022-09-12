import { Component, OnInit } from '@angular/core';
import { IProducts } from 'src/app/models/product';
import { Subscription } from 'rxjs/internal/Subscription'
import { ProductsService } from 'src/app/service/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  products!: IProducts[];
  productsSubcription!: Subscription;
  constructor(private ProductsService: ProductsService) { }

  ngOnInit(): void {
    this.productsSubcription = this.ProductsService.getProducts().subscribe((data: IProducts[]) => {
      this.products = data
    })
  }

  ngOnDestroy() {
    if (this.productsSubcription) this.productsSubcription.unsubscribe();
  }
}
