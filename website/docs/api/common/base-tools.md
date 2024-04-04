# BaseTools

Every test beds tools extends these tools.

```ts
it('should ', tb(({ injector, injected, rx }) => {
  // ... expectations
}));
```
### `injector`

Test bed injector to get instance.

Example :

```ts
it('should ', tb(({ injector }) => {
  const service = injector.get(AppService);
  // ... expectations
}));
```

### `injected`

Get instances injected with `tb.inject(..)` by autocompletion.

Example :

```ts
describe('AppComponent', () => {
  const tb = componentTestBed(AppComponent)
    .inject('auth', AuthService);

  it('should ', tb(({ injected: { auth } }) => {
    // ... expectations
  }));
});
```

### `rx`

`RxBox` to auto unsubscribe `Subscription` and auto complete `Subject` when the test ends.

Uses the `remind` setter to add subscription or subject into local array.

Example :

```ts
it('should ', tb(({ rx }) => {
  // Auto unsubscribe after the test end
  rx.remind = myObservable.subscrible();

  // Auto complete after the test end
  const subject = new Subject();
  rx.remind = subject;
  
  // ... expectations
})); 
```
