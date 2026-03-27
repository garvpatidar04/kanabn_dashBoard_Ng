import { Component, Input } from '@angular/core';
import { ModalserviceService } from '../modalservice.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isOpen: boolean = false;

  constructor(private modalservice: ModalserviceService){ }

  ngOnInit(){
    this.loadModal();
  }

  loadModal(){
    this.modalservice.modalUse.subscribe(value=>{
      this.isOpen = value;
    })
  }

  triggerModal(){
    this.modalservice.closeModal();
    this.loadModal();
  }

}
