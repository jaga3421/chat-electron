import { v4 as uuidv4 } from 'uuid';
import store from '../store';
import { channelActions } from '../slices/channelSlice';

const WS_API = process.env.REACT_APP_WS_URL;
const HC_FCM = uuidv4();
const HC_DEVICE_ID = '12345';

let defaultChannelID = '';
const getChannelMessagesID = '';

class WebSocketConnection {
  private ws: WebSocket | null = null;

  connect(token: string) {
    this.ws = new WebSocket(
      `${WS_API}${token}&fcm=${HC_FCM}&device_id=${HC_DEVICE_ID}`,
    );

    this.ws.onopen = () => {
      console.log('WebSocket is connected');
      this.getDefaultChannels();
    };
    this.ws.onmessage = (event) => this.handleIncoming(JSON.parse(event.data));

    this.ws.onerror = (error) => console.log('WebSocket error: ', error);
    this.ws.onclose = (event) => console.log('WebSocket is closed: ', event);
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  getDefaultChannels() {
    if (this.ws) {
      defaultChannelID = uuidv4();
      const message = {
        id: defaultChannelID,
        service: 'channel',
        method: 'get',
        data: { channel_id: '95e92cb5-b8fd-11ee-bab0-0242ac120008' },
      };

      this.ws.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not connected');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  handleIncoming(message: any) {
    if (message.error) {
      throw new Error(message.error);
    }
    console.log(message.data);

    // Default Channel Response
    if (message.id === defaultChannelID) {
      store.dispatch(channelActions.addChannel(message.data.channel));
    }
  }

  getChannelMessages(channelID: string) {
    // if (this.ws) {
    //   getChannelMessagesID = uuidv4();
    //   const message = {
    //     id: getChannelMessagesID,
    //     service: 'message',
    //     method: 'list',
    //     data: {
    //       message_id: getChannelMessagesID,
    //       channel_id: channelID,
    //       direction: 'newestFirst',
    //       page_req: { page: '', size: 50 },
    //     },
    //   };
    //   this.ws.send(JSON.stringify(message));
    // }
  }
}

export default new WebSocketConnection();
