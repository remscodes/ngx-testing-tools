import { serviceTestBed } from 'ngx-testing-tools';
import { AppService, CatFact } from './app.service';

describe('AppService', () => {
  const tb = serviceTestBed(AppService, { httpTesting: true });

  it('should fetch cat fact', tb(({ service, http, rx }, done: DoneFn) => {
    const mockRes: CatFact = { fact: 'string', length: 6 };

    rx.remind = service.getCatFact().subscribe({
      next: ({ body, status }) => {
        expect(status).toEqual(200);
        expect(body).toEqual(mockRes);
        done();
      },
    });

    http.emitSuccessResponse({
      method: 'GET',
      url: service.CAT_FACT_URL,
      body: mockRes,
    });
  }));
});
