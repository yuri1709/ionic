//ele que vai definir qual component será carregado quando chamado.

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { StockPage } from "./contato.page";

//Esse Routes vai ser tipo uma váriavel e
//também que à variavel que contem o caminho para o componene(page) 
//que será carregado nessa rota filha
const routes: Routes = [
    {path: '', component: StockPage}
] 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StockPageRoutingModule {

}
