import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.css']
})
export class NewListComponent implements OnInit {

  constructor(private service: TaskService, private router: Router) { }

  ngOnInit(): void {
  }

  createNewList(name: string) {
    this.service.createList(name).subscribe(response => {
      console.log(response)
      this.router.navigate(['/lists', response])
    })
  }

}
