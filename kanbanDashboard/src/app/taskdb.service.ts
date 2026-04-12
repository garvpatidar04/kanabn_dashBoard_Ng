import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { liveQuery } from 'dexie';
import { db, Task } from '../app/core/db/db'

@Injectable({
  providedIn: 'root'
})

export class TaskdbService {

  tasks$: Observable<Task[]> = from(liveQuery(()=> db.tasks.toArray() ));

  async addTask(newTask: Task) {
    // Dexie handles the "next()" push automatically via liveQuery
    await db.tasks.add(newTask);
  }

  async deleteTasks(taskId: number) {
    // It is safer to delete by ID than by title
    await db.tasks.delete(taskId);
  }


  // private tasks: Task[] = [ 
  //   // sample for testing 
  //   { 
  //   title: "Any", 
  //   description: "delete and start you own task",
  //   status: 'todo'
  //   }
  // ];
  // private taskData = new BehaviorSubject<any[]>(this.tasks);
  // tasks$ = this.taskData.asObservable();

  // addTask(newTask: any){
  //   this.tasks = [...this.tasks, newTask];
  //   this.taskData.next(this.tasks);
  // }

  // deleteTasks(deleteTask: any){
  //   console.log(deleteTask);
  //   this.tasks = this.tasks.filter( t => t.title !== deleteTask.title)
  //   console.log(this.tasks);
  //   this.taskData.next(this.tasks);
  // }


}
