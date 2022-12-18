import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { Produto } from 'src/app/core/models/produtos.model';
import { BancoService } from 'src/app/core/servicos/banco.service';
import { UtilityService } from 'src/app/core/servicos/utility.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  routerId = null;  //a variavel a vazia, cria uma espaco na memoria ram, a null não cria uma espaço na memoria ram
  image="";

  produto: any = { };
  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private db: BancoService,
    private utility: UtilityService,
  ) { }

  ngOnInit() {
    
    this.routerId = this.route.snapshot.params['id'];

    if(this.routerId) {
      this.db.getItem(this.routerId).subscribe(caixa => {this.produto = caixa}); //a caixa ja é do tipo pro produto por conta da tipagem do método no banco.service
    }
  }


  //Método que chama o serviço de atualização
  update(form: any) { //Também posso utilizar a tipagem ngForm em vez de any.
    const item : Produto = this.produto //Criei uma constante para podermos manipular os dados do objeto vindo do banco
    try {
      this.utility.toastando('Atualizado com sucesso!', 'primary', 'top', 5000);
      item.nome = form.value.produto //Escolhi qual será o valor a ser atribuido a este campo do objeto pelo campo do formulário NgModel
      item.quantia = form.value.quantidade
      this.db.updateItem(item); //Já com a variável tipada, vamos passar pro argumento.
    } finally {
      this.utility.carregando(10000, "Redirecionando para a página principal");
      setTimeout(this.refresh, 0)
      this.router.navigate(['/home']);
    }

  }

  refresh(){
    location.reload()
  }


}
