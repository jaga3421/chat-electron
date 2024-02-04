import { Notification } from 'electron';
import path from 'path';

export default function notify(
  title: string,
  body: string,
  callback?: (reply: string) => void,
) {
  const notification = new Notification({
    title,
    body,
    icon: path.join(__dirname, 'assets/icon.png'),
    hasReply: !!callback,
    replyPlaceholder: callback ? 'Type your reply here...' : undefined,
  });

  notification.on('reply', (_event, reply) => {
    if (callback) {
      callback(reply);
    }
  });

  notification.show();
}
