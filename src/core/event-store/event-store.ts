import { Injectable, Inject, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { IEventPublisher } from '@nestjs/cqrs/dist/interfaces/events/event-publisher.interface';
import { IMessageSource } from '@nestjs/cqrs/dist/interfaces/events/message-source.interface';
import { IEvent } from '@nestjs/cqrs/dist/interfaces/events/event.interface';
import { Subject, fromEvent } from 'rxjs';
import * as xml2js from 'xml2js';
import * as http from 'http';
import { config } from '../../../config';

const eventStoreHostUrl = config.EVENT_STORE_SETTINGS.protocol +
  `://${config.EVENT_STORE_SETTINGS.hostname}:${config.EVENT_STORE_SETTINGS.httpPort}/streams/`;

/**
 * @class EventStore
 * @description The EventStore.org bridge. By design, the domain category
 * (i.e. user) events are being subscribed to. Upon events being received,
 * internal event handlers are responsible for the handling of events.
 */
@Injectable()
export class EventStore implements IEventPublisher, IMessageSource {
 
  private eventStore: any;
  private eventHandlers: object;
  private category: string;

  constructor(@Inject('EVENT_STORE_PROVIDER') eventStore: any) {
    this.category = 'users';
    this.eventStore = eventStore;
    this.eventStore.connect({
      hostname: config.EVENT_STORE_SETTINGS.hostname,
      port: config.EVENT_STORE_SETTINGS.tcpPort,
      credentials: config.EVENT_STORE_SETTINGS.credentials,
      poolOptions: config.EVENT_STORE_SETTINGS.poolOptions,
    });
  }

  async publish<T extends IEvent>(event: T) {
    
    const message = JSON.parse(JSON.stringify(event));
    const category =  JSON.stringify(Object.getOwnPropertyNames(event)).slice(2, -5)
    const dto =  JSON.stringify(Object.getOwnPropertyNames(event)).slice(2, -2)

    console.log(' ==========================================' )

    console.log('Event Json ==> ' + JSON.stringify(event))
    console.log('Event Type ==> ' + category)
    console.log('Event DTO ==> ' + dto)

    console.log(' ==========================================' )

    
    switch (category) {
      case 'user':
        var id = message.userDto.userId ;
        break;
      case 'quoted':
        var id = message.quotedDto.quotedId ;
        break;
      default:
        console.trace('Error => Event category not covered ')
        break;
    }

    const streamName = `${category}-${id}`;

    const type = event.constructor.name;

    try {
      await this.eventStore.client.writeEvent(streamName, type, event);
      console.log('Event saved with ID : ' + streamName)
    } catch (err) {
      console.trace(err);
    }
  }

  /**
   * @description Event Store bridge subscribes to domain category stream
   * @param subject
   */
  async bridgeEventsTo<T extends IEvent>(subject: Subject<T>) {
    const streamName = `$ce-${this.category}`;
    console.log('streamName' + streamName );
    const onEvent = async (event) => {
      const eventUrl = eventStoreHostUrl +
        `${event.metadata.$o}/${event.data.split('@')[0]}`;
      http.get(eventUrl, (res) => {
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          xml2js.parseString(rawData, (err, result) => {
            if (err) {
              console.trace(err);
              return;
            }
           

/*
            console.log(result);
            const content = result['atom:entry']['atom:content'][0];
            const eventType = content.eventType[0];
            const data = content.data[0];
            event = this.eventHandlers[eventType](...Object.values(data));
            subject.next(event);
            */
          });
        });
      });
    };

    const onDropped = (subscription, reason, error) => {
      console.trace(subscription, reason, error);
    };

    try {
      await this.eventStore.client.subscribeToStream(streamName, onEvent, onDropped, false);
    } catch (err) {
      console.trace(err);
    }
  }

  setEventHandlers(eventHandlers) {
    this.eventHandlers = eventHandlers;
  }
}
