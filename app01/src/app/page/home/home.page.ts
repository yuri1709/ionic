import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produtos.model';
import { HttpClient } from '@angular/common/http';
import { AlertController, AlertInput, iosTransitionAnimation, LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  itens: Produto[] = []

  constructor(
    private http: HttpClient,

    //loadingController - Ferramenta do carregando.
    private loadCtrl: LoadingController,

    private alertCtrl: AlertController
    ) {}
  
  ngOnInit() {
    //Carregando o inicio da página
    this.carregando()
    this.getJson()
  }

  getJson() {
    this.http.get<Produto[]>("http://localhost:3000/produtosArray").subscribe(resultado => this.itens = resultado)
    console.log("itens:" + this.itens)
  }

  async carregando() {
    const load = this.loadCtrl.create({
      mode: 'ios',
      message: 'Aguarde...',
      duration: 1000
    });
    (await load).present();
  }

  //Método do alertando
  async alertando() {
    const alert = this.alertCtrl.create({
      mode: 'ios',
      message: 'Sua compra',
      header: 'Lista:',
      buttons: ['ok'],
      inputs: [
        {
          name: 'produto',
          type: 'text',
          placeholder: 'Informe o produto'
        },
        {
          name: 'quantidade',
          type: 'text',
          placeholder: 'Informe a quantidade'
        }
      ]
    });
    (await alert).present();
  }
  
}
