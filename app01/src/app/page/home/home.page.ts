import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produtos.model';
import { HttpClient } from '@angular/common/http';
import { iosTransitionAnimation, LoadingController } from '@ionic/angular';
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
    private loadCtrl: LoadingController
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
  
}
