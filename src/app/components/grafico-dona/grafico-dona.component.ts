import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input()  doughnutChartLabels: string[] = [];
  @Input() doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';

  constructor() {
    console.log('Constructor: ', this.doughnutChartData, this.doughnutChartLabels);
   }

  ngOnInit() {
    console.log('Init: ', this.doughnutChartData,  this.doughnutChartLabels);

  }

}
