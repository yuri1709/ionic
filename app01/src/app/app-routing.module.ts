import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //Rotas filhas
  {
    //Nesse caso ele não carrega diretamente a rota
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'contato',
    loadChildren: () => import('./contato/contato.module').then(m => m.ContatoPageModule)
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
