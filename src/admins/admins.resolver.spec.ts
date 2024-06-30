import { Test, TestingModule } from '@nestjs/testing';
import { AdminsResolver } from './admins.resolver';
import { AdminsService } from './admins.service';

describe('AdminsResolver', () => {
  let resolver: AdminsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminsResolver, AdminsService],
    }).compile();

    resolver = module.get<AdminsResolver>(AdminsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
