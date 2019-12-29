import { Component, OnInit } from '@angular/core';

interface IMenuItem {
  title: string;
  path: string;
}

const menu: Array<IMenuItem> = [
  { title: 'Start Game', path: 'game/play' },
  { title: 'Scoreboard', path: 'scoreboard' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  menuList: Array<IMenuItem> = menu;
  constructor() {}

  ngOnInit() {}
}
