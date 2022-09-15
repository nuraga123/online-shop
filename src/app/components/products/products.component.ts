import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, IterableDiffers, OnInit } from '@angular/core';
import { IProducts } from 'src/app/models/product';
import { Subscription } from 'rxjs/internal/Subscription'
import { ProductsService } from 'src/app/service/products.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  constructor(
    private ProductsService: ProductsService,
    public dialog: MatDialog
  ) { }

  products!: IProducts[];
  productsSubcription!: Subscription;

  basket!: IProducts[];
  basketSubcription!: Subscription;

  canEdit: boolean = false;

  ngOnInit(): void {
    this.canEdit = true;

    this.productsSubcription = this.ProductsService.getProducts().subscribe(
      (data: IProducts[]) => {
        this.products = data;
      })

    this.basketSubcription = this.ProductsService.getProductFromBasket().subscribe((data) => {
      this.basket = data;
    });
  }

  addToBasket(product: IProducts) {
    product.quantity = 1;
    let findItem;

    if (this.basket.length > 0) {
      findItem = this.basket.find((item) => item.id === product.id);
      if (findItem) this.updateToBasket(findItem);
      else this.postToBasket(product);
    } else this.postToBasket(product);
  }

  postToBasket(product: IProducts) {
    this.ProductsService.postProductToBasket(product).subscribe((data) =>
      this.basket.push(data)
    );
  }

  updateToBasket(product: IProducts) {
    product.quantity += 1;
    this.ProductsService.updateProductToBasket(product).subscribe((data) => { });
  }

  deleteItem(id: number) {
    this.ProductsService
      .deleteProduct(id)
      .subscribe(
        () => this.products.find(
          (item) => {
            if (id === item.id) {
              let indexId = this.products.findIndex((data) => data.id === id)

              this.products.splice(indexId, 1)
            }
          }
        )
      )
  }

  openDialog(product?: IProducts): void {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '605px';
    dialogConfig.disableClose = true;
    dialogConfig.data = product;

    const dialogRef = this
      .dialog
      .open(
        DialogBoxComponent,
        dialogConfig
      )

    dialogRef.afterClosed()
      .subscribe((data) => {

        if (data)
          if (data && data.id)
            this.updateData(data)
          else
            this.postData(data)
      });
  }

  postData(data: IProducts) {
    console.log(data)

    this.ProductsService
      .postProduct(data)
      .subscribe(data =>
        this.products
          .push(data)
      )
  }

  updateData(product: IProducts) {
    this.ProductsService.updateProduct(product)
      .subscribe((data) => {
        this.products = this.products.map(
          (product) => {
            if (product.id === data.id)
              return data;
            else return product
          })
      })
  }

  ngOnDestroy() {
    if (this.productsSubcription)
      this.productsSubcription
        .unsubscribe();

    if (this.basketSubcription)
      this.basketSubcription
        .unsubscribe();
  }
}

