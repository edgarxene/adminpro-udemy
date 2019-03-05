import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('inputProgreso') inputProgreso: ElementRef;


  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValorPadre: EventEmitter<number> = new EventEmitter();

  constructor() {
   }

  ngOnInit() {
    console.log('Leyenda: ', this.leyenda);
    console.log('progreso: ', this.progreso);
  }

  onChanges(newValue: number) {

    // let elementoHtml: any = document.getElementsByName('progreso')[0];
    // console.log(elementoHtml.value);

    if ( newValue >= 100 ) {
      this.progreso = 100;
    } else if ( newValue <= 0 ) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    this.inputProgreso.nativeElement.value = this.progreso;

    // elementoHtml.value = this.progreso;
    this.cambioValorPadre.emit(this.progreso);
  }

  cambiarValor( valor: number ) {
    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + valor;

    this.cambioValorPadre.emit(this.progreso);

    this.inputProgreso.nativeElement.focus();
  }

}
