import { Component } from '@angular/core';
import { ModalserviceService } from './modalservice.service';
import { TaskdbService } from './taskdb.service';

interface Task{
  title: string,
  desc: string,
  status: "todo" | "doing" | "done" ;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanbanDashboard';
  tasks: Task[] = [];


  constructor(private modalservice: ModalserviceService, private taskdb: TaskdbService){}

  triggerModal(){
    this.modalservice.openModal();
  }

  ngOnInit(){
    this.loadTask();
  }

  loadTask(){
    this.taskdb.tasks$.subscribe(value=>{
      this.tasks = value;
    })
  }

  filteredTask(status: string): Task[]{
    return this.tasks.filter( t => t.status === status);
  }

}
