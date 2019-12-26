import { Component, OnInit } from "@angular/core";

interface menuItem {
  title: string;
  path: string;
}

const menu: Array<menuItem> = [
  { title: "Start Game", path: "game" },
  { title: "Scoreboard", path: "scoreboard" }
];

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  menuList: Array<menuItem> = menu;
  constructor() {}

  ngOnInit() {}
}
