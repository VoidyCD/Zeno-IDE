import { app, BrowserWindow, ipcMain, Menu } from "electron";
import * as path from "path";

function createWindow() {

  var menu = Menu.buildFromTemplate(
    [
      {
        label: "File",
        submenu: [
          {label:'New File', submenu:[
          {label:"JAVASCRIPT File"},
          {label: "HTML File"},
          {label: "DUNAMIS File"}, 
          {label: "PYTHON File"}, 
          {label: "JULIA File"}, 
          {label: "JAVA File"}, 
          {label: "C# File"}, 
          {label: "C++ File"}]
        }
        
        ]
      }
    ])

    Menu.setApplicationMenu(menu);

  const mainWindow = new BrowserWindow({
    height: 600,
    title: "Zeno",
    
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false
    },
    width: 800,
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "../frontend/index.html"));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
