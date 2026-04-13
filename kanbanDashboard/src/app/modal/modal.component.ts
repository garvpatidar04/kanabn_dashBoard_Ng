import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalserviceService } from '../modalservice.service';
import { TaskdbService } from '../taskdb.service';
import { Task } from '../core/db/db'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isOpen: boolean = false;

  taskForm = new FormGroup({
    title : new FormControl('', [Validators.required, Validators.minLength(2)]),
    description : new FormControl('', [Validators.required]),
    status : new FormControl('', [Validators.required]),
  });

  constructor(private modalservice: ModalserviceService, private taskdb: TaskdbService){ 

  }

  ngOnInit(){
    this.loadModal();
  }

  loadModal(){
    this.modalservice.modalUse.subscribe(value=>{
      this.isOpen = value;
    })
  }

  triggerModal(){
    this.modalservice.closeModal();
    this.loadModal();
  }

  addTaskS(){
    const formvalue = this.taskForm.value;
    const newTask: Task = {
      title: formvalue.title ?? '',
      description: formvalue.description ?? '',
      status: (formvalue.status as 'todo' | 'doing' | 'done') ?? 'todo',
      createdAt: Date.now()
    }
    this.taskdb.addTask(newTask);
  }

  onSubmit():void{
    this.addTaskS();
    this.taskForm.reset();
    this.triggerModal();
  }

}
