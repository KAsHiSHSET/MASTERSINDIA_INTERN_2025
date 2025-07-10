const mongoose = require('mongoose');

async function testMongo() {
  try {
    await mongoose.connect('mongodb://localhost:27017/testdb');

    const testSchema = new mongoose.Schema({ name: String });
    const TestModel = mongoose.model('Test', testSchema);

    await TestModel.create({ name: 'Mongoose Node 20 Test' });

    const docs = await TestModel.find();
    console.log('✅ Mongoose Connected & Data:', docs);

    await mongoose.connection.close();
  } catch (err) {
    console.error('❌ Mongoose Error:', err);
  }
}

testMongo();
