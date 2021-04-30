import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { ElectronService } from './core/services';
import { CoreModule } from './core/core.module';
import { HttpLoaderFactory } from './app.module';

describe('AppComponent', () => {
  let translate: TranslateService;
  let http: HttpTestingController;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        providers: [ElectronService, TranslateService],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule,
          TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
          CoreModule
        ]
      }).compileComponents();
      translate = TestBed.inject(TranslateService);
      http = TestBed.inject(HttpTestingController);
    })
  );

  it(
    'should create the app',
    waitForAsync(() => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    })
  );
});
