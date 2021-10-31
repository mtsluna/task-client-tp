import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task,Tasks} from "../../models/Tasks";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  BASE_URL = 'https://sandez.herokuapp.com/api/'

  constructor(private http: HttpClient) { }

  getAll(type: string): Observable<Task[]> {
    let q = "";
    if(type === 'scheduled'){
      q = `{"due_date":{"$gte": "${new Date().toISOString()}"}}`
    } else {
      q = `{"due_date":{"$lte": "${new Date().toISOString()}"}}`
    }
    return this.http.get<Tasks>(this.BASE_URL+'task?q='+q).pipe(
      map((value: Tasks) => {
        return value.data;
      })
    );
  }

  getOne(id: number): Observable<Task> {
    return this.http.get<Task>(this.BASE_URL+'task/'+id);
  }

  newTask(task: Task) {
    return this.http.post(this.BASE_URL+'task',task,{ observe: 'response'});
  }

  update(task: Task, id: string) {
    return this.http.put(this.BASE_URL+'task/'+id,task,{ observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete(this.BASE_URL+'task/'+id,{observe: 'response'});
  }

  searchStruct() {
    const struct = {
      "title": [
        "$regex"
      ],
      "user_id": [
        "$eq"
      ],
      "creation_date": [
        "$gt",
        "$gte",
        "$lt",
        "$lte"
      ],
      "due_date": [
        "$gt",
        "$gte",
        "$lt",
        "$lte"
      ]
    }
    return struct;
  }
}
