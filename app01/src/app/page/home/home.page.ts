import { Component } from '@angular/core';
import { Produto } from './models/produtos.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  itens: Produto[] = []

  // itens2: Produto[] = [
  //   {
  //     nome: "Arroz",
  //     preco: 20,
  //     quantia: 10
  //   }
  //]
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.getJson()
  }

  getJson() {
    this.http.get<Produto[]>("http://localhost:3000/produtosArray").subscribe(resultado => this.itens = resultado)
    console.log("itens:" + this.itens)
  }

  
 
  


}
