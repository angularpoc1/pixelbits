import { NgModule } from '@angular/core';

import { LazyComponent }   from './lazy.component';
import { CoolComponent } from './cool.component';
import { AppRoutes } from './lazy.routes';

@NgModule({
  imports: [AppRoutes],
  declarations: [LazyComponent, CoolComponent]
})
export class LazyModule {}