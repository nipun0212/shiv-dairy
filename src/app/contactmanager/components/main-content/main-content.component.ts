import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {
  user:User;
  constructor(
    private route:ActivatedRoute,
    private service:UserService
  
  ) { }

  ngOnInit() {

    this.route.params.subscribe(params=>{
      let id= params['id'];
      if (!id) id = 1;
      this.service.users.subscribe(users=>{
        if(users.length==0) return;
        this.user = this.service.userByID(id);

      })
    })
  }

}
