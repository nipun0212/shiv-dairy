import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from '../../models/user';
import { FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.css']
})
export class NewContactDialogComponent implements OnInit {

  user:User;
  constructor(private dialofRef: MatDialogRef<NewContactDialogComponent>) { }

  ngOnInit() {
    this.user = new User();
  }
  save(){
    this.dialofRef.close(this.user);
  }

  dismiss(){
      this.dialofRef.close(null);
  }

  name = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' :'';
  }
}
