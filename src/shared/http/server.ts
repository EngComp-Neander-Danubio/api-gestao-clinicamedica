import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from '../typeorm'

dataSource.initialize().then(() => {
  const server = app.listen(process.env.PORT, () => {
    console.log(`server listening on port, ${process.env.PORT}`);
  }
  )
})
