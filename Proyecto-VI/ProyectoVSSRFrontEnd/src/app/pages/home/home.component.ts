import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  data: any[] = [];
  data2: any[] = [];
  totalGastos: number = 0;
  totalVentas: number = 0;
  totalActual: number = 0;

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.getSocket();
  }

  getSocket() {
    this.socketService.getSocketData().subscribe(
      (data) => {
        this.data = data.gasto;
        this.data2 = data.venta;
        this.calcularTotales();
      },
      (error) => {
        console.error('Error al cargar datos:', error); 
      }
    );
  }

  calcularTotales() {
    this.totalGastos = this.data.reduce((sum, item) => sum + Number(item.cantidad), 0);
    this.totalVentas = this.data2.reduce((sum, item) => sum + Number(item.cantidad), 0);
    this.totalActual = this.totalVentas - this.totalGastos;
  }
}
