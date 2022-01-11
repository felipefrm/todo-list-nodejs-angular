import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListsComponent } from './lists/lists.component';
import { NewListComponent } from './new-list/new-list.component';
import { NewTaskComponent } from './new-task/new-task.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'lists', component: ListsComponent, canActivate: [AuthGuard]},
  { path: 'lists/:listId', component: ListsComponent, canActivate: [AuthGuard]},
  { path: 'lists/:listId/new-task', component: NewTaskComponent, canActivate: [AuthGuard]},
  { path: 'new-list', component: NewListComponent, canActivate: [AuthGuard]},
  { path: 'edit-list/:listId', component: EditListComponent, canActivate: [AuthGuard]},
  { path: 'lists/:listId/edit-task/:taskId', component: EditTaskComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
