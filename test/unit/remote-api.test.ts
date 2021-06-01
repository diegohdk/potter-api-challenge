import { expect } from 'chai';
import HouseAPI from '../../src/adapters/api/HouseAPI';
import IHouseRepository from '../../src/core/repositories/IHouseRepository';
import { default as repos } from '../../src/infra/repositories';

describe('Remote API tests', () => {
    const validHouseId = '1760529f-6d51-4cb1-bcb1-25087fce5bde';
    const invalidHouseId = '321321-546487-8954954';
    const { HouseRepository } = repos;
    const houseRepo: IHouseRepository = new HouseRepository();
    const api:HouseAPI = new HouseAPI(houseRepo);

    it('should find a house on remote API', async () => {
        const found = await api.findHouseOnRemote(validHouseId);
        expect(found).to.be.true;
    }).timeout(10000);

    it('should not find a house on remote API', async () => {
        const found = await api.findHouseOnRemote(invalidHouseId);
        expect(found).to.be.false;
    }).timeout(10000);

    it('should find a house on local DB', async () => {
        const found = await api.findHouseOnLocal(validHouseId);
        expect(found).to.be.true;
    });

    it('should not find a house on local DB', async () => {
        const found = await api.findHouseOnLocal(invalidHouseId);
        expect(found).to.be.false;
    });

    it('should find a house with circuit breaker', async () => {
        const found = await api.validateHouse(validHouseId);
        expect(found).to.be.true;
    });

    it('should not find a house with circuit breaker', async () => {
        const found = await api.validateHouse(invalidHouseId);
        expect(found).to.be.false;
    });
});