import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  salesData: ChartData<'bar'> = {
    labels: [], // Inicialmente vacío, se llenará con las fechas
    datasets: [
      { label: 'Sales', data: [] },
      { label: 'Purchases', data: [] }
    ]
  };

  chartOptions: ChartOptions<'bar'> = {
    responsive: true
  };

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.getSocketData();
  }

  getSocketData() {
    this.socketService.getSocketData().subscribe(
      (data) => {

        // Extraer las cantidades de ventas y gastos
        const salesAmounts = data.venta.map((data: any) => data.cantidad);
        const purchaseAmounts = data.gasto.map((data: any) => data.cantidad);
        const labels = data.gasto.map((data: any) => data.fecha); // Utilizar las fechas como etiquetas
        // Actualizar los datos del gráfico
        this.salesData.labels = labels;
        this.salesData.datasets[0].data = salesAmounts;
        this.salesData.datasets[1].data = purchaseAmounts;
        console.log(this.salesData)
      },
      (error) => {
        console.error('Error al cargar datos:', error);
      }
    );
  }
}