import { Menu, Tray, BrowserWindow } from 'electron';

export default function createTaskbarMenu(
  tray: Tray,
  mainWindow: BrowserWindow,
) {
  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show Vama',
      click: () => {
        //  show the main window
      },
    },
    {
      label: 'Settings',
      click: () => {
        //  open settings
      },
    },
    {
      label: 'Check for Updates',
      click: () => {
        //  check for updates
      },
    },
    {
      label: 'Show notifications',
      type: 'checkbox',
      click: () => {
        //  toggle notifications
      },
    },
    {
      label: 'Always on Top',
      type: 'checkbox',
      click: (menuItem) => {
        // Toggle the always on top property
        if (mainWindow && !mainWindow.isDestroyed()) {
          const alwaysOnTop = !mainWindow.isAlwaysOnTop();
          mainWindow.setAlwaysOnTop(alwaysOnTop);
          menuItem.checked = alwaysOnTop;
        }
      },
    },
    {
      label: 'Show Developer Tools',
      type: 'checkbox',
      click: () => {
        // Toggle the DevTools of the main window
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.toggleDevTools();
        }
      },
    },
    {
      label: 'About',
      click: () => {
        //  show about information
      },
    },
    {
      label: 'Logout',
      click: () => {
        //  logout
      },
    },
    {
      label: 'Help',
      click: () => {
        //  show help
      },
    },
  ]);

  tray.setToolTip('Vama | Chats and Paymenst');
  tray.setContextMenu(contextMenu);
}
