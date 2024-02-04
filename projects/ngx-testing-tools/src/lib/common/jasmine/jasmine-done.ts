export function buildJasmineDone(done: DoneFn, postAction: () => void): DoneFn {
  const doneWrapper: DoneFn = (() => {
    done();
    postAction();
  }) as DoneFn;

  doneWrapper.fail = (m) => {
    done.fail(m);
    postAction();
  };

  return doneWrapper;
}
