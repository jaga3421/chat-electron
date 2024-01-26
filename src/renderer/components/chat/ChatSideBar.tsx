/* eslint-disable no-empty-pattern */

import ChatSideSingle from './ChatSideSingle';
import NewChat from './NewChat';

type Props = {};

export default function ChatSideBar({}: Props) {
  return (
    <div className="side-bar">
      <ChatSideSingle
        avatarSrc="https://storage.googleapis.com/profile-avatars-vama-staging/338d7ad5-850b-4c30-8267-405882c8e6c6-low-res.png"
        name="Jane Doe"
        text="Short message."
        timeStamp="12:45 PM"
      />
      <NewChat />
    </div>
  );
}
