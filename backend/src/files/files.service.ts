import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadedFile } from './models/uploaded-file';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(private readonly prismaService: PrismaService) {}

  remove(id: number) {
    return this.prismaService.file.delete({
      where: {
        id,
      },
    });
  }

  findAllForGameMaster(id: number) {
    return this.prismaService.file.findMany({
      where: {
        gameId: id,
      },
    });
  }

  async uploadFiles(files: UploadedFile[], gameId: number) {
    const createdFiles: FileEntity[] = [];

    for (const file of files) {
      const createdFile = await this.prismaService.file.create({
        data: {
          size: file.size,
          name: file.originalname,
          filename: file.filename,
          gameId,
        },
      });

      createdFiles.push(createdFile);
    }

    return createdFiles;
  }
}
