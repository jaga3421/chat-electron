/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import { clearToken } from '../slices/authSlice';
import webSocket from './webSocket';
import store from '../store';

export function setupIpcHandlers() {
  if (!window.electron) {
    return;
  }
  window.electron.ipcRenderer.on('sign-out', () => {
    store.dispatch(clearToken());
    // send back success message
    window.electron.ipcRenderer.sendMessage('sign-out-success');
  });

  window.electron.ipcRenderer.on('open-settings', () => {
    if (!localStorage.getItem('authToken')) {
      toast.error('Please sign in to access settings');
    }
  });

  window.electron.ipcRenderer.on('message-response', (response) => {
    console.log('Responded Message', response);
    // #todo: remove hardcode
    webSocket.sendMessage(
      '95e92cb5-b8fd-11ee-bab0-0242ac120008',
      response as string,
    );
  });
}

window.onfocus = function () {
  window.electron.ipcRenderer.sendMessage('show-badge-count', 0);
};
