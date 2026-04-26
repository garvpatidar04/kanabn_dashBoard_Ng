import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalserviceService } from '../modalservice.service';
import { TaskdbService } from '../taskdb.service';
import { Task } from '../core/db/db'
import { v4 as uuidv4 } from 'uuid';
import { NIL as NIL_UUID } from 'uuid';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isOpen: boolean = false;
  isEdit: boolean = false;
  _id: string = NIL_UUID;
  timestamp: number = Date.now();

  taskForm = new FormGroup({
    title : new FormControl('', [Validators.required, Validators.minLength(2)]),
    description : new FormControl('', [Validators.required]),
    status : new FormControl('', [Validators.required]),
  });

  constructor(private modalservice: ModalserviceService, private taskdb: TaskdbService){ 
    modalservice.editUse.subscribe(value => {
      if(value){
        this.taskForm.patchValue(value);
        this._id = value._id;
        this.timestamp = value.createdAt;
        this.isEdit = true;
      }else{
        this.isEdit = false;
      }
    })
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
    if(this.isEdit){
      const newTask: Task = {
        _id: this._id,
        title: formvalue.title ?? '',
        description: formvalue.description ?? '',
        status: (formvalue.status as 'todo' | 'doing' | 'done') ?? 'todo',
        createdAt: this.timestamp
      }
      this.taskdb.updateCompleteTask(newTask)
    }else{
      const newTask: Task = {
        _id: uuidv4(),
        title: formvalue.title ?? '',
        description: formvalue.description ?? '',
        status: (formvalue.status as 'todo' | 'doing' | 'done') ?? 'todo',
        createdAt: Date.now()
      }
      this.taskdb.addTask(newTask);
    }
  }

  onSubmit():void{
    this.addTaskS();
    this.taskForm.reset();
    this.triggerModal();
  }

}
