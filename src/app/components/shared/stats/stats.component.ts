import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subscription, zip} from "rxjs";
import {TaskService} from "../../../services/tasks/task.service";
import {Task} from "../../../models/Tasks";

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  dataState: any;
  dataType: any;

  chartOptions: any;

  sch: Task[] = [];
  ove: Task[] = []

  constructor(private taskService: TaskService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    const pSch = this.taskService.getAll("scheduled").toPromise()
    const pOve = this.taskService.getAll("overdue").toPromise()
    Promise.all([pSch, pOve]).then((data) => {
      const [A, B] = data;
      this.sch = A;
      this.ove = B;
      this.buildDataState();
      this.buildDataType();
    })
  }

  buildDataState() {
    this.dataState = {
      datasets: [{
        data: [
          this.sch.length,
          this.ove.length,
        ],
        backgroundColor: [
          "#aafc51",
          "#ff4545",
        ],
        label: 'My dataset'
      }],
      labels: [
        "Tareas programadas",
        "Tareas vencidas",
      ]
    };
  }

  buildDataType() {
    const counter: any = {}
    console.log(this.sch.concat(this.ove))
    this.sch.concat(this.ove).forEach((value) => {
      if(value.type){
        if(counter[value.type] == undefined){
          counter[value.type] = 1
        }
        else{
          counter[value.type]++
        }
        console.log(counter)
      }
    })

    const lengths: number[] = []
    const colors: string[] = []
    Object.keys(counter).forEach((value) => {
      lengths.push(counter[value])
      colors.push('#'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'))
    })

    this.dataType = {
      datasets: [{
        data: lengths,
        backgroundColor: colors,
        label: 'My dataset'
      }],
      labels: Object.keys(counter)
    };
  }

}
