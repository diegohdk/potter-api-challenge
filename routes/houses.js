'use strict';

const House = require('../controllers/House');

module.exports = router => {
    const controller = new House(router);
    
    router.get('/', controller.index);
    router.get('/:uid', controller.read);
};