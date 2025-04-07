import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto) {
    const newMessage: Message = new Message();
    newMessage.from = createMessageDto.from;
    newMessage.to = createMessageDto.to;
    newMessage.message = createMessageDto.message;
    return this.messageRepository.save(newMessage);
  }

  findAll() {
    return this.messageRepository.find();
  }
}
