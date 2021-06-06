import {
  Component,
  ViewEncapsulation,
  Directive,
  ElementRef,
  // 表示可以将一个或多个视图附着到组件中的容器。
  ViewContainerRef,
  // 可用来动态创建组件的工厂的基类。resolveComponentFactory() 实例化给定类型的组件的工厂。使用生成的 ComponentFactory.create() 方法创建该类型的组件。
  ComponentFactory,
  AfterViewInit,
  // 一个简单的注册表，它将 Components 映射到生成的 ComponentFactory 类，该类可用于创建组件的实例。用于获取给定组件类型的工厂，然后使用工厂的 create() 方法创建该类型的组件。
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
  Input,
  ViewChild,
  OnInit
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CdkOverlayOrigin, ConnectedPosition, CdkConnectedOverlay } from '@angular/cdk/overlay';
import { connectedPosition } from './postion';

@Directive({
  selector: '[appContextmenu]'
})
export class ContextmenuDirective implements OnInit {
  @Output('menuListClick') menuListClick: EventEmitter<any> = new EventEmitter();
  @Input('Disabled') disabled!: boolean; //true 右键无效
  @Input('trigger') trigger!: 'contextmenu' | 'hover'; //true 右键无效
  private component!: ContextmenuComponent;
  private time?: NodeJS.Timeout;
  //resolver.resolveComponentFactory ：检索创建给定类型组件的工厂对象。
  componentFactory: ComponentFactory<ContextmenuComponent> = this.resolver.resolveComponentFactory(ContextmenuComponent);

  constructor(private elementRef: ElementRef, protected resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  @HostListener('contextmenu', ['$event']) oncontextmenu(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled || this.trigger != 'contextmenu') return;
    this.component?.show();
  }
  @HostListener('click', ['$event']) onclick(e: MouseEvent) {
    e.stopPropagation();
    if (this.disabled || this.trigger != 'contextmenu') return;
    this.component?.hide();
  }
  @HostListener('mouseenter', ['$event']) onmouseenter(e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (this.disabled || this.trigger != 'hover') return;
    this.clearTimer();
    this.component?.show();
  }

  @HostListener('mouseleave') onmouseleave() {
    if (this.disabled || this.trigger != 'hover') return;
    this.listener();
  }
  ngOnInit(): void {
    this.created();
  }
  show = () => {
    if (this.time) return this.clearTimer();
    this.time = setTimeout(() => {
      this.time = undefined;
      this.component?.show();
    }, 150);
  };
  hide = () => {
    if (this.time) return this.clearTimer();
    this.time = setTimeout(() => {
      this.time = undefined;
      this.component?.hide();
    }, 100);
  };

  clearTimer() {
    if (this.time) {
      clearTimeout(this.time);
      this.time = undefined;
    }
  }
  removeListener() {}
  listener() {
    if (this.trigger != 'hover') return;
    let overlayElement = this.component.overlay.overlayRef.overlayElement;
    this.removeListener();
    this.hide();
    overlayElement.addEventListener('mouseenter', this.show);
    overlayElement.addEventListener('mouseleave', this.hide);
    this.removeListener = () => {
      overlayElement.removeEventListener('mouseenter', this.show);
      overlayElement.removeEventListener('mouseleave', this.hide);
    };
  }
  protected created() {
    this.component = this.viewContainerRef.createComponent(this.componentFactory).instance;
    this.component.saveOrigin({ elementRef: this.elementRef });
    this.component.trigger = this.trigger;
    this.component._menuListClick = key => {
      this.menuListClick.emit(key);
      this.component?.hide();
    };
  }
}

@Component({
  selector: 'app-contextmenu',
  exportAs: 'ContextmenuComponent',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger('zoom', [
      transition('void => active', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '0.2s cubic-bezier(0.08, 0.82, 0.17, 1)',
          style({
            opacity: 1,
            transform: 'scale(1)'
          })
        )
      ]),
      transition('active => void', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate(
          '0.1s cubic-bezier(0.78, 0.14, 0.15, 0.86)',
          style({
            opacity: 0,
            transform: 'scale(0.8)'
          })
        )
      ])
    ])
  ]
})
export class ContextmenuComponent {
  @ViewChild('overlay', { static: false }) overlay!: CdkConnectedOverlay;

  _menuListClick(key: string) {}
  set menuListClick(fn: (key: string) => void) {
    this._menuListClick = fn;
  }
  get menuListClick() {
    return this._menuListClick;
  }
  _trigger!: 'contextmenu' | 'hover';
  positions!: ConnectedPosition[];
  set trigger(trigger) {
    this._trigger = trigger;
    this.positions = [connectedPosition[trigger]];
  }
  get trigger() {
    return this._trigger;
  }

  origin!: CdkOverlayOrigin;
  isOpen: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}
  //更新位置
  updateByDirective() {
    this.overlay.overlayRef.updatePosition();
  }
  onOutsideClick(e: MouseEvent) {
    if (e.target != null && !this.origin.elementRef.nativeElement.contains(e.target)) {
      this.hide();
    }
  }
  saveOrigin(origin: CdkOverlayOrigin) {
    this.origin = origin;
    this.cdr.markForCheck();
  }
  show() {
    if (!this.isOpen) this.isOpen = true;
    this.cdr.detectChanges();
    this.updateByDirective();
  }
  hide() {
    if (this.isOpen) this.isOpen = false;
    this.cdr.detectChanges();
  }
}
