const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String, 
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    postCode: {
        type: String, 
        required: true,
    },
    gender: {
        type: String,
        enum: ['female', 'male', 'other'], 
        required: true,
    },
    preferredCinema: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cinema',
        required: true,
    },
    receiveOffers: {
        type: Boolean,
        default: false,
    },
    agreeTerms: {
        type: Boolean,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    favorites: Array,
    orders: Array,
    isVerified: {
      type: Boolean,
      default: false
    },
    role: {
        type: String,
        enum: ['admin','super-admin','client',],
        default:'client'
      },
},
{ timestamps: true }
);

module.exports = UserSchema;