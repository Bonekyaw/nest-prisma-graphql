import { Injectable } from '@nestjs/common';
import { Prisma, Admin } from '@prisma/client';
import { unlink } from 'node:fs/promises';

import { DatabaseService } from '../database/database.service';
import { AdminArgs } from './dto/admins.args';
import { OffsetArgs } from './dto/offset.args';
import { MyLoggerService } from '../my-logger/my-logger.service';

/*
 * Pagination
 * There are two ways in pagination:
 * offset-based and cursor-based. Read here if you wish to know more
 * https://www.prisma.io/docs/orm/prisma-client/queries/pagination
 */

@Injectable()
export class AdminsService {
  constructor(private readonly prisma: DatabaseService) {}
  private readonly logger = new MyLoggerService(AdminsService.name);

  async findById(id: number) {
    return this.prisma.admin.findUnique({
      where: { id: id },
    });
  }

  async findByPhone(phone: string) {
    return this.prisma.admin.findUnique({
      where: { phone: phone },
    });
  }

  async create(adminData: Prisma.AdminCreateInput) {
    return this.prisma.admin.create({
      data: adminData,
    });
  }

  async update(id: number, updateAdminData: Prisma.AdminUpdateInput) {
    return this.prisma.admin.update({
      where: { id: id },
      data: updateAdminData,
    });
  }

  async updateProfile(admin: Admin, image: string) {
    const imageUrl = image.replace('\\', '/');
    if (admin.profile) {
      // Delete an old profile image because it accepts just one.

      try {
        await unlink(admin.profile);
      } catch (error) {
        this.logger.log(
          ` - Profile file is missing in this ${admin.phone}`,
          AdminsService.name,
        );
        const result = await this.prisma.admin.update({
          where: { id: admin.id },
          data: { profile: imageUrl },
        });
        return {
          message: 'Successfully uploaded the image.',
          profile: result.profile,
        };
      }
    }
    const result = await this.prisma.admin.update({
      where: { id: admin.id },
      data: { profile: imageUrl },
    });
    return {
      message: 'Successfully uploaded the image.',
      profile: result.profile,
    };
  }

  // *** This is Cursor-based Pagination ***

  async findByCursor(adminArgs: AdminArgs) {
    const cursor = adminArgs.cursor ? { id: +adminArgs.cursor } : null;
    const limit = +adminArgs.limit || 4; // Be aware of error overtaking db rows

    const filters = { status: 'active' };
    const fields = {
      id: true,
      name: true,
      phone: true,
      role: true,
      status: true,
      lastLogin: true,
      profile: true,
      createdAt: true,
    };
    // const relation = {};

    const options = { take: limit } as any;
    if (cursor) {
      options.skip = 1;
      options.cursor = cursor;
    }
    options.where = filters;
    options.orderBy = { id: 'asc' };
    options.select = fields;
    // if (relation) {
    //   options.include = relation;
    // }

    const results = await this.prisma.admin.findMany(options);

    const lastPostInResults = results.length ? results[limit - 1] : null; // Remember: zero-based index! :)
    const myCursor = results.length ? lastPostInResults.id : null;

    return {
      list: results,
      nextCursor: myCursor,
    };
  }

  // *** This is Offset-based Pagination ***

  async findByOffset(offsetArgs: OffsetArgs) {
    const page = +offsetArgs.page || 1;
    const limit = +offsetArgs.limit || 10;

    const offset = (page - 1) * limit;
    const filters = { status: 'active' };
    const fields = {
      id: true,
      name: true,
      phone: true,
      role: true,
      status: true,
      lastLogin: true,
      profile: true,
      createdAt: true,
    };
    // const relation = {};

    const count = await this.prisma.admin.count({ where: filters });
    const results = await this.prisma.admin.findMany({
      skip: offset,
      take: limit,
      where: filters,
      orderBy: { createdAt: 'desc' },
      select: fields,
      // include: relation,
    });

    return {
      total: count,
      list: results,
      currentPage: page,
      previousPage: page == 1 ? null : page - 1,
      nextPage: page * limit >= count ? null : page + 1,
      lastPage: Math.ceil(count / limit),
      countPerPage: limit,
    };
  }
}

// Unless you need to count, here it should be like this!

// const results = await this.prisma.admin.findMany({ ..., take: limit + 1, ... });
// let hasNextPage = false;
// if (results.length > limit) {
//   hasNextPage = true;
//   results.pop();
// }
// return {
//   data: results,
//   currentPage: page,
//   previousPage: page == 1 ? null : page - 1,
//   nextPage: hasNextPage ? page + 1 : null,
//   countPerPage: limit,
// };
