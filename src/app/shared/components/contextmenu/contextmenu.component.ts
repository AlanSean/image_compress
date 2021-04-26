import {
  Component,
  ViewEncapsulation,
  Directive,
  ElementRef,
  // 表示可以将一个或多个视图附着到组件中的容器。
  ViewContainerRef,
  // 可用来动态创建组件的工厂的基类。resolveComponentFactory() 实例化给定类型的组件的工厂。使用生成的 ComponentFactory.create() 方法创建该类型的组件。
  ComponentFactory,
  OnDestroy,
  AfterViewInit,
  // 一个简单的注册表，它将 Components 映射到生成的 ComponentFactory 类，该类可用于创建组件的实例。用于获取给定组件类型的工厂，然后使用工厂的 create() 方法创建该类型的组件。
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  HostListener,
  Input
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';

@Directive({
  selector: '[appContextmenu]'
})
export class ContextmenuDirective implements AfterViewInit {
  @Output('menuListClick') menuListClick: EventEmitter<any> = new EventEmitter();
  @Input('disabled') disabled!: boolean; //true 右键无效
  component!: ContextmenuComponent;
  origin!: any;
  //resolver.resolveComponentFactory ：检索创建给定类型组件的工厂对象。
  componentFactory: ComponentFactory<ContextmenuComponent> = this.resolver.resolveComponentFactory(ContextmenuComponent);

  constructor(private elementRef: ElementRef, protected resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  @HostListener('contextmenu', ['$event']) oncontextmenu(e: MouseEvent) {
    e.preventDefault();
    if (this.disabled) return;
    this.component?.show();
  }
  @HostListener('click') onclick() {
    this.component?.hide();
  }
  ngAfterViewInit(): void {
    this.created();
  }
  protected created() {
    this.component = this.viewContainerRef.createComponent(this.componentFactory).instance;
    this.component.saveOrigin({ elementRef: this.elementRef });
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
  _menuListClick(key: string) {}
  set menuListClick(fn: (key: string) => void) {
    this._menuListClick = fn;
  }
  get menuListClick() {
    return this._menuListClick;
  }

  origin!: CdkOverlayOrigin;
  isOpen: boolean = false;
  positions: ConnectedPosition[] = [
    {
      originX: 'end',
      originY: 'center',
      overlayX: 'start',
      overlayY: 'center'
    }
  ];
  constructor(private cdr: ChangeDetectorRef) {}
  onOutsideClick(e: MouseEvent) {
    if (e.target != null && !this.origin.elementRef.nativeElement.contains(e.target)) {
      this.hide();
    }
  }
  saveOrigin(origin: CdkOverlayOrigin) {
    //关闭检测 因为会出现警告
    this.cdr.detach();
    this.origin = origin;
    this.cdr.markForCheck();
  }
  show() {
    if (!this.isOpen) this.isOpen = true;
    this.cdr.detectChanges();
  }
  hide() {
    if (this.isOpen) this.isOpen = false;
    this.cdr.detectChanges();
  }
}
