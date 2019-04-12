import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { Store, select } from '@ngrx/store';
import * as fromProduct from '../state/product.reducer';
import { ProductActionTypes } from '../state/product.actions';
import * as productActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;
  products$: any;
  error$: any;
  errorMessage$: any;

  constructor(private productService: ProductService,
    private store: Store<fromProduct.State>) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    this.store.pipe(select(fromProduct.getCurrentProduct)).subscribe(
      selectedProduct => this.selectedProduct = selectedProduct
    );


    this.errorMessage$ = this.store.pipe(select(fromProduct.getError)) ;
    this.store.dispatch(new productActions.Load());
    this.products$ = this.store.pipe(select(fromProduct.getProducts)) ;
    // this.productService.getProducts().subscribe(
    //   (products: Product[]) => this.products = products,
    //   (err: any) => this.errorMessage = err.error
    // );
    //without selector
    // this.store.pipe(select('products')).subscribe(
    //   product =>{
    //       this.displayCode = product.showProductCode
    //   }
    // )
    //with selector
    this.store.pipe(select(fromProduct.getShowProductCode)).subscribe(
      showProductCode => {
        this.displayCode = showProductCode
      }
    )


  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  checkChanged(value: boolean): void {
    // this.displayCode = value;
    this.store.dispatch(
      new productActions.ToggleProductCode(value)
      // {
      // type: 'TOGGLE_PRODUCT_CODE',
      // payload: value
    // }
  )
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }

}
