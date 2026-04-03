import { Component } from '@angular/core';
import { ModalserviceService } from './modalservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanbanDashboard';

  constructor(private modalService: ModalserviceService){}

  triggerModal(): void{
    this.modalService.open();
  }
}
