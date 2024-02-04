/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
import { Menu, Tray, BrowserWindow, shell } from 'electron';
import Store from 'electron-store';
import { autoUpdater } from 'electron-updater';
import notify from './notify';

const store = new Store();

export default function createTray(tray: Tray, mainWindow: BrowserWindow) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Vama',

      click: () => {
        //  show the main window
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.show();
        }
      },
    },
    {
      label: 'Show notifications',
      accelerator: 'Alt+Shift+N',
      type: 'checkbox',
      checked: !!store.get('showNotifications') || false,
      click: (menuItem) => {
        // show notifications if checked

        if (menuItem.checked) {
          notify('Notifications Allowed', 'Notifications will be shown');
        }
        store.set('showNotifications', menuItem.checked);
      },
    },
    {
      label: 'Always on Top',
      type: 'checkbox',
      checked: !!store.get('alwaysOnTop') || false,
      click: (menuItem) => {
        // Toggle the always on top property
        if (mainWindow && !mainWindow.isDestroyed()) {
          const alwaysOnTop = !mainWindow.isAlwaysOnTop();
          mainWindow.setAlwaysOnTop(alwaysOnTop);
          menuItem.checked = alwaysOnTop;
        }
        store.set('alwaysOnTop', menuItem.checked);
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Settings',
      click: () => {
        mainWindow.webContents.send('open-settings');
      },
    },
    {
      label: 'Check for Updates',
      click: () => {
        notify('', 'Checking for updates...');

        autoUpdater.checkForUpdates().then((updateCheckResult) => {
          if (!updateCheckResult?.updateInfo?.files.length) {
            notify('Update Manager', 'You are on the latest version');
          }
        });
      },
    },

    {
      label: 'Toggle Dev Tools',
      click: () => {
        // Toggle the DevTools of the main window
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.toggleDevTools();
        }
      },
    },
    {
      type: 'separator',
    },
    {
      label: 'Sign Out',
      click: () => {
        mainWindow.webContents.send('sign-out');
      },
    },
    {
      label: 'Help',
      click: () => {
        shell.openExternal('https://vama.com#com');
      },
    },
  ]);

  tray.setToolTip('Vama | Chats and Paymenst');
  tray.setContextMenu(contextMenu);
}
