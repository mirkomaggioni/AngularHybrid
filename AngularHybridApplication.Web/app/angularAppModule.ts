import { UpgradeModule } from '@angular/upgrade/static';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterUpgradeModule, NgHybridStateDeclaration } from '@uirouter/angular-hybrid';
import { angularjsAppModule } from './angularjsAppModule';

export const pagesState: NgHybridStateDeclaration = {
  name: 'home.pages.**',
  url: '/pages',
  loadChildren: () => import('./main/pages/pagesModule').then(m => m.PagesModule)
};

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule,
    UIRouterUpgradeModule.forRoot({ states: [pagesState] })
  ]
})

export class AngularAppModule {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, [angularjsAppModule.name], { strictDi: true });
  }
}
