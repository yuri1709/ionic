import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produtos.model';
import { HttpClient } from '@angular/common/http';
import { AlertController, AlertInput, iosTransitionAnimation, LoadingController } from '@ionic/angular';
import { BancoService } from 'src/app/core/servicos/banco.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  itens: Produto[] = []

  constructor(
    //loadingController - Ferramenta do carregando.
    private loadCtrl: LoadingController,

    private alertCtrl: AlertController,

    private db: BancoService
    ) {}
  
  ngOnInit() {
    //Carregando o inicio da página
    this.carregando(1, "Loading...")
    this.getJson()
  }

  getJson() {
    this.db.getAllItem().subscribe(resultado => this.itens = resultado)
    console.log("itens:" + this.itens)
  }

  deletarItem(id: number, nome: string) {
    try{
      this.db.deleteItem(id);      
    }
    finally {
      this.carregando(5000,"Deletando item "+nome+"...");
      location.reload();
    }
    
  }

  //Método do alertando
  async alertando() {
    const alert = this.alertCtrl.create({
      mode: 'ios',
      header: 'Cadastrar Produto',
      message: 'Preencha os campos abaixo:',
      inputs: [
        {
          name: 'item',
          type: 'text',
          placeholder: 'Informe o produto'
        },
        {
          name: 'quantidade',
          type: 'text',
          placeholder: 'Informe a quantidade'
        },
        {
          name: 'preco',
          type: 'number',
          placeholder: 'Informe o preço'
        }
      ],
      buttons: [     
        {
          text: 'Cancelar',
          handler: () => {
          console.log("Item cancelado")
          }
        },
        { 
          text: 'Cadastrar',
          handler: (form) => { //é como se fosse um treinador, ele trabalha como um submit().
            //vamos criar um objeto que irá formar nosso item da lista
            let item = {
              nome: form.item,
              quantia: form.quantidade,
              preco: form.preco
            };
            try {
              console.log(item)
              this.db.insertItem(item);
            } finally {
              this.carregando(6000, "Cadastrando...");
              location.reload();
            }
            
          }   
        } 
      ]
    });
    (await alert).present();
  }

  
  async carregando(timer: number, msg:string) {
    const load = this.loadCtrl.create({
      mode: 'ios',
      message: msg,
      duration: timer
    });
    (await load).present();
  }
  
}
