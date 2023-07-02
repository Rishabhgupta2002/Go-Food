const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://Rishabh:Rishabh2002@cluster0.0sccqjx.mongodb.net/Gofood?retryWrites=true&w=majority"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to MongoDB");
        let fetched_data = mongoose.connection.db.collection("fooditems");
        let data=await fetched_data.find({}).toArray();
        let foodCategory = mongoose.connection.db.collection("foodCategory");
        let catData=await foodCategory.find({}).toArray();
        // console.log(data);
        global.fooditems=data;
        global.foodCategory=catData;
        // console.log(fooditems);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }

}
module.exports = connectToMongo;