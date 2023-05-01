const { app, BrowserWindow, Menu } = require('electron')
const electron = require('electron')
const path = require('path');
const robot = require('robotjs');
const { exec } = require('child_process');
const { ipcMain } = require('electron');

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js'),
        }

    })

    mainWindow.loadFile('index.html')

    // Remove the menu bar
    Menu.setApplicationMenu(null)

    mainWindow.on('closed', function () {
        mainWindow = null

    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow()
    }
})


ipcMain.on('launch-and-login', (event, { username, password }) => {
    const leaguePath = "C:\\Riot Games\\League of Legends\\LeagueClient.exe";

    exec(`"${leaguePath}"`, (error) => {
        if (error) {
            console.error(`Error launching League of Legends: ${error}`);
            return;
        }
    });

    setTimeout(() => {
        robot.typeStringDelayed(username, 100000); // Type out the entire string at once, with a 50ms delay between each keystroke
        robot.keyTap("tab"); // Move to the password input field
        robot.typeStringDelayed(password, 100000); // Type out the entire string at once, with a 50ms delay between each keystroke
        robot.keyTap("enter"); // Press Enter to log in
    }, 5000); // 10 seconds delay to allow League of Legends to load
});
