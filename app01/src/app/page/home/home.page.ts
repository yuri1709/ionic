import { Component, OnInit } from '@angular/core';
import { Produto } from '../../core/models/produtos.model';
import { BancoService } from 'src/app/core/servicos/banco.service';
import { UtilityService } from 'src/app/core/servicos/utility.service';
import { ActionSheetController, AlertController, IonMenuToggle } from '@ionic/angular';




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
    }catch(err) {
      console.log(err);
    }finally {
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
              preco: form.preco,
              //Vai ser a variavel de controle do ngIf
              status: false
            };

            try{
              this.db.insertItem(item)
            }catch(err){
              console.log(err)
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

  async presentActionSheet(item: Produto) {
    let aviso;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opção',
      subHeader: '',
      cssClass: 'my-custom-class',
      buttons: [
        {
          text: item.status ? 'Desmarcar' : 'Marcar',
          icon: item.status ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            item.status = !item.status;
            if(item.status) {
             aviso = {msg: "Marcamos", cor: 'primary'};
            } else {
             aviso= {msg: "Desmarcado", cor: 'danger'};
            }
            this.db.updateItem(item);
            this.utility.toastando(aviso.msg, aviso.cor, 'middle', 2000);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            this.utility.toastando('Cancelamos', 'dark', 'middle', 2000);
          }
        }
      ]
    });
    await actionSheet.present();
  }
  
  //Método para fazer o reload da página
  refresh(){
    location.reload()
  }


  
}
