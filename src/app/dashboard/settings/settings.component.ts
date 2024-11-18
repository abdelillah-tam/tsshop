import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userSelector } from '../../store/selectors';
import { User } from '../../model/user';
import { getUserAction } from '../../store/actions';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent implements OnInit {
  currentUser: User | undefined;

  constructor(private store: Store) {
  }

  ngOnInit(): void {}
}
