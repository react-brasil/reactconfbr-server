// @flow

import { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import { globalIdField } from 'graphql-relay';
import { NodeInterface } from '../interface/NodeInterface';
import ScheduleType from './ScheduleType';
import UserType from './UserType';
import { UserLoader } from '../loader';
import type { EventType } from '../loader/EventLoader';
import LocationType from './LocationType';

export default new GraphQLObjectType({
  name: 'Event',
  description: 'Event data',
  fields: () => ({
    id: globalIdField('Event'),
    _id: {
      type: GraphQLString,
      resolve: (obj: EventType) => obj._id,
    },
    title: {
      type: GraphQLString,
      resolve: (obj: EventType) => obj.title,
    },
    description: {
      type: GraphQLString,
      resolve: (obj: EventType) => obj.description,
    },
    date: {
      type: GraphQLString,
      resolve: (obj: EventType) => obj.date,
    },
    location: {
      type: LocationType,
      resolve: obj => obj.location,
    },
    publicLimit: {
      type: GraphQLString,
      resolve: (obj: EventType) => obj.publicLimit,
    },
    isOwner: {
      type: GraphQLString,
      resolve: (obj: EventType, args, context) => {
        const { user } = context;
        return obj.createdBy.equals(user._id);
      },
    },
    image: {
      type: GraphQLString,
      description: 'event image',
      resolve: (obj: EventType) => obj.image,
    },
    schedule: {
      type: new GraphQLList(ScheduleType),
      description: 'schedule',
      resolve: (obj: EventType) => obj.schedule,
    },
    publicList: {
      type: new GraphQLList(UserType),
      description: 'Users that attended to the event',
      resolve: (obj: EventType, args, context) => {
        const usersArray = obj.publicList.map(people => UserLoader.load(context, people));
        return obj.publicList.length >= 1 ? usersArray : [];
      },
    },
    notGoingList: {
      type: new GraphQLList(UserType),
      description: 'Users that cant go to the event',
      resolve: (obj, args, context) => {
        const usersArray = obj.notGoingList.map(people => UserLoader.load(context, people));
        return obj.notGoingList.length >= 1 ? usersArray : [];
      },
    },
    waitList: {
      type: new GraphQLList(UserType),
      description: 'Users that are waiting for places on the event',
      resolve: (obj, args, context) => {
        const usersArray = obj.waitList.map(people => UserLoader.load(context, people));
        return obj.waitList.length >= 1 ? usersArray : [];
      },
    },
    isEventAttended: {
      type: GraphQLBoolean,
      description: 'Check if user attended to the event',
      resolve: (obj, args, context) => obj.publicList.includes(context.user._id.toString()),
    },
  }),
  interfaces: () => [NodeInterface],
});
