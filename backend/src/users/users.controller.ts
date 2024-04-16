import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { from, map } from 'rxjs';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'The record has been successfully created.',
  })
  @ApiOperation({ summary: 'Create new user' })
  create(@Body() createUserDto: CreateUserDto) {
    return from(this.usersService.create(createUserDto)).pipe(
      map((user: UserEntity) => new UserEntity(user)),
    );
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity, description: 'Get a user by ID' })
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return from(this.usersService.findOne(id)).pipe(
      map((user: User) => new UserEntity(user)),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCreatedResponse({
    type: UserEntity,
    description: 'The record has been successfully updated.',
  })
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiBearerAuth()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return from(this.usersService.update(id, updateUserDto)).pipe(
      map((user: UserEntity) => new UserEntity(user)),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({
    type: UserEntity,
    description: 'The record has been deleted',
  })
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  remove(@Param('id', ParseIntPipe) id: number) {
    return from(this.usersService.remove(id)).pipe(
      map((user: UserEntity) => new UserEntity(user)),
    );
  }
}
