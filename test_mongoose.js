
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

async function test() {
    await mongoose.connect('mongodb://localhost:27017/test_db', { useNewUrlParser: true, useUnifiedTopology: true });

    const TestSchema = new Schema({
        name: String,
        age: Number
    });
    const Test = mongoose.model('Test', TestSchema);

    const doc = await Test.create({ name: 'Old Name', age: 20 });
    console.log('Created:', doc);

    try {
        const body = { _id: doc._id, name: 'New Name', age: 21, __v: 0 };
        const updated = await Test.findByIdAndUpdate(doc._id, body, { new: true });
        console.log('Updated with _id in body:', updated);
    } catch (err) {
        console.error('Update with _id in body failed:', err.message);
    }

    await mongoose.connection.close();
}

test();
