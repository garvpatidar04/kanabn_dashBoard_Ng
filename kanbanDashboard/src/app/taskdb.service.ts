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
    // sample for testing 
    { 
    title: "Any", 
    desc: "delete and start you own task",
    status: 'todo'
    }
  ];
  private taskData = new BehaviorSubject<any[]>(this.tasks);
  tasks$ = this.taskData.asObservable();

  addTask(newTask: any){
    this.tasks = [...this.tasks, newTask];
    this.taskData.next(this.tasks);
  }

  deleteTasks(deleteTask: any){
    console.log(deleteTask);
    this.tasks = this.tasks.filter( t => t.title !== deleteTask.title)
    console.log(this.tasks);
    this.taskData.next(this.tasks);
  }


}
