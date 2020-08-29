import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { FirestoreService } from './../../services/firestore.service';
import { Router } from '@angular/router';
Router

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage = '';

  constructor(
    private firestore: FirestoreService,
    private auth: AuthService,
    private router: Router
  ) { }

  createUser(email, password) {
    this.auth.createUser(email, password)
    .then(res => {
      console.log(res);
      this.firestore.addUser(res.user.uid)
      .then(res2 => {        
        this.auth.uid = res.user.uid;
        this.router.navigate(['/oauth']);
      });
    })
    .catch(err => {
      console.log(err)
      if (err.code === 'auth/email-already-in-use') {
        this.auth.signInWithEmailAndPassword(email, password)
        .then(res => { 
          this.auth.uid = res.user.uid;
          this.auth.authenticateUser();
          this.router.navigate(['/oauth']);
        })
        .catch(err => { console.log(err) })
      } else {
        this.errorMessage = err.message;
      }

    })
  }

  ngOnInit(): void {
  }

}
