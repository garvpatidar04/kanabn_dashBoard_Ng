import { Component, Input} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskdbService } from '../taskdb.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent {

  @Input() heading: string = '';
  @Input() tasks: any[] = [];
  @Input() status: string = "";

  constructor( private taskdbService: TaskdbService){}

  drop(event: CdkDragDrop<string[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }else{
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      const movedTask: any = event.container.data[event.currentIndex];
      movedTask.status = this.status;
      this.taskdbService.updateTasks(movedTask.id, this.status);
    }
  }

}
