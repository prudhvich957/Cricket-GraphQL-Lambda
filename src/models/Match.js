const mongoose = require("mongoose");

const MatchSchema = new mongoose.Schema({
  league: { type: mongoose.SchemaTypes.String },
  match_Id: { type: mongoose.SchemaTypes.Number },

  matchdate_ist: { type: mongoose.SchemaTypes.Date },
  matchtype: { type: mongoose.SchemaTypes.String },

  parent_id: { type: mongoose.SchemaTypes.Number },
  parent_name: { type: mongoose.SchemaTypes.String },

  stage: { type: mongoose.SchemaTypes.String },

  teama: { type: mongoose.SchemaTypes.String },
  teama_Id: { type: mongoose.SchemaTypes.Number },
  teamb: { type: mongoose.SchemaTypes.String },
  teamb_Id: { type: mongoose.SchemaTypes.Number },

  tourname: { type: mongoose.SchemaTypes.String },
  venue: { type: mongoose.SchemaTypes.String },
});

const Match = mongoose.model("Match", MatchSchema, "match_info");

module.exports = Match;
