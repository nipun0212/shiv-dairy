import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {Note} from '../../models/note';
import { MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  displayedColumns = ['id', 'title', 'date'];
  dataSource:MatTableDataSource<Note>;
  constructor() { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() notes:Note[];
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    console.log(this.notes)
    this.dataSource = new MatTableDataSource(this.notes);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}
