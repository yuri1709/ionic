import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { StockPageRoutingModule } from "./contato-routing.module";
import { StockPage } from "./contato.page";

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        IonicModule,
        StockPageRoutingModule
    ],
    declarations: [StockPage]
})
export class StockPageModule{}
