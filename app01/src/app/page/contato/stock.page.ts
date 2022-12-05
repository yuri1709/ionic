import { Component, OnInit } from "@angular/core";
import { LoadingController } from "@ionic/angular";

@Component({
    selector: 'app-stock',
    templateUrl: 'stock.page.html',
    styleUrls: ['stock.page.scss']
})

export class StockPage implements OnInit {
    constructor( private loadCtrl: LoadingController){
    }
    ngOnInit(): void {
        this.carregando()
    }

    async carregando() {
        const load = this.loadCtrl.create({
          mode: 'ios',
          message: 'Aguarde...',
          duration: 1000
        });
    
        (await load).present();
    
      }
}