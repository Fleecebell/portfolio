// 精确模拟 mobile viewport 截图（用 Node 22 内置 WebSocket）
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const userDataDir = 'C:\\Users\\21264\\AppData\\Local\\Temp\\chrome-shot-mob';
const port = 9333;
const url = 'http://localhost:5173/?v=mobile';
const chrome = spawn('"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"', [
  '--headless=new', '--disable-gpu',
  '--remote-debugging-port=' + port,
  '--user-data-dir=' + userDataDir,
  'about:blank',
], { shell: true });

const wait = (ms) => new Promise(r => setTimeout(r, ms));
await wait(2500);

const list = await fetch(`http://localhost:${port}/json`).then(r => r.json());
const ws = new WebSocket(list[0].webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));

let id = 0;
const send = (method, params) => new Promise(resolve => {
  const mid = ++id;
  const handler = (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id === mid) { ws.removeEventListener('message', handler); resolve(msg.result); }
  };
  ws.addEventListener('message', handler);
  ws.send(JSON.stringify({ id: mid, method, params }));
});

await send('Emulation.setDeviceMetricsOverride', {
  width: 390, height: 844, deviceScaleFactor: 2, mobile: true,
});
await send('Page.navigate', { url });
await wait(5000);
const { data } = await send('Page.captureScreenshot', { format: 'png' });
writeFileSync('C:\\Users\\21264\\Desktop\\文件\\portfolio\\shot-cdp.png', Buffer.from(data, 'base64'));
chrome.kill();
console.log('OK');
