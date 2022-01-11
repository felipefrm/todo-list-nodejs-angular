import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Globals } from './globals/globals';
// import { Lists } from './lists/lists.component';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, private globals: Globals) { }

  createList(name: string): Observable<any> {
    return this.http.post("http://localhost:3000/lists", { name }, this.header())
  }

  getLists() {
    return this.http.get("http://localhost:3000/lists", this.header())
  }

  updateList(listId: number, name: string) {
    return this.http.put('http://localhost:3000/lists/' + listId, { name }, this.header())
  }

  deleteList(listId: number) {
    return this.http.delete('http://localhost:3000/lists/' + listId, this.header())
  }

  createTask(name: string, listId: string): Observable<any> {
    return this.http.post("http://localhost:3000/tasks", { description: name, listId }, this.header())
  }

  getTasks(listId: number) {
    return this.http.get('http://localhost:3000/lists/' + listId, this.header())
  }

  doneTask(task: { id: number; status: string }) {
    return this.http.put('http://localhost:3000/tasks/' + task.id,
    { status: task.status == "done" ? "todo" : "done" }, this.header())
  }

  updateTask(taskId: number, description: string) {
    return this.http.put('http://localhost:3000/tasks/' + taskId, { description }, this.header())
  }

  deleteTask(taskId: number) {
    return this.http.delete('http://localhost:3000/tasks/' + taskId, this.header())
  }

  header() {
    return {
        headers: new HttpHeaders({
                  'Content-Type': 'application/json',
                  'x-access-token': this.globals.loginData.token
                  })
    }
  }
}
