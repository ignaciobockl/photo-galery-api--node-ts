import mongoose, { Error } from 'mongoose';
import dotenv from 'dotenv';


// dotenv
dotenv.config();

const uri: string = process.env.MONGODB_URI || 'null';

export async function startConnection() {
    
    try {
        if ( uri === 'null' ) {
            throw new Error('the url provided for mongo database connection are incorrect or null');
        }
        await mongoose.connect( uri );
        console.log('Database is connected...');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to connect to database.');
    }

}

