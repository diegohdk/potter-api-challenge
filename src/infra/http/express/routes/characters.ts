import CharacterController from '../../../../controllers/CharacterController';
import ExpressAdapter from '../../../../adapters/http/ExpressAdapter';
import { Router } from 'express';
import HouseAPI from '../../../../adapters/api/HouseAPI';
import ICharacterRepository from '../../../../core/repositories/ICharacterRepository';
import IHouseRepository from '../../../../core/repositories/IHouseRepository';
import { default as repos } from '../../../repositories';

export default (router: Router): void => {
    const { CharacterRepository, HouseRepository } = repos;
    const characterRepo: ICharacterRepository = new CharacterRepository();
    const houseRepo: IHouseRepository = new HouseRepository();
    const houseApi = new HouseAPI(houseRepo);
    const controller = new CharacterController(characterRepo, houseApi);
    const adapter = new ExpressAdapter(controller);
    const urn = '/characters';

    router.get(urn, adapter.create(controller.index));
    router.post(urn, adapter.create(controller.create));
    router.get(`${urn}/:id`, adapter.create(controller.read));
    router.put(`${urn}/:id`, adapter.create(controller.update));
    router.delete(`${urn}/:id`, adapter.create(controller.delete));
};