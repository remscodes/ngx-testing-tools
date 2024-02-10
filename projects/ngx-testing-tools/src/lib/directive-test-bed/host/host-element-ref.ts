import { ElementRef, Inject, Injectable } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { HOST_FIXTURE } from './host-fixture.token';

@Injectable()
export class HostElementRef extends ElementRef {

  public constructor(
    @Inject(HOST_FIXTURE) fixture: ComponentFixture<unknown>,
  ) {
    // Use `innerHTML` to remove the fixture element wrapper (<div id="rootXX" ng-version="X.X.X">..</div>)
    super(fixture.nativeElement.innerHTML);
  }
}
