import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OuterComponent } from '../../components/outer.component';

export async function createOuterComponentFixture(): Promise<ComponentFixture<OuterComponent>> {
  await TestBed
    .configureTestingModule({ imports: [OuterComponent] })
    .compileComponents();

  return TestBed.createComponent(OuterComponent);
}
