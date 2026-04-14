import { Component, Input } from '@angular/core';
import { TaskdbService } from '../taskdb.service';
import { ModalComponent } from '../modal/modal.component';
import { ModalserviceService } from '../modalservice.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() taskData : any; 

  constructor(private taskdbService: TaskdbService, private modalservice: ModalserviceService){}

  deleteT(id: number){
    this.taskdbService.deleteTasks(id);
  }

  editT(task : any){
    this.modalservice.openModal(task);
  }

}
