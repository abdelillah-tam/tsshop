import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userTokenValidationAction } from '../store/actions';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private store: Store){}
  
  ngOnInit(): void {
    this.store.dispatch(userTokenValidationAction());
  }


}
