import { HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';

export interface HttpTools {
  client: HttpClient;
  controller: HttpTestingController;
}
