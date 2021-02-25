'use strict';

const meld = require('meld');
const path = require('path');

/**
 * Base controller class.
 */
class Controller
{
    /**
     * Methods to intercept from the router.
     *
     * @type {Array}
     */
    get ROUTER_METHODS()
    {
        return [
            'all',
            'get',
            'post',
            'put',
            'head',
            'delete',
            'trace',
            'options',
            'connect',
            'patch'
        ];
    }

    /**
     * Class constructor.
     * 
     * @param {express.Router} router Router instance.
     */
    constructor(router)
    {
        this.router = router;
        this.model = null;
        this.addInterceptors();
        this.loadModel();
    }

    /**
     * Uses AOP to add additional behavior to handle unexpected 
     * errors from the given router.
     */
    addInterceptors()
    {
        this.ROUTER_METHODS.forEach(method => meld.around(this.router, method, this.addWrapper.bind(this)));
    }

    /**
     * Adds a wrapper function to each route, to handle exceptions.
     *
     * @param {Object} jointPoint Joint point.
     */
    async addWrapper(jointPoint)
    {
        const originalHandler = jointPoint.args[1].bind(this);
        const newHandler = (...args) => originalHandler(...args).catch(args[2]); // args is [req, res, next]
        jointPoint.args.splice(1, 1, newHandler);
        jointPoint.proceed();
    }

    /**
     * Loads the model associated with the controller.
     * 
     * The model must to have the same name as the controller.
     */
    loadModel()
    {
        const modelPath = path.resolve(process.cwd(), 'models', this.constructor.name);
        const ModelClass = require(modelPath);
        const instance = new ModelClass;
        this.model = instance.model;
    }

    /**
     * Sends the response back to the client.
     * 
     * @param {ServerResponse} res HTTP response instance.
     * @param {Object} data Response data.
     * @param {Number} status Response status.
     */
    send(res, data, status)
    {
        if (status) {
            res.status(status);
        }

        if (data) {
            res.json(data);
        } else {
            res.end();
        }
    }
}

module.exports = Controller;