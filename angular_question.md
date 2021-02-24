## 2021-2-24 angular 回调函数导致视图无法即时更新

1. 添加变化策略 
    
    装饰器里面添加 changeDetection: ChangeDetectionStrategy.OnPush

2. 类里添加 ref

    private ref: ChangeDetectorRef

3. 在回调函数里调用更新

    this.ref.markForCheck();    // 进行标注

    this.ref.detectChanges();   // 要多加一行这个 执行一次变化检测