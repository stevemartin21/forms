import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:no-unused-expression
import { NgForm} from '@angular/forms';
// imported service
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;

  // injected service into component

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  // grabbed the form data and sent it onto the service with the values
  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }

}
