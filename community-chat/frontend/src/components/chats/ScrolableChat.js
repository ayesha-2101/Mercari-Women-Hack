import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../../Context/ChatProvider';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/chatLogic';
import { Avatar, Tooltip } from '@chakra-ui/react';
import { Filter } from 'bad-words';
const filter = new Filter();
function ScrolableChat(props) {
    const { user } = ChatState();
    console.log(props.messages);
    console.log(user);
    return (
      <ScrollableFeed >
            {props.messages && props.messages.map((m, i) => {
                return (
                     <div style={{ display: "flex"}} key={m._id}>
                      {(isSameSender(props.messages, m, i, user._id)
                          || isLastMessage(props.messages, i, user._id)) && (
                          <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                              <Avatar
                                  mt="10px"
                                  mr={1}
                                  size="sm"
                                  cursor="pointer"
                                  name={m.sender.name}
                                  src={m.sender.pic}
                              />
                          </Tooltip>
                          )}
                      <span style={{
                          backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#e9bbf3"}`,
                          borderRadius: "20px",
                          padding: "5px 15px",
                            maxWidth: "75%", marginLeft: isSameSenderMargin(props.messages, m, i, user._id),
                            marginTop:isSameUser(props.messages,m,i,user._id)?3:10
                           
                      }}
                      >
                          {filter.clean(m.content)}
                      </span>
                  </div>
                    )
                 
              
              
          }
            )
            }
            
            </ScrollableFeed>
  )
}

export default ScrolableChat