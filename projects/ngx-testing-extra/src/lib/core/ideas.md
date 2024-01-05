Classic way

```ts
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AppService, useClass: MockAppService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

Idea 1

Good to init one extra for each test suite.

```ts
describe('AppComponent', () => {
  const extra = new ExtraBed(AppComponent);

  beforeEach(async () => {
    await extra.provide(AppService).compile();
  });

  it('should create', extra(({ instance }) => {
    expect(instance).toBeTruthy();
  }));
});
```

Idea 2

Good to not need to assign `extra` to one constant.
But need to connect `extra` to static `ExtraBed`.

```ts
describe('AppComponent', () => {

  beforeEach(async () => {
    await ExtraBed.root(AppComponent).provide(AppService).compile();
  });

  it('should create', extra(({ instance }) => {
    expect(instance).toBeTruthy();
  }));
});
```

Idea 3

__Not working__ for component with `ngOnChanges()` that needs wrapper component for testing.
Therefore, the passed `AppComponent` cannot be used to create the fixture for that specific case.

```ts
describeComponent(AppComponent, ({ extra }) => {
  beforeEach(async () => {
    await extra.import().compile();
  });

  it('should create', extra(({ instance }) => {
    expect(instance).toBeTruthy();
  }));
});
```
