import { Test, TestingModule } from '@nestjs/testing';
import { FilesService } from './files.service';
import { PrismaService } from '../prisma/prisma.service';

describe('FilesService', () => {
  let service: FilesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilesService,
        {
          provide: PrismaService,
          useValue: {
            file: {
              delete: jest.fn(),
              findMany: jest.fn(),
              createMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<FilesService>(FilesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should remove file successfully', async () => {
    const mockFile = {
      id: 1,
      name: 'test.pdf',
      teamId: 1,
      size: 5000,
      filename: 'test.pdf',
      createdAt: new Date(),
    };
    jest.spyOn(prisma.file, 'delete').mockResolvedValue(mockFile);

    const result = await service.remove(1);

    expect(result).toEqual(mockFile);
  });

  it('should find all files for a team successfully', async () => {
    const mockFiles = [
      {
        id: 1,
        name: 'test.pdf',
        teamId: 1,
        size: 5000,
        createdAt: new Date(),
        filename: 'test.pdf',
      },
    ];
    jest.spyOn(prisma.file, 'findMany').mockResolvedValue(mockFiles);

    const result = await service.findAllForTeam(1);

    expect(result).toEqual(mockFiles);
  });
});
