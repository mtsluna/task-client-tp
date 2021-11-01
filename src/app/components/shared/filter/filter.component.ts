import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  types: string[] = [
    'Finanzas',
    'Administrativa',
    'Personal',
    'Comunicación',
    'Otros'
  ]

  searchForm: FormGroup = this.fb.group({
    title: [''],
    type: [''],
  });

  @Output() filterEvent = new EventEmitter<string>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  search() {
    this.filterEvent.emit(this.searchForm.getRawValue())
  }

}
