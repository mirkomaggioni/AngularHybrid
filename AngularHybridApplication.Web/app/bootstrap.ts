import 'zone.js';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgZone } from '@angular/core';
import { UIRouter, UrlService } from '@uirouter/core';
import { AngularAppModule } from './angularAppModule'

platformBrowserDynamic().bootstrapModule(AngularAppModule).then(function (platformRef) {
  const urlService: UrlService = platformRef.injector.get(UIRouter).urlService;

  function startUIRouter() {
    urlService.listen();
    urlService.sync();
  }

  platformRef.injector.get<NgZone>(NgZone).run(startUIRouter);
});
