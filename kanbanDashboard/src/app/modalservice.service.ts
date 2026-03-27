import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {
  modalOpen = new BehaviorSubject<boolean>(false);
  modalUse = this.modalOpen.asObservable();

  openModal(){
    this.modalOpen.next(true);
  }
  closeModal(){
    this.modalOpen.next(false);
  }
}
