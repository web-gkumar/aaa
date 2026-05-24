import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { addCircleOutline, cameraOutline, caretForwardCircle, closeCircleOutline, pencilOutline } from 'ionicons/icons';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Auth } from 'src/app/shared/services/auth';
import { Crud } from 'src/app/shared/services/crud';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class ProfilePage implements OnInit {

  @ViewChild('accordionGroup', { static: true }) accordionGroup!: any;
  profileForm!: FormGroup;
  apiUrl = "https://new-backend-w7jv.onrender.com";
  user: any = {};
  activeTab = 'orders';
  crops: any[] = [];


  constructor(
    private _crudService: Crud,
    private _auth: Auth,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ pencilOutline, closeCircleOutline, cameraOutline, caretForwardCircle, addCircleOutline });
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('profile') || '{}');
    this.profileForm = this.fb.group({
      mobile: [this.user?.mobile || '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      village: [this.user?.village || '', Validators.required],
      district: [this.user?.district || '', Validators.required],
      state: [this.user?.state || '', Validators.required],
      pincode: [this.user?.pincode || '', Validators.required],
      address: [this.user?.address || '', Validators.required],
      country: [this.user?.country || '', Validators.required]
    });
    this.loadOrders();
  }

  onImgError(event: any) {
    event.target.src = 'assets/avatar.png';
  }

  submitProfile() {
    if (this.profileForm.invalid) return;
    this._auth.updateProfile(this.profileForm.value).subscribe((res: any) => {
      this.user = res.user;
    });
  }



  loadOrders() {
    if (this.user._id) {
      this._crudService.getOrders().subscribe((res: any) => {
        if (res.success) {
          this.crops = res.data;
        }
      });
    }
  }

  updateitem(c: any) {
    this.router.navigate(['../update-post', c._id], { relativeTo: this.route });
  }

  removeItem(c: any) {
    if (confirm("Do you really want to delete this item?")) {
      this._crudService.deleteItem(c._id).subscribe((data:any) => {
        this.loadOrders();
      })
    }
  }

}
