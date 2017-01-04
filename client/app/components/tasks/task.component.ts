import { Component } from '@angular/core';
import {TaskService} from '../../services/task.service';
import { Task } from './task';
@Component({
    moduleId: module.id,
    selector: 'tasks',
    templateUrl: 'task.component.html',
})
export class TaskComponent {
    tasks: Task[];

    constructor(private taskService: TaskService) {
        this.taskService.getTasks()
            .subscribe(tasks => {
                //console.log(tasks);
                this.tasks = tasks;
            });
    }

    addTask(event) {
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        };
        this.taskService.addTasks(newTask)
            .subscribe(task => {
                this.tasks.push(task);
            });
    }

    deleteTask(task) {
        this.taskService.deleteTask(task._id)
            .subscribe(data => {
               if(data){
                   this.tasks.splice(this.tasks.indexOf(task), 1);
               }
            });
    }


    updateStatus(task) {
        var _task = {
            _id : task._id,
            title: task.title,
            isDone: task.isDone
        };
        console.log(JSON.stringify(_task));
        this.taskService.updateStatus(_task)
            .subscribe(data => {
              //
              console.log(JSON.stringify(data));
            });
    }
}
