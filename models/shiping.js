const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const ShipingSchema = new Schema({
    date: String,
    shipingID: String,
    status: String,
    packageType: String,
    pickup: String,
	dropoff: String,
	weight: String,
	email: String,
	amount: String,
  });
  
  const Shiping = mongoose.model('shiping', ShipingSchema);

  module.exports = Shiping;