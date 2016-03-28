var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieSchema = new Schema({
  doctor: String,
  title: String,
  language: String,
  country: String,
  summary: String,
  flash: String,
  poster: String,
  year: Number,
  category: {
    type: ObjectId,
    ref: 'Category'
  },
  meta: {
    createdAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }

});

MovieSchema.pre('save', function(next){
  if(this.isNew){
    this.meta.createdAt = this.meta.updatedAt = Date.now();
  }
  else{
    this.meta.updatedAt = Date.now();
  }

  next();
});

MovieSchema.statics = {
  fetch: function(cb){
    return this
    .find({})
    .sort('meta.updatedAt')
    .exec(cb)
  },
  findById: function(id, cb){
    return this
    .findOne({_id: id})
    .exec(cb)
  }
};

module.exports = MovieSchema;