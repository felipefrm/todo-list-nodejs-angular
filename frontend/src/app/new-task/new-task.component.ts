import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  listId: any;

  constructor(private service: TaskService, private route: ActivatedRoute, private router: Router) { }



  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId']
        console.log(this.listId)
      })
  }

  onCancelClick() {
    this.router.navigate([`lists/${this.listId}`])
  }

  createNewTask(name: string) {
    this.service.createTask(name, this.listId).subscribe(task => {
      console.log(task)
      this.router.navigate([`lists/${this.listId}`])
    })
  }

}
