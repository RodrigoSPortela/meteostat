const index = require('../index');

// const event = require('./events/event1.json');

(async () => {
  
  const context = {

    functionName: 'meteostat_function'

  };
  const req = 'Arisaaaaaaa!!'

  await index.handler(req, context);

})();

