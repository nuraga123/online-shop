import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IProducts, IProductsConfig } from 'src/app/models/product';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  url: string = 'http://localhost:3000/products';
  urlBasket: string = 'http://localhost:3000/basket';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<IProducts>(this.url);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<IProductsConfig>(`${this.url}/${id}`);
  }

  postProduct(product: IProducts): Observable<any> {
    return this.http.post<IProducts>(this.url, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`)
  }

  updateProduct(product: IProducts) {
    return this.http.put<IProducts>(`${this.url}/${product.id}`, product);
  }

  postProductToBasket(product: IProducts): Observable<any> {
    return this.http.post<IProducts>(this.urlBasket, product);
  }

  getProductFromBasket(): Observable<any> {
    return this.http.get<IProducts>(this.urlBasket);
  }

  updateProductToBasket(product: IProducts) {
    return this.http.put<IProducts>(`${this.urlBasket}/${product.id}`, product);
  }
}
