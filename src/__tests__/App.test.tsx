/* eslint-disable consistent-return */
import path from 'path';

import { Application } from 'spectron';

let app: {
  browserWindow: any;
  start: () => any;
  isRunning: () => any;
  stop: () => any;
  client: {
    getTitle(): unknown;
    getWindowCount: () => any;
  };
};

beforeAll(() => {
  app = new Application({
    path: path.join(__dirname, '../node_modules/.bin/electron'),
    args: [path.join(__dirname, '..')],
  });

  return app.start();
});

afterAll(() => {
  if (app && app.isRunning()) {
    return app.stop();
  }
});

test('shows an initial window', async () => {
  const windowCount = await app.client.getWindowCount();
  expect(windowCount).toBe(1);
});

test('should have the correct title', async () => {
  const title = await app.client.getTitle();
  expect(title).toBe('Chat Payments App');
});

test('window should be resizable', async () => {
  const windowSize = await app.browserWindow.getSize();
  await app.browserWindow.setSize(800, 600);
  const newSize = await app.browserWindow.getSize();
  expect(newSize).not.toEqual(windowSize);
});

test('window should be movable', async () => {
  const windowPosition = await app.browserWindow.getPosition();
  await app.browserWindow.setPosition(300, 300);
  const newPosition = await app.browserWindow.getPosition();
  expect(newPosition).not.toEqual(windowPosition);
});
