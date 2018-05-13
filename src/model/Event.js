// @flow
import mongoose from 'mongoose';

const SchemaSchedule = new mongoose.Schema({
  talker: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  time: {
    type: Number,
    min: 0,
  },
});

const SchemaLocation = new mongoose.Schema({
  cep: {
    type: String,
  },
  geoLocation: {
    type: [String],
  },
});

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    location: {
      type: SchemaLocation,
    },
    publicLimit: {
      type: String,
    },
    image: {
      type: String,
    },
    schedule: [SchemaSchedule],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'event',
  },
);

export default mongoose.model('Event', Schema);
