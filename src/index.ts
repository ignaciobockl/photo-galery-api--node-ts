import app from './app';
import { startConnection } from './database/database';
import { normalizePort } from './helpers/connection';



async function main() {

  startConnection();

  await app.listen(normalizePort( app.get('port') ));
  console.log('Server run on port', app.get('port'));

}


main();

