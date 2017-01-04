import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TaskService {

    constructor(private http: Http) {
        console.log('Task Service Initalise');
    }

    getTasks() {
        return this.http.get('http://localhost:8080/api/tasks')
            .map(res => res.json());
    }

    addTasks(newTask) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post('http://localhost:8080/api/task', JSON.stringify(newTask), { headers: headers })
            .map(res => res.json());
    }
    deleteTask(taskId) {
        return this.http.delete('http://localhost:8080/api/delete/'+taskId)
            .map(res => res.json());
    }
    updateStatus(_task) {
        console.log(JSON.stringify(_task));
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.put('http://localhost:8080/api/update/'+_task._id, JSON.stringify(_task), { headers: headers })
            .map(res => res.json());
    }
}
