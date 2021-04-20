import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";

import { AppConfig } from "../../environments/environment";
import { reducers, metaReducers, selectFilesState } from "./core.state";

export * from "./files/files";

export { selectFilesState };

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    AppConfig.production
      ? []
      : StoreDevtoolsModule.instrument({
        name: "Angular NgRx Material Starter",
      }),
  ],
})
export class CoreModule {}
