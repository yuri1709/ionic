import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  //Rotas Simples
  {
    path: '',
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],//A filha desse cara está dentro de RouterModules
  //a nossa filha é a routes.
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
