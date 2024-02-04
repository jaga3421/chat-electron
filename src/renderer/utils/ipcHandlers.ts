/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify';
import { clearToken } from '../slices/authSlice';
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
    if (localStorage.getItem('authToken')) {
      console.log('open settings');
    } else {
      toast.error('Please sign in to access settings');
    }
  });

  window.electron.ipcRenderer.on('message-response', (response) => {
    console.log('Responded Message', response);
  });
}
