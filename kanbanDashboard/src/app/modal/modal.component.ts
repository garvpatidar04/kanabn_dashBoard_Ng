import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() isOpen: boolean = false;

  mousehit(): void{
    console.log('hit');
    // do the logic here 
  }

}
