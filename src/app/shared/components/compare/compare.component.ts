import {
  Component,
  ViewEncapsulation,
  Directive,
  ElementRef,
  // 表示可以将一个或多个视图附着到组件中的容器。
  ViewContainerRef,
  // 可用来动态创建组件的工厂的基类。resolveComponentFactory() 实例化给定类型的组件的工厂。使用生成的 ComponentFactory.create() 方法创建该类型的组件。
  ComponentFactory,
  OnInit,
  // 一个简单的注册表，它将 Components 映射到生成的 ComponentFactory 类，该类可用于创建组件的实例。用于获取给定组件类型的工厂，然后使用工厂的 create() 方法创建该类型的组件。
  ComponentFactoryResolver,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  HostListener,
  ViewChild,
  OnDestroy,
  Input,
  OnChanges
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { FILE } from '@common/constants';

@Directive({
  selector: '[appCompare]'
})
export class CompareDirective implements OnInit, OnChanges {
  @Input('data') data!: FILE;
  component!: CompareComponent;
  origin!: any;
  //resolver.resolveComponentFactory ：检索创建给定类型组件的工厂对象。
  componentFactory: ComponentFactory<CompareComponent> = this.resolver.resolveComponentFactory(CompareComponent);

  constructor(protected resolver: ComponentFactoryResolver, private viewContainerRef: ViewContainerRef) {}

  @HostListener('click') onclick() {
    this.component?.show();
  }

  ngOnInit(): void {
    this.created();
  }
  ngOnChanges() {
    if (this.component) {
      this.updateComponentData();
    }
  }
  protected created() {
    this.component = this.viewContainerRef.createComponent(this.componentFactory).instance;
  }
  updateComponentData() {
    this.component._CompressBeforeImage = this.data.src;
    this.component._CompressAfterImage = this.data.outsrc;
  }
}

function throttle(_fn: any, maxTime: number) {
  let id: any = null;
  let lasttime: number | null = null;
  function cancel() {
    window.cancelAnimationFrame(id);
    id = null;
  }
  function frame(this: any, time: number, args: any) {
    if (!lasttime) lasttime = time;
    const lastTime = time - lasttime;
    if (lastTime >= maxTime) {
      _fn.apply(this, args);
      lasttime = null;
    }
    cancel();
  }
  return function (this: any, ...args: any) {
    id = window.requestAnimationFrame(time => {
      frame.apply(this, [time, args]);
    });
  };
}
@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  animations: [
    trigger('zoom', [
      transition('void => active', [
        style({ opacity: 0, transform: 'scale3d(0.3, 0.3, 0.3)' }),
        animate(
          '0.2s',
          style({
            opacity: 1,
            transform: 'scale3d(1, 1, 1)'
          })
        )
      ]),
      transition('active => void', [
        style({ opacity: 1, transform: 'scale3d(1, 1, 1)' }),
        animate(
          '0.1s',
          style({
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)'
          })
        )
      ])
    ])
  ]
})
export class CompareComponent implements OnDestroy {
  @ViewChild('left') left!: ElementRef;
  @ViewChild('right') right!: ElementRef;

  _CompressBeforeImage!: string;
  set CompressBeforeImage(CompressBeforeImage: string) {
    this._CompressBeforeImage = CompressBeforeImage;
  }
  get CompressBeforeImage() {
    return this._CompressBeforeImage;
  }
  _CompressAfterImage!: string;
  set CompressAfterImage(CompressAfterImage: string) {
    this._CompressAfterImage = CompressAfterImage;
  }
  get CompressAfterImage() {
    return this._CompressAfterImage;
  }
  _nowImg!: string;
  set nowImg(nowImg: string) {
    this._nowImg = nowImg;
  }
  get nowImg() {
    return this._nowImg;
  }
  isOpen: boolean = false;
  isTouch: 'left' | 'right' | null = null;
  color = localStorage.color || 'black';
  stylesMatrix = 'matrix(1,0,0,1,0,0)';
  leftdragPosition = { x: 115, y: 0 };
  rightdragPosition = { x: -115, y: 0 };
  current = {
    x: 0,
    y: 0
  };
  last = {
    x: 0,
    y: 0
  };
  matrix = {
    scale: 1,
    lastMoveScale: 1,
    translate: {
      x: 0,
      y: 0
    },
    lastMoveTranslate: {
      x: 0,
      y: 0
    },
    scaleOrigin: {
      x: 0,
      y: 0
    },
    imgOrigin: {
      x: 0,
      y: 0
    },
    rotate: 0
  };
  colors = ['black', 'white', 'transparent', 'red', 'green', 'blue'];
  constructor(private cdr: ChangeDetectorRef) {}

