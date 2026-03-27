import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskdbService {
  private tasks = [ { title: "This is title", desc: "this is how task will look"}];
  private taskData = new BehaviorSubject<any[]>(this.tasks);
  tasks$ = this.taskData.asObservable();

  addTask(newTask: any){
    this.tasks = [...this.tasks, newTask];
    this.taskData.next(this.tasks);
  }

}
