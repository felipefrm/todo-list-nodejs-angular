import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.css']
})
export class EditListComponent implements OnInit {
  listId: any;

  constructor(private service: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listId = params['listId'];
    })
  }

  onCancelClick() {
    this.router.navigate(['/lists', this.listId])
  }

  updateList(name: string) {
    this.service.updateList(this.listId, name).subscribe(() => {
      this.router.navigate(['/lists', this.listId])
    })
  }
}
