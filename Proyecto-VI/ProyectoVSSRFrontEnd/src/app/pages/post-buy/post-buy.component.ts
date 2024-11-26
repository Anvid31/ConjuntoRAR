import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { PostService, Form } from '../../services/post.service';

@Component({
  selector: 'app-post-buy',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './post-buy.component.html',
  styleUrl: './post-buy.component.css'
})
export class PostBuyComponent {
  form: Form = {
    Nombre: '',
    Descripcion: '',
    Cantidad: 0,
    Fecha: '',
  };

  constructor(private postservice: PostService, private router: Router) {}

  onSubmit() {
    if (this.form.Nombre && this.form.Cantidad && this.form.Fecha) {
      this.postservice.sendDataV(this.form).subscribe(
    
        (response) => {
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
