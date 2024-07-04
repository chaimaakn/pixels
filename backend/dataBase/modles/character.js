const mongoose = require("mongoose");

const CharactersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  Abilities: {
    type: [String], // Définir comme tableau de chaînes de caractères
    required: true,
  },
  PowerLevel: {
    type: Number,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Lifes: {
    type: Number,
    required: true,
  },
  Mana: {
    type: Number,
    required: true,
  },
  Armor: {
    type: Number,
    required: true,
  },
  Speed: {
    type: Number,
    required: true,
  },
  Equipment: {
    type: [String], // Définir comme tableau de chaînes de caractères
    required: true,
  },
  Rank: {
    type: String,
    required: true,
  },
  Origin: {
    type: String,
    required: true,
  },
  Released: {
    type: Boolean,
    required: true,
  },
});

const CharactersModel = mongoose.model(
  "Character", CharactersSchema
);
module.exports = CharactersModel;