import { shell } from "electron";

export async function about(): Promise<void> {
  await shell.openExternal("https://github.com/AlanSean/image_compress/blob/master/README.md");
}