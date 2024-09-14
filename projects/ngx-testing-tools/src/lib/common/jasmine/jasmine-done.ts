export function buildJasmineDone(done: DoneFn, postAction: () => void): DoneFn {
  const doneWrapper: DoneFn = (() => {
    done();
    postAction();
  }) as DoneFn;

  doneWrapper.fail = (message: string | Error | undefined) => {
    try {
      done.fail(message);
    }
    catch (err: unknown) {
      postAction();
      throw err;
    }
  };

  return doneWrapper;
}
