import { Controller, Get, Param } from '@nestjs/common';
import NestAdapter from '../../../../adapters/http/NestAdapter';
import HouseController from '../../../../controllers/HouseController';
import IHouseRepository from '../../../../core/repositories/IHouseRepository';
import { default as repos } from '../../../repositories';

@Controller('houses')
export default class HouseNestController
{
    constructor(
        private readonly controller: HouseController,
        private readonly adapter: NestAdapter
    )
    {
        const { HouseRepository } = repos;
        const repo: IHouseRepository = new HouseRepository();
        this.controller = new HouseController(repo);
        this.adapter = new NestAdapter(this.controller);
    }

    @Get()
    index()
    {
        return this.adapter.create(this.controller.index)
    }

    @Get(':id')
    read(@Param('id') id: string)
    {
        return this.adapter.create(this.controller.read, { params: { id } })
    }
}
