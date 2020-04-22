import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AngularAppModule } from './angularAppModule';
import { angularjsAppModule } from './angularjsAppModule';
import { UIRouter, UrlService } from '@uirouter/core';
import { NgZone } from '@angular/core';

angularjsAppModule.config(['$urlServiceProvider', ($urlService: UrlService) => $urlService.deferIntercept()]);

platformBrowserDynamic().bootstrapModule(AngularAppModule).then(function (platformRef) {
  const urlService: UrlService = platformRef.injector.get(UIRouter).urlService;

  function startUIRouter() {
    urlService.listen();
    urlService.sync();
  }

  platformRef.injector.get<NgZone>(NgZone).run(startUIRouter);
});
