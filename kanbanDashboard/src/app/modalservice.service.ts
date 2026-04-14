import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalserviceService {
  modalOpen = new BehaviorSubject<boolean>(false);
  modalUse = this.modalOpen.asObservable();
  isEditTask = new BehaviorSubject<any | null>(null);
  editUse = this.isEditTask.asObservable();

  openModal(taskdata?: any){
    this.modalOpen.next(true);
    if(taskdata){
      this.isEditTask.next(taskdata);
    }
  }
  closeModal(){
    this.modalOpen.next(false);
    this.isEditTask.next(null);
  }
}
