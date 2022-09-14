import { DialogBoxComponent } from './../dialog-box/dialog-box.component';
import { Component, OnInit } from '@angular/core';
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
  products!: IProducts[];
  productsSubcription!: Subscription;
  canEdit: boolean = false;

  constructor(private ProductsService: ProductsService, public dialog: MatDialog) { }

  ngOnInit(): void {

    this.canEdit = true;

    this.productsSubcription = this.
      ProductsService
      .getProducts()
      .subscribe(
        (data: IProducts[]) => {
          this.products = data;
        }
      )
  }

  updateData(product: IProducts) {
    console.log('start');
    this.ProductsService.updateProduct(product).subscribe((data) => {
      this.products = this.products.map(
        (product) => {
          if (product.id === data.id) return data
          else return product
        })
    })
  }

  deleteItem(id: number) {
    this.ProductsService
      .deleteProduct(id)
      .subscribe(() =>
        this.products.find(
          (item) => {
            if (id === item.id) {
              let indexId = this.products.findIndex(
                (data) => data.id === id
              )
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
        if (data && data.id)
          this.updateDate(data)
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

  updateDate(product: IProducts) {
    this.ProductsService.updateProduct(product)
      .subscribe(data =>
        this.products
          .push(data)
      )
  }

  ngOnDestroy() {
    if (this.productsSubcription)
      this.productsSubcription
        .unsubscribe();
  }
}

