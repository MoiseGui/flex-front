import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductComponent } from './list-product/list-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  declarations: [ListProductComponent, AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModuleModule { }
