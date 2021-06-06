import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { OverlayContainer } from '@angular/cdk/overlay';
import { SharedModule } from '../../shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('appContextmenu', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [SharedModule, NoopAnimationsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  function waitingForContextmenuToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  it('should appContextmenu work', fakeAsync(() => {
    const triggerElement = component.orgin.nativeElement;
    const conextmenuEvent = new MouseEvent('contextmenu', {
      button: 2 //鼠标右键
    });
    triggerElement.dispatchEvent(conextmenuEvent);
    waitingForContextmenuToggling();
    const contextmenu = overlayContainerElement.querySelector('.contextmenu');
    expect(contextmenu).toBeDefined();
  }));
});

@Component({
  template: `
    <div #orgin appContextmenu></div>
  `
})
export class TestComponent {
  @ViewChild('orgin', { static: false }) orgin!: ElementRef;
}
