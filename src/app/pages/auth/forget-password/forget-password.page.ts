import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Auth } from 'src/app/shared/services/auth';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.page.html',
  styleUrls: ['./forget-password.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule,IonicModule, RouterModule, ReactiveFormsModule]
})
export class ForgetPasswordPage implements OnInit {

  resetForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private fb: FormBuilder, private auth: Auth) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  ngOnInit() { }

  onSubmit() {
    if (this.resetForm.invalid) { this.resetForm.markAllAsTouched();
      return;
    }
    this.auth.resetPassword(this.resetForm.value).subscribe(res => {
      alert('Password reset instructions sent to your email.');
      this.resetForm.reset();
    });

  }
}
