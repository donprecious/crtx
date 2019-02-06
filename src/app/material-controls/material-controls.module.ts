import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatCheckboxModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
     MatCheckboxModule,
     MatAutocompleteModule,

     MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,

    MatFormFieldModule
  ]

})
export class MaterialControlsModule { }
