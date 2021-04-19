import { Component, OnInit } from '@angular/core';
import { Store,select } from "@ngrx/store";
import { Observable } from 'rxjs';
import { FILE } from "@common/constants";
import { selectFile } from "@app/core/state/files";
import { FILE_ADD, UPDATE_STATE } from '@app/core/state/files.action';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.less']
})
export class ImgListComponent implements OnInit {
  files$: Observable<ReadonlyArray<FILE>>;
  files=[
    {
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },
    {
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    },{
      state:"finish",
      percentage: "-9.8%",
      src:"file://C:/Users/111/Desktop/copy/start.jpg",
      path:"C:/Users/111/Desktop/copy/start.jpg",
      extname:".jpg",
      ext:"jpg",
      outsrc:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
      outpath:"J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
      quality:"80",
      rawDataSize:"5.57 KB",
      nowDataSize:"2.28 KB",
    }
  ];
  constructor(
    private store: Store<ReadonlyArray<FILE>>
  ) {
    this.files$ = store.pipe(select(selectFile));
    this.files$.subscribe(value => {
      console.log('filesv',value);
    });
  }

  ngOnInit(): void {

  }

  trackByItem(index:number, value: FILE): FILE["state"] {
    return value.state;
  }


  qualityChange(item:FILE,v:number):void{
    item.state = 'await';
    item.quality = `${v}`;
    this.store.dispatch(
      UPDATE_STATE({
        file:item
      })
    );
  }
}
