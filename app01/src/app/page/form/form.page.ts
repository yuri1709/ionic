import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Produto } from 'src/app/core/models/produtos.model';
import { BancoService } from 'src/app/core/servicos/banco.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  routerId = null;  //a variavel a vazia, cria uma espaco na memoria ram, a null não cria uma espaço na memoria ram
  image="";

  produto: any = { };

  constructor(private route: ActivatedRoute, private db: BancoService,) { }

  ngOnInit() {
    this.getIdItem()
    this.routerId = this.route.snapshot.params['id'];

    if(this.routerId) {
      this.db.getItem(this.routerId).subscribe(caixa => {this.produto = caixa});
    }
  }

  getIdItem(): number {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return id
  }

  // updateItem() {
  //   let item: Produto;
  //   this.db.getItem(this.getIdItem()).subscribe(caixa => {item = caixa as Produto});    
    
  // }

  //Método que chama o serviço de atualização
  update(form: NgForm) {
    this.db.updateItem(form.value);
  }

}
