import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produtos.model';
import { BancoService } from 'src/app/core/servicos/banco.service';
import { UtilityService } from 'src/app/core/servicos/utility.service';
import { ActionSheetController, AlertController } from '@ionic/angular';




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  itens: Produto[] = []

  constructor(
    //loadingController - Ferramenta do carregando.
    private db: BancoService,
    private utility: UtilityService,
    private alertCtrl: AlertController,  
    private actionSheetCtrl: ActionSheetController    
    ) {}
  
  ngOnInit() {
    //Carregando o inicio da página
    this.utility.carregando(1000, "Loading...")//tempo/mensagem
    this.db.getAllItem().subscribe(resultado => this.itens = resultado)
  }

  deletarItem(id: number) {
    try{
      this.db.deleteItem(id);  
      //this.carregando(5000,"Deletando item...");            
    }
    finally {
      this.utility.toastando('Item deletado','danger', 'bottom',  2000, );
      setTimeout(this.refresh, 2000);
      
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

            try{
              this.db.insertItem(item)
            }finally{
              this.utility.toastando('Cadastrado com sucesso', 'success', 'top', 2000);
              setTimeout(this.refresh, 2000)
            }
           }           
          }           
      ]
    });
    (await alert).present();
  }   

  refresh(){
    location.reload()
  }


  async adicionarItem(id: number) {
   
    const item = await this.actionSheetCtrl.create({
      header: 'Example header',
      subHeader: 'Example subheader',
      //cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Adicionar',
          handler: () => {
           console.log("Item adicionado!"+id)
          },
          data: {
            action: 'add'
          },
        },
        {
          text: 'Remover',
          handler: () => {
            console.log("Item removido!"+id)
          },
          data: {
            action: 'remover'
          }
        }
      ]
    });
    item.present()
  }


  
}
