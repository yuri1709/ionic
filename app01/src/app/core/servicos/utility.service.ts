import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor( //injeção de depedência.
    private loadCtrl: LoadingController,
    private toast: ToastController
  ) {}

  async carregando(timer: number, msg:string) {
    const load = this.loadCtrl.create({
      mode: 'ios',
      message: msg,
      duration: timer
    });
    (await load).present();
  }

  //Método do toast - Exibe uma mensagem
  async toastando(
      message: string, 
      color: string,  
      position: ToastOptions["position"],
      duration: number
    ) {
    const toastei = this.toast.create({ //Um objeto sendo passado como argumento.
      message,
      position,
      color,
      duration      
    });      
    (await toastei).present();
    //Essa solução é boa!!!
    //location.reload()
  }

}
