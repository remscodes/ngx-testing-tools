import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { HttpTools } from './models/http-tools.model';

export function buildHttpTools(injector: Injector): HttpTools {
  const client = injector.get(HttpClient);
  const controller = injector.get(HttpTestingController);

  return { client, controller };
}