  addListen() {
    this.removeListen();
    document.addEventListener('mouseup', this.mouseup);
  }
  removeListen() {
    document.removeEventListener('mouseup', this.mouseup);
  }
  setColor(color: string) {
    this.color = color;
    localStorage.color = color;
    this.cdr.detectChanges();
  }
  show() {
    if (!this.isOpen) this.isOpen = true;
    this.cdr.detectChanges();
    //动画0，2s 获取容器的中心点
    setTimeout(() => {
      this.reset();
      this.addListen();
    }, 210);
  }

  hide() {
    if (this.isOpen) {
      this.removeListen();
      this.reset(false);
      this.isOpen = false;
      this.cdr.detectChanges();
    }
  }
  //重置坐标
  reset(isrefresh = true) {
    const { height, width } = this.left.nativeElement.getBoundingClientRect();
    const imgOrigin = {
      x: width / 2,
      y: height / 2
    };
    this.current = {
      x:0,
      y:0
    }
    this.matrix = {
      scale: 1,
      lastMoveScale: 1,
      translate: {
        x: 0,
        y: 0
      },
      lastMoveTranslate: {
        x: 0,
        y: 0
      },
      scaleOrigin: {
        x: width / 2,
        y: height / 2
      },
      imgOrigin: imgOrigin,
      rotate: 0
    };
    this.leftdragPosition = { x: imgOrigin.x, y: 0 };
    this.rightdragPosition = { x: -1 * imgOrigin.x, y: 0 };
    this.updateStyle(0, 0, isrefresh);
    isrefresh && this.cdr.detectChanges();
  }
  updateStyle(scale: number, rotate: number, isrefresh = true) {
    const matrix = this.matrix,
      { lastMoveScale, translate, lastMoveTranslate, scaleOrigin, imgOrigin } = matrix,
      newScale = matrix.scale + scale;

    matrix.scale = newScale < 1 ? 1 : newScale;
    matrix.rotate += rotate;
    if (matrix.scale > 1) {
      translate.x = lastMoveTranslate.x + (imgOrigin.x - scaleOrigin.x) * (matrix.scale - lastMoveScale);
      translate.y = lastMoveTranslate.y + (imgOrigin.y - scaleOrigin.y) * (matrix.scale - lastMoveScale);
    }

    this.stylesMatrix = `matrix(${matrix.scale}, 0, 0, ${matrix.scale}, ${translate.x}, ${translate.y})`;

    isrefresh && this.cdr.detectChanges();
  }

  setMatrix = throttle((e: any) => {
    const matrix = this.matrix,
      { translate, scale } = matrix,
      { height, width } = this.left.nativeElement.getBoundingClientRect();

    matrix.imgOrigin = {
      x: width / 2,
      y: height / 2
    };
    //鼠标在容器内移动时 记录缩放中心点
    matrix.scaleOrigin = {
      x: e.offsetX,
      y: e.offsetY
    };
    //记录 移动时的缩放值 以及位移值。
    matrix.lastMoveTranslate = { ...translate };
    matrix.lastMoveScale = scale;
  }, 100);
  mousemove = (e: any) => {
    this.setMatrix(e);
    if (this.isTouch) {
      const { pageX, pageY } = e,
        current = this.current,
        leftdragPosition = this.leftdragPosition,
        rightdragPosition = this.rightdragPosition,
        translatex = pageX - current.x,
        translatey = pageY - current.y;
      if (this.isTouch == 'left') {
        leftdragPosition.x += translatex;
        leftdragPosition.y += translatey;
      }
      if (this.isTouch == 'right') {
        rightdragPosition.x += translatex;
        rightdragPosition.y += translatey;
      }
      current.x = pageX;
      current.y = pageY;
      this.cdr.detectChanges();
    }
  };

  mousedown(e: any, touchkey: 'left' | 'right') {
    e.preventDefault();
    this.isTouch = touchkey;
    this.current = {
      x: e.pageX,
      y: e.pageY
    };
  }
  mouseup = (e: any) => {
    e.preventDefault();
    this.isTouch = null;
  };
  mouseleave() {
    const matrix = this.matrix;
    matrix.scaleOrigin = {
      ...matrix.imgOrigin
    };
  }
  mousewheel = (e: any) => {
    if (e.wheelDeltaY < 0) {
      this.updateStyle(-0.1, 0);
    }
    if (e.wheelDeltaY > 0) {
      this.updateStyle(0.1, 0);
    }
  };
  ngOnDestroy() {
    this.removeListen();
  }
}
