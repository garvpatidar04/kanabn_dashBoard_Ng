import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Task{
  title: string,
  desc: string,
  status: "todo" | "doing" | "done" ;
}

@Injectable({
  providedIn: 'root'
})

export class TaskdbService {
  private tasks: Task[] = [ 
    { 
    title: "This is title", 
    desc: "this is how task will look",
    status: 'doing'
    },
    { 
    title: "This is title", 
    desc: "this is how task will look",
    status: 'todo'
    },
    { 
    title: "This is title", 
    desc: "this is how task will look",
    status: 'doing'
    },
    { 
    title: "This is title", 
    desc: "this is how task will look",
    status: 'done'
    },
  ];
  private taskData = new BehaviorSubject<any[]>(this.tasks);
  tasks$ = this.taskData.asObservable();

  addTask(newTask: any){
    this.tasks = [...this.tasks, newTask];
    this.taskData.next(this.tasks);
  }

}
