import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { liveQuery } from 'dexie';
import { db, Task, SyncDB } from '../app/core/db/db'
import { v4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class TaskdbService {

  tasks$: Observable<Task[]> = from(liveQuery(()=> db.tasks.toArray() ));

  async addTask(newTask: Task) {
    await db.tasks.add(newTask);
    const syncTask: SyncDB = {
      syncID: v4(),
      action: 'create',
      payload: newTask,
      status: 'pending',
      retryCount: 0,
      createdAt: Date.now()
    }
    await db.syncQueue.add(syncTask)
  }

  async deleteTasks(taskId: string) {
    await db.tasks.delete(taskId);
    const syncTask: SyncDB = {
      syncID: v4(),
      action: 'delete',
      payload: { _id: taskId } as Task,
      status: 'pending',
      retryCount: 0,
      createdAt: Date.now()
    }
    await db.syncQueue.add(syncTask)
  }

  async updateTasks(_id: string | undefined, status: any){
    const newStatus: 'todo' | 'doing' | 'done' = status
    if(_id){
      await db.tasks.update( _id, { status: newStatus});
      const updatedTask = await db.tasks.get(_id);
      if(updatedTask){
        const syncTask: SyncDB = {
          syncID: v4(),
          action: 'update',
          payload: updatedTask,
          status: 'pending',
          retryCount: 0,
          createdAt: Date.now()
        }
        await db.syncQueue.add(syncTask)
      }
    }
  }

  async updateCompleteTask(task: any){
    await db.tasks.update(task._id, task);
    const updatedTask = await db.tasks.get(task._id);
      if(updatedTask){
        const syncTask: SyncDB = {
          syncID: v4(),
          action: 'update',
          payload: updatedTask,
          status: 'pending',
          retryCount: 0,
          createdAt: Date.now()
        }
        await db.syncQueue.add(syncTask)
      }
  }

}
