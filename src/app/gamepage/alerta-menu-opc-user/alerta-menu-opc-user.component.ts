import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alerta-menu-opc-user',
  templateUrl: './alerta-menu-opc-user.component.html',
  styleUrls: ['./alerta-menu-opc-user.component.css'],
})
export class AlertaMenuOpcUserComponent implements OnInit {
  @Output() closeAlert = new EventEmitter<number>();
  @Input() typeAlert: number;
  constructor() {}

  ngOnInit(): void {}

  onActionMenuChild() {
    this.closeAlert.emit(0);
  }
}
