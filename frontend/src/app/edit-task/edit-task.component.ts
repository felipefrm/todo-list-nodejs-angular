import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  taskId: any;
  listId: any;

  constructor(private service: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.taskId = params['taskId'];
      this.listId = params['listid']
      console.log(params)
    })
  }

  onCancelClick() {
    this.router.navigate(['../../'], {relativeTo: this.route})
  }

  updateTask(name: string) {
    this.service.updateTask(this.taskId, name).subscribe(() => {
      this.router.navigate(['../../'], {relativeTo: this.route})
    })
  }

}
