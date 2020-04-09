import { UpgradeModule } from '@angular/upgrade/static';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterUpgradeModule } from '@uirouter/angular-hybrid';
import angularjsAppModule from './angularjsAppModule'

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    UIRouterUpgradeModule.forRoot()
  ]
})
export class AngularAppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    console.log("Angularjs Module Launch");
    this.upgrade.bootstrap(document.body, [angularjsAppModule]);
  }
}
