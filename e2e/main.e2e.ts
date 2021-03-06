import { expect } from 'chai';
import { SpectronClient } from 'spectron';

import commonSetup from './common-setup';

describe('angular-electron App', function () {

  commonSetup.apply(this);

  let client: SpectronClient;

  beforeEach(function() {
    client = this.app.client;
  });

  it('creates initial windows', async function () {
    const count = await client.getWindowCount();
    expect(count).to.equal(1);
  });

  it("首页应该 显示拖拽文件到此区域", async function () {
    const elem = await client.$(".text .text-big");
    const text = await elem.getText();
    expect(text).to.equal("拖拽文件到此区域");
  });

});
