### Classic way

```ts
describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [AppService],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should do something', () => {
    // ...
  });
});
```

### Idea 1

A new `ExtraBed` is instanciated for each test suite.

Reduce boilerplate by providing `fixture`, `instance` (=`componentInstance`) and more for each test case thanks to created `ExtraBed` instance.  

We do need to call `compile` before each to (re)create the fixture.

```ts
describe('AppComponent', () => {
  const extra = new ExtraBed(AppComponent);

  beforeEach(async () => {
    await extra.provide(AppService).compile();
  });

  it('should do something', extra(({ instance, fixture }) => {
    // ...
  }));
});
```

#### Improvement 1

Use `createExtraBed` function instead of class constructor.

Encourage constant name `bed` instead of `extra`.

Automatically `fixture.detectChanges()` before each (can be disabled via `bed(.., { startDetectChanges: false })`).

Add redondant "should create" test case with `bed.shouldCreate()`.

```ts
describe('AppComponent', () => {
  const bed = createExtraBed(AppComponent);

  beforeEach(async () => {
    await bed.provide(AppService).compile();
  });
  
  bed.shouldCreate();

  it('should do something', bed(({ instance, fixture }) => {
    // ...
  }));
});
```

#### Improvement 2

Rename `createExtraBed` to `componentTestBed`.

Provide `query` and `action` into tools to use v1.0.0 high-level functions without fixture parameter.

Support jasmine `DoneFn`.

```ts
describe('AppComponent', () => {
  const bed = componentTestBed(AppComponent);
  
  beforeEach(() => bed.provide(AppService).compile());
  
  bed.shouldCreate();

  it('should do something', bed(({ instance, query, action }, done) => {
    // ...
  }));
});
```

### Idea 2

Use `ExtraBed` directly as static.

`bed(..)` is an exported function that is linked to the static `ExtraBed`.

Therefore, we do not to create a new `ExtraBed` for each test suite.

```ts
describe('AppComponent', () => {

  beforeEach(async () => {
    await ExtraBed.root(AppComponent).provide(AppService).compile();
  });

  it('should do something', extra(({ instance, fixture }) => {
    // ...
  }));
});
```

#### Refused

Impossible to infer `AppComponent` type to provided `instance` and `fixture` by `extra` function. 

Therefore, we do need to add `AppComponent` as generic type to every `extra`, that is adding more verbosity. 

### Idea 3

```ts
describeComponent(AppComponent, ({ extra }) => {
  beforeEach(async () => {
    await extra.provide(AppService).compile();
  });

  it('should do smt', extra(({ instance, fixture }) => {
    // ...
  }));
});
```

#### Refused

Make impossible the testing for component with `ngOnChanges()` that needs wrapper component to test it.

Therefore, the passed `AppComponent` cannot be used to create the fixture for that specific case.

Then if we replace `AppComponent` by its wrapper we add ambiguity concerning the "described component". 
