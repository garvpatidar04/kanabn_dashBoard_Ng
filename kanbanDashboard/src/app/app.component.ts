import { Component } from '@angular/core';
import { ModalserviceService } from './modalservice.service';
import { TaskdbService } from './taskdb.service';
import { Task } from '../app/core/db/db'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanbanDashboard';
  todo: Task[] = [];
  doing: Task[] = [];
  done: Task[] = [];



  constructor(private modalservice: ModalserviceService, private taskdb: TaskdbService){}

  triggerModal(){
    this.modalservice.openModal();
  }

  ngOnInit(){
    this.loadTask();
  }

  loadTask(){
    this.taskdb.tasks$.subscribe(value=>{
      this.todo = value.filter( t => t.status === 'todo');
      this.doing = value.filter( t => t.status === 'doing');
      this.done = value.filter( t => t.status === 'done');
    })
  }
}
