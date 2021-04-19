import { TestBed } from "@angular/core/testing";
import { provideMockStore, MockStore } from "@ngrx/store/testing";

import { ElectronService } from "./electron.service";
import { FILE_ADD, UPDATE_STATE } from "../../core.module";

describe("ElectronService", () => {
  let store: MockStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore()],
    });
    store = TestBed.inject(MockStore);
  });

  it("should be created", () => {
    const service: ElectronService = TestBed.inject(ElectronService);
    expect(service).toBeTruthy();
  });
});
