import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "start-menu",
    loadChildren: () => import("./home/home.module").then(m => m.HomeModule)
  },
  {
    // matches all non-matching paths to redirect to menu screen
    path: "",
    redirectTo: "start-menu",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
