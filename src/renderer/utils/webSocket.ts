/* eslint-disable class-methods-use-this */
import { v4 as uuidv4 } from 'uuid';
import { channelActions } from '../slices/channelSlice';
import { chatActions } from '../slices/chatSlice';
import store from '../store';

const WS_API = process.env.REACT_APP_WS_URL;
const HC_FCM = uuidv4();
const HC_DEVICE_ID = '12345';

let defaultChannelID = '';
let getChannelMessagesID = '';
const currentMessageIDs: string[] = [];

const SERVICE_CHANNEL = 'channel';
const SERVICE_MESSAGE = 'message';
const METHOD_GET = 'get';
const METHOD_LIST = 'list';
const METHOD_CREATE = 'create';

interface Message {
  id: string;
  service: string;
  method: string;
  data: any;
  error?: string;
}

class WebSocketConnection {
  private ws: WebSocket | null = null;

  connect() {
    // get token from store authslice
    const { token } = store.getState().auth;
    this.ws = new WebSocket(
      `${WS_API}${token}&fcm=${HC_FCM}&device_id=${HC_DEVICE_ID}`,
    );

    this.ws.onopen = () => {
      console.log('WebSocket is connected');
      this.getDefaultChannels();
    };
    this.ws.onmessage = (event) => this.handleIncoming(JSON.parse(event.data));

    this.ws.onerror = (error) => console.log('WebSocket error: ', error);
    this.ws.onclose = (event) => {
      console.log('WebSocket is closed now.', event);
    };
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    console.log('Attempting to reconnect in 5 seconds');
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  // Sending Messages
  sendMessage(channelID: string, text: string) {
    if (this.ws) {
      const messageID = uuidv4();
      currentMessageIDs.push(messageID);
      const message = {
        id: messageID,
        service: SERVICE_MESSAGE,
        method: METHOD_CREATE,
        data: {
          channel_id: channelID,
          text,
        },
      };
      store.dispatch(
        chatActions.sendMessage({
          id: messageID,
          text,
          timestamp: Date.now(),
          type: 'sent',
        }),
      );
      this.ws.send(JSON.stringify(message));
    }
  }

  getDefaultChannels() {
    if (this.ws) {
      defaultChannelID = uuidv4();
      const message = {
        id: defaultChannelID,
        service: SERVICE_CHANNEL,
        method: METHOD_GET,
        data: { channel_id: '95e92cb5-b8fd-11ee-bab0-0242ac120008' },
      };

      this.ws.send(JSON.stringify(message));
    } else {
      console.log('WebSocket is not connected');
    }
  }

  // Handle Incoming Messages
  handleIncoming(message: Message) {
    console.log(message.data);
    if (message.error) {
      console.error(message.error);
      return;
    }

    // Default Channel Response
    if (message.id === defaultChannelID) {
      store.dispatch(channelActions.addChannel(message.data.channel));
    }
  }

  getChannelMessages(channelID: string) {
    if (this.ws) {
      getChannelMessagesID = uuidv4();
      const message = {
        id: getChannelMessagesID,
        service: SERVICE_MESSAGE,
        method: METHOD_LIST,
        data: {
          channel_id: channelID,
          direction: 'newestFirst',
          page_req: {
            page: '',
            size: 50,
          },
        },
      };

      this.ws.send(JSON.stringify(message));
    }
  }
}

export default new WebSocketConnection();
