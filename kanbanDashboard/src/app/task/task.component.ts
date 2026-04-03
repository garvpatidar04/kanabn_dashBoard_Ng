import { Component, Input } from '@angular/core';
import { TaskdbService } from '../taskdb.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {

  @Input() taskData : any; 

  constructor(private taskdbService: TaskdbService){}

  deleteT(){
    console.log(this.taskData);
    this.taskdbService.deleteTasks(this.taskData);
  }

}
