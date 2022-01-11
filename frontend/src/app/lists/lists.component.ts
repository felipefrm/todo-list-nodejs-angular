import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})

export class ListsComponent implements OnInit {

  lists: any;
  tasks: any;
  selectedListId: any;

  constructor(private service: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (params['listId']) {
        this.selectedListId = params['listId']
        this.service.getTasks(params['listId']).subscribe((tasks) => {
          console.log(tasks)
          this.tasks = tasks
        })
      } else {
        this.tasks = undefined
      }
    })

    this.service.getLists().subscribe(lists => {
      this.lists = lists;
      console.log(lists)
    })
  }

  onTaskClick(task: any) {
    console.log(task)
    this.service.doneTask(task).subscribe(() => {
      console.log('Done task!')
      task.status = task.status == "done" ? "todo" : "done"
    })
  }

  onDeleteListClick() {
    this.service.deleteList(this.selectedListId).subscribe((response) => {
      console.log(response)
      this.router.navigate(['/lists'])
    })
  }

  onDeleteTaskClick(taskId: number) {
    this.service.deleteTask(taskId).subscribe((response) => {
      console.log(response)
      this.tasks = this.tasks.filter((task: { id: number; }) => {
        return task.id !== taskId;
      })
    })
  }
}
