/* eslint-disable no-empty-pattern */

import { useSelector } from 'react-redux';
import ChatSideSingle from './ChatSideSingle';
import NewChat from './NewChat';
import { RootState } from '../../store/rootReducer';
import store from '../../store';
import { channelActions } from '../../slices/channelSlice';
import WebSocketConnection from '../../utils/webSocket';
import NetworkStatus from '../NetworkStatus';
import SideBarPH from '../placeholders/SideBarPH';

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
        <SideBarPH />
      ) : (
        channels.map((channel) => {
          return (
            <ChatSideSingle
              key={channel.id}
              avatarSrc={channel.metadata.direct.other_account.avatar}
              name={`${channel.metadata.direct.other_account.first_name} ${channel.metadata.direct.other_account.last_name}`}
              text={channel.last_message?.text}
              timeStamp={channel.last_message?.created_at}
              isselected={channel.isselected}
              onClick={() => setActiveChannel(channel.id)}
            />
          );
        })
      )}
      <NewChat />
      <NetworkStatus />
    </div>
  );
}
