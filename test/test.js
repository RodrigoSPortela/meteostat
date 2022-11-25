const index = require('../index');

// const event = require('./events/event1.json');

(async () => {
  
  const context = {

    functionName: 'meteostat_function'

  };

  await index.handler(context);

})();

