import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  type DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { HiPaperAirplane, HiX } from 'react-icons/hi';

interface Message extends DocumentData {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  createdAt: any;
  read: boolean;
}

interface ChatProps {
  bookingId: string;
  clientId: string;
  clientName: string;
  onClose?: () => void;
}

const Chat = ({ bookingId, clientId, clientName, onClose }: ChatProps) => {
  const { user, isAdmin } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages for this booking
  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('bookingId', '==', bookingId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Message[];

      setMessages(messagesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [bookingId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMessage.trim() || !user) return;

    try {
      await addDoc(collection(db, 'messages'), {
        bookingId,
        senderId: user.uid,
        senderName: user.displayName || 'User',
        recipientId: isAdmin ? clientId : 'admin',
        text: newMessage.trim(),
        read: false,
        createdAt: serverTimestamp()
      });

      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-charcoal/50 border-2 border-gold/30 rounded-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gold/20 bg-charcoal/80">
        <div>
          <h3 className="font-display text-xl font-bold text-gold">
            {isAdmin ? `Chat with ${clientName}` : 'Chat with Les'}
          </h3>
          <p className="text-xs text-gray-400">Real-time messaging</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gold/10 rounded-full transition-all"
          >
            <HiX className="text-2xl text-gray-400 hover:text-gold" />
          </button>
        )}
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-charcoal/20">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => {
              const isOwnMessage = message.senderId === user?.uid;

              return (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] ${
                      isOwnMessage
                        ? 'bg-gold text-charcoal rounded-l-2xl rounded-tr-2xl'
                        : 'bg-charcoal/50 border border-gold/30 text-white rounded-r-2xl rounded-tl-2xl'
                    } px-4 py-3`}
                  >
                    <p className="text-xs font-semibold mb-1 opacity-70">
                      {message.senderName}
                    </p>
                    <p className="text-sm leading-relaxed break-words">{message.text}</p>
                    <p className="text-xs mt-1 opacity-60">
                      {message.createdAt?.toDate?.().toLocaleTimeString('en-ZA', {
                        hour: '2-digit',
                        minute: '2-digit'
                      }) || 'Just now'}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gold/20 bg-charcoal/80">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 bg-charcoal border border-gold/30 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-all text-white placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="px-6 py-3 bg-gold text-charcoal font-semibold rounded-lg hover:bg-cinematic-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <HiPaperAirplane className="text-xl" />
            <span className="hidden sm:inline">Send</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
