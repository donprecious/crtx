import { NgModule } from '@angular/core';
import {MatButtonModule, MatFormField, MatFormFieldModule, MatCheckboxModule, MatAutocompleteModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
     MatCheckboxModule,
     MatAutocompleteModule,
     MatFormField,
     MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatFormField,
    MatFormFieldModule
  ]

})
export class MaterialControlsModule { }
