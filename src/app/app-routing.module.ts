import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routeConfig } from './routes';

const routes: Routes = routeConfig;
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
