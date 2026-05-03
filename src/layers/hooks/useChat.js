import { useDispatch, useSelector } from 'react-redux';
import {
  sendChatMessage,
  fetchChatMessages,
  clearChatError,
  clearChat,
} from '../state/chat/chat.slice';

const useChat = () => {
  const dispatch = useDispatch();
  const { messages, activeChatId, loading, error } = useSelector((state) => state.chat);

  return {
    // ── State
    messages,
    activeChatId,
    loading,
    error,

    // ── Actions
    sendMessage:  (messageData) => dispatch(sendChatMessage(messageData)),
    getMessages:  (chatId)      => dispatch(fetchChatMessages(chatId)),
    clearChat:    ()            => dispatch(clearChat()),
    clearError:   ()            => dispatch(clearChatError()),
  };
};

export default useChat;