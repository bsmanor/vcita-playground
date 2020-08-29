import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  @Input() clients$: any[];

  constructor() { }

  trackByMethod(index:number, el:any): number {
    return el.id;
  }

  ngOnInit(): void {
  }

}
