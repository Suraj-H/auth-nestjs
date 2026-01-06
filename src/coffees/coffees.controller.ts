import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Auth } from 'src/iam/authentication/decorators/auth.decorator';
import { AuthType } from 'src/iam/authentication/enums/auth-type.enum';
import { Policies } from '../iam/authorization/decorators/policies.decorator';
import { Roles } from '../iam/authorization/decorators/role.decorator';
import { OrganizationContributorPolicy } from '../iam/authorization/policies/types/organization-contributor.policy';
import { Role } from '../users/enums/role.enum';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Auth(AuthType.NONE)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  @Roles(Role.ADMIN)
  @Policies(new OrganizationContributorPolicy())
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(createCoffeeDto);
  }

  @Get()
  findAll() {
    return this.coffeesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(+id);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(+id, updateCoffeeDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(+id);
  }
}
