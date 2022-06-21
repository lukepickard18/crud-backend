import mongoose from "mongoose";

// Institutions
const opId = new mongoose.mongo.ObjectId();
const eitId = new mongoose.mongo.ObjectId();
const mitId = new mongoose.mongo.ObjectId();

// Departments
const itId = new mongoose.mongo.ObjectId();
const nursingId = new mongoose.mongo.ObjectId();
const designId = new mongoose.mongo.ObjectId();
const foodId = new mongoose.mongo.ObjectId();
const chefId = new mongoose.mongo.ObjectId();
const PTId = new mongoose.mongo.ObjectId();
const PEId = new mongoose.mongo.ObjectId();
const SportsScienceId = new mongoose.mongo.ObjectId();
const hairdressingId = new mongoose.mongo.ObjectId();
const beautyId = new mongoose.mongo.ObjectId();


export { eitId, mitId, itId, nursingId, opId, designId, foodId, chefId, PTId, PEId, SportsScienceId, hairdressingId, beautyId };
