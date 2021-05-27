import HouseController from '../../../../controllers/HouseController';
import ExpressAdapter from '../../../../adapters/http/ExpressAdapter';
import { Router } from 'express';
import IHouseRepository from '../../../../core/repositories/IHouseRepository';
import { default as repos } from '../../../repositories';

export default (router: Router) => {
    const { HouseRepository } = repos;
    const repo: IHouseRepository = new HouseRepository();
    const controller = new HouseController(repo);
    const adapter = new ExpressAdapter(controller);
    const urn = '/houses';

    router.get(urn, adapter.create(controller.index));
    router.get(`${urn}/:id`, adapter.create(controller.read));
};