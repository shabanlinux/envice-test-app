import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: any = [];

  constructor(
    private router: Router,
    private _userService: UserService,
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._userService
      .list()
      .subscribe(
        (res: any) => {
          this.users = res.payload
        },
        err => {
          console.log(err);
        }
      );
  }

  confirm(contact: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.delete(contact);
      }
    })
    
  }

  delete(data: any) {
    const params = {contact: data};
    
    this._userService
      .delete(params)
      .subscribe(
        (res: any) => {
          this.users();
          this.sweetAlert({icon: 'success', title: 'DELETED!!!', text: 'Account Deleted Successfully'});
        },
        err => {
          this.sweetAlert({icon: 'error', title: 'OOPS!!!', text: err.message});
        }
      );
  }

  sweetAlert(data: any) {
    Swal.fire({
      icon: data.icon,
      title: data.title,
      text: data.text,
    });
  }

}
