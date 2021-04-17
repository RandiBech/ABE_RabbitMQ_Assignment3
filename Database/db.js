const mongoose = require('mongoose');
const rabbitHotels = require('./seedData');
var Hotel = require('./models/hotel');


let dbUrl = 'mongodb+srv://dbMads:Rf0e3duLljH7u4fH@teamabecluster.gk0mk.mongodb.net/HotelFour';
if (process.env.NODE_ENV === 'production') {
    dbUrl = process.env.MONGODB_URI;
}

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbUrl}`);
});
mongoose.connection.on('error', err => {
    console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnected through ${msg}`);
        callback();
    });
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});

// For app termination
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});


async function findDummyData() {

    try {
        let savedDocument = await Hotel.find({});
        console.log(savedDocument);
    } catch (err) {
        console.log(err)
    }

}
//findDummyData();

async function createDummyData() {

    const db = mongoose.connection;

    try {
        let savedDocument = await Hotel.create(rabbitHotels);
        console.log(savedDocument);
    } catch (err) {
        console.log(err)
    } finally {
        await db.close();
    }

}

// createDummyData(); 
