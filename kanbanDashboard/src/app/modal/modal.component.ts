import { Component, Input } from '@angular/core';
import { ModalserviceService } from '../modalservice.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(private modalService: ModalserviceService){}

  isOpen: boolean = false;

  ngOnInit(): void {
    this.loadModal();
  }

  loadModal(): void{
    this.modalService.watchModal.subscribe(value => {
      this.isOpen = value;
    });
  }

  triggerModal():void{
    this.modalService.close();
    this.loadModal();
  }

}
