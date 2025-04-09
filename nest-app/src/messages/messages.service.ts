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

  async findAll(selectedUser: number, currentUser: number) {
    const messages = await this.messageRepository
      .createQueryBuilder('message')
      .where('message.from = :selectedUser AND message.to = :currentUser', {
        selectedUser,
        currentUser,
      })
      .orWhere('message.from = :currentUser AND message.to = :selectedUser', {
        selectedUser,
        currentUser,
      })
      .getMany();

    return messages;
  }
}
