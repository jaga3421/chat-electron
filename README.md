## Scripts

To start the application in development mode, use:

```bash
npm start
npm run package
```

## Author

Jagadeesh - Chat Desktop App - [jaga3421](https://github.com/jaga3421)

## Git Information

Repository: [https://github.com/jaga3421/](https://github.com/jaga3421/)

# Project Documentation

This project is a desktop application built with Electron and React, using TypeScript. The project is structured into two main sections: the Electron main process and the React renderer process.

## Main Process (Electron)

The main process is responsible for creating windows in Electron and handling system events. It is the entry point of the Electron application and runs the package's main script defined in the `package.json` file.

- `src/main/`: This directory contains all the source code for the Electron main process. It includes the main entry point for the Electron application and the IPC handlers for communication between the main and renderer processes.

- `src/main/ipcHandlers.ts`: This file contains the IPC handlers which are used for communication between the main process and the renderer process.

- `src/main/notify.ts`: This file contains the function to show system notifications.

- `src/main/tray.ts`: This file is responsible for creating and managing the system tray icon and its associated context menu. It provides functionality such as showing, hiding, and updating the tray icon and context menu.

- `src/main/menu.ts`: This file defines the application menu structure. It includes the definitions for all the menu items in the application, their click handlers, and any dynamic behaviors

## Renderer Process (React)

The renderer process is the actual Vama app. This is not a web app but rather a react application packaged inside Electron

- `src/renderer/`: This directory contains all the source code for the React application that runs in the renderer process. It includes components, hooks, and utilities.

- `src/slices/`: This directory contains Redux slices for state management in the React application. There are 3 states used across the app. Auth, Chats and Channels. These provide a single source of truth and help maintaining the code and scaling them

- `src/renderer/components/`: This directory contains reusable React components that are used in multiple places throughout the application. These components are smaller and more focused, such as buttons, input fields, and items such as Chat headers, chat bubbles, loaders etc

- `src/renderer/pages/`: This directory contains the main page components. Right now there are only 2 routes, hence two pages. These components are composed of components from the `src/renderer/components/` directory.

- `src/renderer/utils/`: This directory contains utility functions and constants that are used across the React application. Some important methods to parse time, call websockets are here

## Shared

- `release/`: This directory contains files related to the release of the application.

- `src/__tests__/`: This directory contains test files for the application.

- `package.json`: This file contains the list of project dependencies and scripts for running, building, and testing the application.

- `tsconfig.json`: This file is used to specify the root files and the compiler options required to compile the project.

- `.eslintrc.js`: This file is used to configure ESLint for the project.

- `assets/`: This directory contains static files like images and icons used in the application.

Please refer to the individual files and directories for more detailed information.
