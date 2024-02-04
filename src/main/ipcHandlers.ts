/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { ipcMain } from 'electron';
import notify from './notify';

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
};
