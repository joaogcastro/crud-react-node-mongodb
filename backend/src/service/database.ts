import mongoose from "mongoose";
import { Logger } from "../utils/logger";

const logger = new Logger();

export const connect = (databaseUrl: string) =>{
    mongoose.connect(databaseUrl)
    const database = mongoose.connection
    
    database.on('error', (error) => {
      console.log(error)
    })
    
    database.once('connected', () => {
      logger.info('Database Connected');
    })    
}
