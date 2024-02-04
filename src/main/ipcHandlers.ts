/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { ipcMain, app } from 'electron';
import Store from 'electron-store';
import notify from './notify';

const store = new Store();

function showBadge(count: number) {
  if (typeof count !== 'number') return;
  if (process.platform === 'darwin') {
    if (count <= 0) {
      app.dock.setBadge('');
    } else {
      app.dock.setBadge(count.toString());
    }
  }
}

export const setupIpcHandlers = (
  mainWindow: Electron.CrossProcessExports.BrowserWindow,
) => {
  ipcMain.on('sign-out-success', async () => {
    // if mainwindow is not focussed, show a notification
    if (!mainWindow.isFocused()) {
      notify('Vama', 'You have been signed out');
    }
  });

  ipcMain.on('open-settings', async (event) => {
    event.reply('open-settings');
  });

  // Show Desktop Notifications, if preference is set to true
  // Send reply back to renderer process
  ipcMain.on('show-notification', async (event, message, unread) => {
    if (!store.get('showNotifications')) return;
    notify('New Message', message, (response) => {
      console.log('response', response);
      event.reply('message-response', response);
    });
    showBadge(unread);
  });

  // Show Badge count
  ipcMain.on('show-badge-count', async (event, count) => {
    showBadge(count);
    store.set('unread', count);
  });
};
