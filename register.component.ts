// imported items form angular core

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm} from '@angular/forms';
// imported service
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  //  properties and variables
  isLoading = false;
  // subscription
  private authStatusSub: Subscription;

  // injected service into the constructor
  constructor( public authService: AuthService ) { }

  ngOnInit() {
    // when the compoent is loaded then it sets teh is located to false
    this.authStatusSub = this.authService.getAuthStatusListener().subscribe(
      authStatus => {
        this.isLoading = false;
      }
    );
  }

//  There are two functions the on register will use the template form to grab data

  onRegister(form: NgForm) {
    // console.log(form.value.name);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.createUser( form.value.email, form.value.password);
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }

}
