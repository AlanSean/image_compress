import { Component, OnInit,  ChangeDetectionStrategy,
  ChangeDetectorRef, } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { FILE } from "@common/constants";
import { selectFile, UPDATE_STATE,REMOVE_FILE } from "@app/core/core.module";
import { ElectronService } from "@app/core/services";

@Component({
  selector: "app-img-list",
  templateUrl: "./img-list.component.html",
  styleUrls: ["./img-list.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgListComponent implements OnInit {
  files$: Observable<ReadonlyArray<FILE>>;
  // files = [
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  //   {
  //     state: "finish",
  //     percentage: "-9.8%",
  //     src: "file://C:/Users/111/Desktop/copy/start.jpg",
  //     path: "C:/Users/111/Desktop/copy/start.jpg",
  //     extname: ".jpg",
  //     ext: "jpg",
  //     outsrc:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading\\start.jpg",
  //     outpath:
  //       "J:\\QQ几率\\2316694914\\FileRecv\\剑灵小助手1.7.7(密码为jlxzs)\\剑灵工具箱 V2.91\\剑灵工具箱 V2.91\\Resources\\HaoZip\\Loading",
  //     quality: "80",
  //     rawDataSize: "5.57 KB",
  //     nowDataSize: "2.28 KB",
  //   },
  // ];
  files:FILE[] = [];
  constructor(
    private electronService: ElectronService,
    private store: Store<Array<FILE>>,
    private cdr: ChangeDetectorRef,
   
  ) {
    this.files$ = store.pipe(select(selectFile));

  }

  ngOnInit(): void {

  }

  trackByItem(index: number, value: FILE): FILE["state"] {
    return value.state;
  }

  qualityChange(item: FILE, v: number): void {
    this.store.dispatch(
      UPDATE_STATE({
        files: {
          ...item,
          quality: `${v}`
        }
      })
    );
  }

  qualityAfterChange(item: FILE, v: number): void {
    const newFileInfo:FILE = {
      ...item,
      state: "await",
      quality: `${v}`
    };

    this.store.dispatch(
      UPDATE_STATE({
        files: newFileInfo
      })
    );

    
    this.electronService.file_update_quality(newFileInfo);
  }

  remove(key: string):void{
    this.store.dispatch(
      REMOVE_FILE({
        keys: key
      })
    );
  }
  
}
