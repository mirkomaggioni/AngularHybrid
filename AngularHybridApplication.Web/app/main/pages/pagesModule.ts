import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { UIRouterUpgradeModule } from "@uirouter/angular-hybrid";
import { PagesComponent } from "./pagesComponent";

export let CONTACTS_STATES = [
  {
    name: "home.pages",
    url: "/pages",
    component: PagesComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UIRouterUpgradeModule.forChild({ states: CONTACTS_STATES }),
  ],
  declarations: [PagesComponent],
})
class PagesModule { }

export { PagesModule };
