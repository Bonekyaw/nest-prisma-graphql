import { BadRequestException } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

import { AdminsService } from './admins.service';
import { Cursor } from './model/cursor.model';
import { Offset } from './model/offset.model';
import { Profile } from './model/profile.model';
import { AdminArgs } from './dto/admins.args';
import { OffsetArgs } from './dto/offset.args';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../auth/constants/role.enum';
import { User } from '../auth/decorators/user.decorator';

@Roles(Role.Editor, Role.Admin) // Other roles can't get access
@Resolver('Admin')
export class AdminsResolver {
  constructor(private readonly adminsService: AdminsService) {}

  @Query(() => Cursor, { name: 'admins' })
  async findByCursor(@Args() adminArgs: AdminArgs) {
    return this.adminsService.findByCursor(adminArgs);
  }

  @Query(() => Offset, { name: 'adminsByoffset' })
  async findByOffset(@Args() offsetArgs: OffsetArgs) {
    return this.adminsService.findByOffset(offsetArgs);
  }

  @Mutation(() => Profile)
  async updateProfile(
    @User() user,
    @Args('file', { type: () => GraphQLUpload, nullable: true })
    file?: GraphQLUpload,
  ) {
    // console.log('image!', file);
    if (!file) {
      throw new BadRequestException(
        'Fail to upload file. Check it out, please.!',
      );
    }
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      const imageUrl = await this.storeImageAndGetURL(file);
      return this.adminsService.updateProfile(user, imageUrl);
    } else {
      throw new BadRequestException(
        'Fail to upload file. Check it out, please.!',
      );
    }
  }

  private async storeImageAndGetURL(file: GraphQLUpload): Promise<string> {
    const { createReadStream, filename } = await file;
    const uniqueFilename = `${uuidv4()}_${filename}`;
    const imagePath = join(process.cwd(), 'public/images', uniqueFilename);
    const imageUrl = `public/images/${uniqueFilename}`;
    const readStream = createReadStream();
    readStream.pipe(createWriteStream(imagePath));

    return imageUrl;
  }
}
