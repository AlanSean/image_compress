import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import Components from './components/';
import Directives from './directives/';
//ng-zorror-antd
import ngZorro from './ng-zorro';
//angular-cdk
import Cdk from './cdk';
import { CompareComponent } from './components/compare/compare.component';

@NgModule({
  declarations: [
    //component
    ...Components,
    //Directive
    ...Directives,
    CompareComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    //nz-zrror
    ...ngZorro,
    //cdk
    ...Cdk
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,

    //component
    ...Components,
    ...Directives,
    //nz-zrror
    ...ngZorro,
    //cdk
    ...Cdk
  ]
})
export class SharedModule {}
