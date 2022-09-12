import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { BasketComponent } from './components/basket/basket.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductResolverResolver } from './service/product-resolver.resolver';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    resolve: { data: ProductResolverResolver },
    component: ProductDetailsComponent

  },
  {
    path: 'basket',
    component: BasketComponent
  },

  {
    path: '**',
    redirectTo: '',
    component: BaseComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
