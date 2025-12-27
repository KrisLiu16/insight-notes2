'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  selectDirectory: () => ipcRenderer.invoke('select-directory'),
  runGit: (cwd, args) => ipcRenderer.invoke('run-git', { cwd, args }),
  proxyRequest: (url, options) => ipcRenderer.invoke('proxy-request', { url, options }),
  readFileText: (urlOrPath) => ipcRenderer.invoke('read-file-text', { urlOrPath }),
  readFileBase64: (urlOrPath) => ipcRenderer.invoke('read-file-base64', { urlOrPath }),
  onNavigate: (handler) => {
    ipcRenderer.on('app:navigate', (_event, payload) => {
      try { handler && handler(payload); } catch (e) {}
    });
  },
});
