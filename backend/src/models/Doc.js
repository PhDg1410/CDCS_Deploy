import { Schema, model } from 'mongoose';

// create User Schema with username, email, password, createAt, experience
const DocSchema = new Schema({
    docName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
  
});

// Hash password before save

const Doc = model('Doc', DocSchema)

export default Doc;
