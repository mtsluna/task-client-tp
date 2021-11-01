import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Task, Tasks} from "../../models/Tasks";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  BASE_URL = 'http://localhost:8080/api/'

  constructor(private http: HttpClient) {
  }

  getAll(type: string, filter?: { title: string, type: string }): Observable<Task[]> {
    let q = "";
    if (type === 'scheduled') {
      q = `{"$and": [{"due_date":{"$gte": "${new Date().toISOString()}"}}${this.searchQuery(filter)}]}`
    } else {
      q = `{"$and": [{"due_date":{"$lte": "${new Date().toISOString()}"}}${this.searchQuery(filter)}]}`
    }
    return this.http.get<Tasks>(this.BASE_URL + 'task?q=' + q).pipe(
      map((value: Tasks) => {
        return value.data;
      })
    );
  }

  getAllInterval(filter?: { from: string, to: string }): Observable<Task[]> {
    let q = `{"$and": [${this.searchInterval(filter)}]}`;
    return this.http.get<Tasks>(this.BASE_URL + 'task?q=' + q).pipe(
      map((value: Tasks) => {
        return value.data;
      })
    );
  }

  searchInterval(filter?: { from: string, to: string }) {
    if (filter) {
      let query = `, {"creation_date": {"$gte": "${filter.from}"}}`
      query = query.concat(`, {"creation_date": {"$lte": "${filter.to}"}}`)
      return query;
    }
    return '';
  }

  searchQuery(filter?: { title: string, type: string }) {
    if (filter) {
      let query = `, {"title": {"$regex": "${filter.title}"}}`
      if(filter.type !== 'Todas' && filter.type !== "") {
        console.log(filter)
        console.log(filter.type)
        query = query.concat(`, {"type": {"$regex": "${filter.type}"}}`)
      }
      return query;
    }
    return '';
  }

  getOne(id: number): Observable<Task> {
    return this.http.get<Task>(this.BASE_URL + 'task/' + id);
  }

  newTask(task: Task) {
    return this.http.post(this.BASE_URL + 'task', task, {observe: 'response'});
  }

  update(task: Task, id: string) {
    return this.http.put(this.BASE_URL + 'task/' + id, task, {observe: 'response'});
  }

  delete(id: string) {
    return this.http.delete(this.BASE_URL + 'task/' + id, {observe: 'response'});
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
