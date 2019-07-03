import { Component, ViewChild, ElementRef } from '@angular/core';
import { ToDo } from './models/to-do.model';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  timeOutBusqueda = -1;
  isNew = false;
  toDoList: ToDo[] = [];
  ToDo: ToDo = new ToDo();

  ToDoTmp: ToDo = new ToDo();

  @ViewChild('title') txtTitle: ElementRef;
  constructor(
    private todoService: TodoService
  ) {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getAll().subscribe((todos: ToDo[] ) => {
      this.toDoList = todos;
    });
  }

  edit( toDo: ToDo ) {
    this.ToDoTmp = Object.assign({}, toDo);

    this.ToDo = toDo;
    this.isNew = false;
    this.setFocusOnTitle();
  }

  cancelEdit() {
    this.replaceItem(this.ToDoTmp);
  }

  new() {
    this.ToDo = new ToDo();
    this.isNew = true;
    this.setFocusOnTitle();
  }

  save() {
    if ( this.isNew) {
      this.todoService.create(this.ToDo).subscribe((todo: ToDo) => {
        if ( todo ) {
          this.toDoList.push(todo);
        }
      });
    } else {
      this.todoService.update(this.ToDo._id, this.ToDo).subscribe((todo: ToDo) => {
        if ( todo ) {
          this.replaceItem(todo);
        }
      });
    }
  }

  delete(todo: ToDo) {
    this.todoService.delete(todo._id).subscribe(() => {
      const index = this.toDoList.findIndex( x => x._id === todo._id);
      this.toDoList.splice(index, 1);
    });
  }

  search(termino) {
    if ( termino.length <= 0 ) {

      this.loadTodos();

    } else {
      if ( this.timeOutBusqueda !== -1) {
        window.clearTimeout(this.timeOutBusqueda);
      }

      this.timeOutBusqueda = window.setTimeout(() => {

        this.timeOutBusqueda = -1;

        this.todoService.search( termino ).subscribe( (todo: ToDo[]) => {
          this.toDoList = todo;
        });
      }, 300);
    }
  }

  setFocusOnTitle() {
    window.setTimeout(() => {
      this.txtTitle.nativeElement.focus();
    }, 700);
  }

  replaceItem(todo: ToDo) {
    const index = this.toDoList.findIndex( x => x._id === todo._id);
    this.toDoList[index] = todo;
  }
}
