import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

export default function ChatContent({ messages }) {

  return (
    <>
      {messages.map((message) =>
        message.name === localStorage.getItem('userName') ? (
          <div className="message__chats" key={message.id}>
            <p className="sender__name">You</p>
            <div className="message__sender">
              <p>{message.text}</p>
            </div>
          </div>
        ) : (
          <div className="message__chats" key={message.id}>
            <p>{message.name}</p>
            <div className="message__recipient">
              <p>{message.text}</p>
            </div>
          </div>
        )
      )}
    </>
  )
}
