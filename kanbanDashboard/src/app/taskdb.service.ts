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
    await db.tasks.add(newTask);
  }

  async deleteTasks(taskId: number) {
    await db.tasks.delete(taskId);
  }

  async updateTasks(id: number | undefined, status: any){
    const newStatus: 'todo' | 'doing' | 'done' = status
    if(id){
      await db.tasks.update( id, { status: newStatus});
    }
  }

  async updateCompleteTask(id: number | undefined, task: any){
    if(id){
      await db.tasks.update( id, task);
    }
  }

}
