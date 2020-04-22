import { Component } from '@angular/core';
import { IResource } from '../shared/OdataResource';

@Component({
  selector: 'pages-component',
  templateUrl: 'pages.html'
})
export class PagesComponent {
  public Pages: Array<IResource>;
}
