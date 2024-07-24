import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../_services/api.service';
import { TsakFormComponent } from '../tsak-form/tsak-form.component';
import { MatDialog } from '@angular/material/dialog';
import { NgConfirmService } from 'ng-confirm-box';
import { ToastrService } from 'ngx-toastr';

export interface Task {

  assignedTo: string;
  status: string;
  dueDate: string;
  priority: string;
  comment: string;
  position: number;
  id: string
}

@Component({
  selector: 'app-tsak-list',
  templateUrl: './tsak-list.component.html',
  styleUrls: ['./tsak-list.component.scss']

})
export class TsakListComponent implements OnInit {

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  displayedColumns: string[] = ['select', 'assignedTo', 'status', 'dueDate', 'priority', 'comment'];
  dataSource = new MatTableDataSource<Task>;
  selection = new SelectionModel<Task>(true, []);
  totalEntries = 0;
  constructor(
    private api: ApiService,
    private dialog: MatDialog,
    private confirm: NgConfirmService,
    private toast: ToastrService

  ) { }
  ngOnInit(): void {
    this.fetchTasks()
  }

  openDialog(task?: Task) {
    const dialogRef = this.dialog.open(TsakFormComponent, {
      width: '45%',
      height: '60%',
      data: task
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'save' || result === 'update') {
        this.fetchTasks();
      }
    });
  }
  fetchTasks() {
    this.api.getAllTasks().subscribe(
      (data: any) => {
        const tasks = data.allTasks.map((task: any, index: number) => ({
          ...task,
          id: task._id,
          position: index + 1,
          comment: task.comment || 'N/A'
        }));
        this.dataSource.data = tasks;
        this.totalEntries = tasks.length
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
        }
      },
      error => {
        console.error('Error fetching teams', error);
      }
    );
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }


  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  checkboxLabel(row?: Task): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  addNew() {
    this.openDialog();
  }

  editTask(task: Task) {
    this.openDialog(task);
  }
  deleteTask(id: number) {
    this.confirm.showConfirm("Are You Sure Want To Delete ?",
      () => {
        this.api.deleteTask(id).subscribe(res => {
          this.toast.success('Team Deleted Successfully...', 'success');
          this.fetchTasks();
        })
      },
      () => {
      })
  }
  refresh() {
    this.fetchTasks();
  }

}



