import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { ModalserviceService } from '../modalservice.service';
import { TaskdbService } from '../taskdb.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  isOpen: boolean = false;

  taskForm = new FormGroup({
    title : new FormControl(),
    desc : new FormControl()
  })

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

  onSubmit():void{
    console.log('Submitted Form');
    console.log(this.taskForm.value);
    this.taskdb.addTask(this.taskForm.value);
    this.taskForm.reset();
    this.triggerModal();
  }

}
