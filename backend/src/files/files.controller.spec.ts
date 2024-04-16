import { Test, TestingModule } from '@nestjs/testing';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UploadedFile } from './models/uploaded-file';
import { PrismaService } from '../prisma/prisma.service';
import { FileEntity } from './entities/file.entity';

describe('FilesController', () => {
  let controller: FilesController;
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilesController],
      providers: [
        FilesService,
        PrismaService,
        {
          provide: JwtAuthGuard,
          useValue: {
            canActivate: jest.fn().mockReturnValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<FilesController>(FilesController);
    service = module.get<FilesService>(FilesService);
  });

  it('should upload files successfully', async () => {
    const mockFiles: UploadedFile[] = [
      {
        originalname: 'test.pdf',
        mimetype: 'application/pdf',
        size: 5000,
        destination: 'uploads/',
        fieldname: 'files',
        encoding: '7bit',
        filename: 'test.pdf',
        path: 'uploads/test.pdf',
      },
    ];
    const mockTeamId = 1;

    const mockFile: FileEntity = {
      id: 1,
      name: 'test.pdf',
      filename: 'test.pdf',
      teamId: 1,
      size: 5000,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'uploadFiles').mockResolvedValue([mockFile]);

    const result = await controller.uploadFile(mockFiles, mockTeamId);

    expect(result).toEqual([mockFile]);
  });

  it('should get all files for a team successfully', async () => {
    const mockTeamId = 1;

    jest.spyOn(service, 'findAllForTeam').mockResolvedValue([]);

    const result = await controller.findAllForStudent(mockTeamId);

    expect(result).toEqual([]);
  });

  it('should delete a file successfully', async () => {
    const mockFile = {
      id: 1,
      name: 'test.pdf',
      filename: 'test.pdf',
      teamId: 1,
      size: 5000,
      createdAt: new Date(),
    };

    jest.spyOn(service, 'remove').mockResolvedValue(mockFile);

    const result = await controller.remove(mockFile.id);

    expect(result).toEqual(mockFile);
  });
});
