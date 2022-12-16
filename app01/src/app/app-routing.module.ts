import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Rotas filhas
  {
    //Nesse caso ele não carrega diretamente a rota
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'contato',
    loadChildren: () => import('./page/contato/stock.module').then(m => m.StockPageModule)
  },
  {
    path: 'sobre',
    loadChildren: () => import('./page/sobre/sobre.module').then(m => m.SobrePageModule)
  },
  {
    path: 'form/:id',
    loadChildren: () => import('./page/form/form.module').then( m => m.FormPageModule)
  }
  
    //Rotas simples :
    /*{path 'incio'}, component: iniciocomponete*/
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
