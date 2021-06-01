import IHouseAPI from './IHouseAPI';
import InvalidHouseError from './InvalidHouseError';

export default class HouseValidation
{
    protected houseApi: IHouseAPI

    setHouseAPI(houseApi: IHouseAPI): void
    {
        this.houseApi = houseApi;
    }

    async validateHouse(id: string): Promise<void>
    {
        if (!id) {
            throw new InvalidHouseError('Invalid house ID');
        }

        const invalid = await this.houseApi.validateHouse(id);

        if (invalid !== true) {
            throw new InvalidHouseError(`Invalid house ${id}`);
        }
    }
}