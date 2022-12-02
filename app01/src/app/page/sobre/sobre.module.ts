import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SobrePageRoutingModule } from "./sobre-routing.module";
import { SobrePage } from "./sobre.page";

@NgModule({
    imports: [
        SobrePageRoutingModule,
        CommonModule,
        IonicModule,
    ],
    declarations: [SobrePage]
})
export class SobrePageModule {}