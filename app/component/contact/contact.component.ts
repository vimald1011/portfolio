import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MongoService } from '../../services/mongo.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  isLoading = false;
  isSuccess = false;
  isError = false;
  constructor(private mongoService: MongoService) {}

  contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    number: new FormControl('', [Validators.pattern('^[0-9]{10}$')]),
    message: new FormControl(''),
  });

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.isLoading = true;

    const formData = this.contactForm.value;

    this.mongoService.submitContact(formData).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.isSuccess = true;
        setTimeout(() => {
          this.isSuccess = false;
        }, 2000);
        this.contactForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        alert('Submission failed.');
      },
    });
  }
}
