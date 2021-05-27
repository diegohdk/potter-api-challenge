import CharacterEntity from '../entities/CharacterEntity';
import IRepository from './IRepository';

/**
 * Character repository interface.
 */
export default interface ICharacterRepository extends IRepository
{
    list(filters?: any): Promise<CharacterEntity[]>
    getById(id: string): Promise<CharacterEntity>
    create(data: any): Promise<CharacterEntity>
    save(data: any): Promise<boolean>
    delete(id: string): Promise<boolean>
}