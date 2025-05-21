import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { JobCharacteristicsService } from './job-characteristics.service';
import { CreateJobCharacteristicDto } from './dto/create-job-characteristic.dto';
import { UpdateJobCharacteristicDto } from './dto/update-job-characteristic.dto';

@Controller('job-characteristics')
export class JobCharacteristicsController {
    constructor(private readonly service: JobCharacteristicsService){}

    @Post()
    create(@Body() dto:CreateJobCharacteristicDto){
        return this.service.create(dto);
    }
    @Get()
    findAll(){
        return this.service.findAll();
    }
    @Get(':id')
    findOne(@Param('id')id:string){
        return this.service.findOne(id);
    }
    @Patch(':id')
        update(@Param('id') id:string, @Body()dto: UpdateJobCharacteristicDto){
            return this.service.update(id, dto);
        }
    @Delete(':id')
    remove(@Param('id') id:string){
        return this.service.remove(id);
    }
}
