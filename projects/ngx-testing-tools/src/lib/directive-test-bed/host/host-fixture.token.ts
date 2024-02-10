import { InjectionToken } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';

export const HOST_FIXTURE = new InjectionToken<ComponentFixture<unknown>>('HOST_FIXTURE');
