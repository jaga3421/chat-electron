/* eslint-disable no-empty-pattern */

import { useSelector } from 'react-redux';
import ChatSideSingle from './ChatSideSingle';
import NewChat from './NewChat';
import { RootState } from '../../store/rootReducer';
import store from '../../store';
import { channelActions } from '../../slices/channelSlice';
import WebSocketConnection from '../../utils/webSocket';

type Props = {};

export default function ChatSideBar({}: Props) {
  const channels = useSelector((state: RootState) => state.channels.channels);

  const setActiveChannel = (channelId: string) => {
    store.dispatch(channelActions.selectChannel(channelId));
    WebSocketConnection.getChannelMessages(channelId);
  };

  return (
    <div className="side-bar">
      {channels.length === 0 ? (
        <div className="empty">Loading your chats</div>
      ) : (
        channels.map((channel) => (
          <ChatSideSingle
            key={channel.id}
            avatarSrc={channel.metadata.direct.other_account.avatar}
            name={`${channel.metadata.direct.other_account.first_name} ${channel.metadata.direct.other_account.last_name}`}
            text={channel.last_message.text}
            timeStamp={channel.last_message.created_at}
            isSelected={channel.isSelected}
            onClick={() => setActiveChannel(channel.id)}
          />
        ))
      )}
      <NewChat />
    </div>
  );
}
