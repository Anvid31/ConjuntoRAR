import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Form, PostService } from '../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent {
  form: Form = {
    Nombre: '',
    Descripcion: '',
    Cantidad: 0,
    Fecha: '',
  };

  constructor(private postservice: PostService, private router: Router) {}

  onSubmit() {
    if (this.form.Nombre && this.form.Cantidad && this.form.Fecha) {
      this.postservice.sendData(this.form).subscribe(
        
        (response) => {
          console.log('Data sent successfully', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error sending data', error);
          console.log(this.form)

        }
      );
    }
  }

  
  
}
