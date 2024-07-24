import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TsakListComponent } from '../tsak-list/tsak-list.component';
import { ApiService } from '../_services/api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-tsak-form',
  templateUrl: './tsak-form.component.html',
  styleUrls: ['./tsak-form.component.scss']
})
export class TsakFormComponent implements OnInit {

  taskForm!: FormGroup;
  public taskPriority = ['Normal', 'High', 'Highest'];
  public taskAsignedTo = ["user-1", "user-2", "user-3", "user-4", "user-5"];
  public taskStatus = ["Pending", "In Progress", "Done"]

  actionBtn: string = "Create";
  minDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private toast: ToastrService,
    private router: Router,
    // private teamService: TeamService,
    private dialogRef: MatDialogRef<TsakListComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      assignedTo: ['', [Validators.required]],
      status: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      comment: ['', [Validators.required]],

    })

    if (this.editData) {
      this.actionBtn = "Update";
      this.taskForm.patchValue({
        assignedTo: this.editData.assignedTo,
        status: this.editData.status,
        dueDate: this.editData.dueDate,
        priority: this.editData.priority,
        comment: this.editData.comment
      });
    }
  }

  addTask() {
    if (!this.editData) {
      if (this.taskForm.valid) {
        this.api.addTask(this.taskForm.value)
          .subscribe({
            next: (res: any) => {
              this.toast.success("Task Added SUccessfully..", "Success")
              this.taskForm.reset()
              this.dialogRef.close('save');
            },
            error: () => {
              this.toast.error("Something Went Wrong!", "Error")
            }
          })
      }
    } else {
      this.updateTask()
    }
  }

  updateTask() {
    console.log("dats", this.editData.id);

    this.api.updateTask(this.editData.id, this.taskForm.value).subscribe({
      next: () => {
        this.toast.success("Task updated successfully.", "Success");
        this.dialogRef.close('update');

      },
      error: () => {
        this.toast.error("Failed to update task.", "Error");
      }
    })
  }
}
