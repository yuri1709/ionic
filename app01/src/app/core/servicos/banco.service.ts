import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class BancoService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  readonly API = " http://localhost:3000/produtosArray/"

  constructor(private http: HttpClient) { }

  insertItem(produto: any) {
    return this.http.post(this.API, JSON.stringify(produto), this.httpOptions).subscribe();
  }

  updateItem(produto: Produto) {
    return this.http.put(this.API + produto.id, JSON.stringify(produto), this.httpOptions).subscribe();
  }

  getAllItem() {
    return this.http.get<Produto[]>(this.API)
  }

  deleteItem(id: number) {
    return this.http.delete(this.API + id).subscribe()
  }




}
