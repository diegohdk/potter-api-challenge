import NotFoundError from '../../../common/errors/NotFoundError';
import IEntityType from './IEntityType';

export default class Collection<Entity extends IEntityType>
{
    private items: Entity[] = []
    private currentId: number = 0;

    private get nextId(): string
    {
        const id:number = ++this.currentId;
        return `${id.toString().padStart(4, '0')}-${Date.now()}`;
    }

    find(filters: any = {}): Entity[]
    {
        const filtersKeys = Object.keys(filters);
        return this.items.filter(item => {
            if (filtersKeys.length > 0) {
                return filtersKeys.every(key => (item[key] ?? false) && item[key] === filters[key]);
            } else {
                return true;
            }
        }).sort((a, b) => a.id < b.id ? 1 : -1);
    }

    findById(id: string): Entity
    {
        return this.items.find(item => item.id === id);
    }

    create(data: any): Entity
    {
        const record = {
            ...data,
            id: data.uid || this.nextId,
            createdAt: new Date(),
            updatedAt: null
        };

        this.items.push(record);
        return record;
    }

    update(id: string, data: any): Entity
    {
        const record = this.findById(id);

        if (!record) {
            throw new NotFoundError();
        }

        Object.keys(data).forEach(key => record[key] = data[key]);
        record.updatedAt = new Date();

        return record;
    }

    delete(id: string): Entity
    {
        const index = this.items.findIndex(item => item.id === id);

        if (index === -1) {
            throw new NotFoundError();
        }

        return this.items.splice(index, 1)[0];
    }

    exists(id: string): boolean
    {
        return this.items.some(item => item.id === id);
    }
}