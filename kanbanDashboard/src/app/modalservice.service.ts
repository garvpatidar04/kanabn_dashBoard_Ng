import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {

  private modalOpen = new BehaviorSubject<boolean>(false);
  watchModal = this.modalOpen.asObservable();

  open(){
    this.modalOpen.next(true);
  }

  close(){
    this.modalOpen.next(false);
  }
}
