import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import HouseAPI from '../../../../adapters/api/HouseAPI';
import NestAdapter from '../../../../adapters/http/NestAdapter';
import CharacterController from '../../../../controllers/CharacterController';
import ICharacterRepository from '../../../../core/repositories/ICharacterRepository';
import IHouseRepository from '../../../../core/repositories/IHouseRepository';
import { default as repos } from '../../../repositories';

@Controller('characters')
export default class CharacterNestController
{
    constructor(
        private readonly controller: CharacterController,
        private readonly adapter: NestAdapter,
    )
    {
        const { CharacterRepository, HouseRepository } = repos;
        const characterRepo: ICharacterRepository = new CharacterRepository();
        const houseRepo: IHouseRepository = new HouseRepository();
        const houseApi = new HouseAPI(houseRepo);
        this.controller = new CharacterController(characterRepo, houseApi);
        this.adapter = new NestAdapter(this.controller);
    }

    @Get()
    index(@Query('house') house: string)
    {
        return this.adapter.create(this.controller.index, { query: { house } })
    }

    @Get(':id')
    read(@Param('id') id: string)
    {
        return this.adapter.create(this.controller.read, { params: { id } })
    }

    @Post()
    create(@Body() body: any)
    {
        return this.adapter.create(this.controller.create, { body })
    }

    @Put(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    update(@Param('id') id: string, @Body() body: any)
    {
        return this.adapter.create(this.controller.update, { params: { id }, body })
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id') id: string)
    {
        return this.adapter.create(this.controller.delete, { params: { id } })
    }
}
