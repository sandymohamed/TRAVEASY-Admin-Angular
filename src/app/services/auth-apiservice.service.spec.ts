import { environment } from './../../environments/environment';
import { ICredentials } from '../interfaces/icredentials';
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthAPIServiceService } from './auth-apiservice.service';
import { IUser } from '../interfaces/iuser';
import { of } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AuthAPIServiceService', () => {
  // http client spy
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let authService: AuthAPIServiceService;
  let httpController: HttpTestingController;
  let authServiceInjection: AuthAPIServiceService;

  beforeEach(() => {
    // configuration test providers
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthAPIServiceService],
    });
    // create spy on http get, post methods
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);
    authService = new AuthAPIServiceService(httpClientSpy);
    // authService = jasmine.createSpyObj('AuthAPIServiceService', [
    //   'loggin',
    //   'register',
    // ]);
    authServiceInjection = TestBed.inject(AuthAPIServiceService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });
  it('Loggin test case to fake url request', () => {
    let expectedUrl = `${environment.BasicURL}auth/signin`;
    let expectedUser: IUser = {} as IUser;

    authServiceInjection
      .loggin({ username: 'markMagdy', password: 'mk123456' })
      .subscribe((userData) => {
        (user: any) => {
          user = expectedUser;
        };
      });
    const request = httpController.expectOne(expectedUrl);
    request.flush({ user: {} as IUser });
    httpController.verify();

    expect(expectedUser).toEqual({} as IUser);
  });
  it('Register test case to fake url request', () => {
    let expectedUrl = `${environment.BasicURL}auth/signup`;
    let expectedUser: Object = {};
    let userInfo: IUser = {} as IUser;

    authServiceInjection.register({} as IUser).subscribe((userData) => {
      (user: any) => {
        user = userInfo;
      };
    });
    const request = httpController.expectOne(expectedUrl);
    request.flush({ response: {} });
    httpController.verify();

    expect(expectedUser).toBeDefined();
  });
  it('reigster should return excepcted (httpClient called once) ', (done: DoneFn) => {
    let expectedUser: IUser = {} as IUser;
    httpClientSpy.post.and.returnValue(of(expectedUser));
    authService.register({} as IUser).subscribe({
      next: (user) => {
        expect(user).toEqual(expectedUser);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });

  it('reigster should return excepcted (httpClient called once) ', (done: DoneFn) => {
    let expectedUser: IUser = {} as IUser;
    httpClientSpy.post.and.returnValue(of(expectedUser));
    authService.loggin({} as ICredentials).subscribe({
      next: (user) => {
        expect(user).toEqual(expectedUser);
        done();
      },
      error: done.fail,
    });

    expect(httpClientSpy.post.calls.count()).withContext('one call').toBe(1);
  });
  it('pass signin through error when the server returns a 404', () => {
    let expectedUrl = `${environment.BasicURL}auth/signin`;
    const status = 500;
    const statusText = 'Error occured';
    let actualError: HttpErrorResponse | undefined;
    //const errorEvent = new ErrorEvent('API error');

    const progressiveEvent = new ProgressEvent('Error occured');

    const request = httpController.expectOne(expectedUrl);
    request.error(progressiveEvent, { status, statusText });

    authService
      .loggin({ username: 'markMagdy', password: 'mk123456' })
      .subscribe({
        next: () => fail('next handler must not be called'),
        error: (error) => (actualError = error),
        complete: () => fail('next handler must not be called'),
      });
    httpController
      .expectOne(expectedUrl)
      .error(progressiveEvent, { status, statusText });
    if (!actualError) {
      throw new Error('Error occured');
    }
    expect(actualError.error).toBe(progressiveEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
  // it('test loggin should return an error when the server returns a 404', (done: DoneFn) => {
  //   const errorResponse = new HttpErrorResponse({
  //     error: 'error',
  //     status: 404,
  //     statusText: 'Not Found',
  //   });
  //   httpClientSpy.get.and.returnValue(of(errorResponse));

  //   authService
  //     .loggin({ username: 'markMagdy', password: 'mk123456' })
  //     .subscribe({
  //       next: (user) => done.fail('error'),
  //       error: (error) => {
  //         expect(error.message).toContain('error');
  //         done();
  //       },
  //     });
  // });
});
