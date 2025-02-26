const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({  
    width: 1920,  
    height: 1080,  
    show: false, // 不立即显示窗口  
    autoHideMenuBar: true ,// 可选：隐藏菜单栏  
    icon: './src/assets/logo-bg.png',
  });  
  
  // 最大化并显示窗口  
  win.maximize();  
  win.show();  

  // win.loadFile('index.html')
  
  // 下面的url为自己启动vite项目的url。
  win.loadURL('http://localhost:5173/')
  // 打开electron的开发者工具
  win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
