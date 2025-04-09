import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
// import { UpdateMessageDto } from './dto/update-message.dto';

@WebSocketGateway()
export class MessagesGateway {
  @WebSocketServer()
  server: Server;
  constructor(private readonly messagesService: MessagesService) {}

  @SubscribeMessage('createMessage')
  async create(@MessageBody() createMessageDto: CreateMessageDto) {
    const message = await this.messagesService.create(createMessageDto);
    this.server.emit('newMessage');
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAll(
    @MessageBody() data: { selectedUser: number; currentUser: number },
  ) {
    const { selectedUser, currentUser } = data;

    const messages = await this.messagesService.findAll(
      selectedUser,
      currentUser,
    );

    return messages;
  }
}
