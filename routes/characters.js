'use strict';

const Character = require('../controllers/Character');

module.exports = router => {
    const controller = new Character(router);
    
    router.get('/', controller.index);          // ;)
    router.post('/', controller.create);        // C
    router.get('/:id', controller.read);        // R
    router.put('/:id', controller.update);      // U
    router.delete('/:id', controller.delete);   // D
};