import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";

const Message = ({ role, content }) => (
  <div className="message-wrapper">
    {role === "user" ? (
      <div className="user-avatar">
        {/* <User className="user-avatar-icon" strokeWidth={1.5} /> */}
        <span style={{ fontSize: "2em" }}>🧔🏻</span>
      </div>
    ) : (
      <div className="ai-avatar">
         <span style={{ fontSize: "2em" }}>🤖</span>
      </div>
    )}
    <div className="message-content-wrapper">
      <span className="message-sender">
        {role === "user" ? "You" : "AI Assistant"}
      </span>
      <div className={`message-content ${role === "user" ? "user-message-bg" : "ai-message-bg"}`}>
        <div className="markdown-content"></div>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  </div>
);

const ChatThread = ({ messages, status, chatThreadRef }) => {
  const welcomeMessage = {
    role: "assistant",
    content: `👋 Hello! I'm E-Chah, your AI assistant. How can I help you today?`
  };

  return (
    <div ref={chatThreadRef} className="message-container">
      {messages.length === 0 ? (
        <Message {...welcomeMessage} />
      ) : (
        messages.map((message, index) => <Message key={index} {...message} />)
      )}
      {status === "submitted" && (
        <div className="thinking-row">
          <div className="ai-avatar">🤖</div >
          <div className="typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}
    </div>
  )
};

export default ChatThread;