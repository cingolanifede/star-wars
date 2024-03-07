/* eslint-disable @typescript-eslint/ban-types */
import { Test, TestingModule } from '@nestjs/testing';
import { CharacterService } from './service/character.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CharacterRepository } from './character.repository';
import { ConfigService } from '@nestjs/config';
import { Character } from './entities/character.entity';
import { NotFoundException } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<CharacterRepository> =
  jest.fn(() => ({
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findById: jest.fn(),
    checkIfExist: jest.fn(),
    findAll: jest.fn(),
    findAllPaginated: jest.fn(),
  }));

export const mockConfigService = () => ({
  get: jest.fn(),
});

describe('CharacterService', () => {
  let service: CharacterService;

  const mockCharacter = {
    id: '65e9bb35d4afff0aa047bffb',
    name: 'char1',
    species: 'ran',
    location: '65e75a985c1ad5ea43822b79',
  };
  const responseMock = { ...mockCharacter, sensitivity: 8 } as any;

  const mockInputPagination = {
    args: {},
    paging: { limit: 10, skip: 0, orderByDir: 'ASC' },
  };
  const pagingMockData = {
    count: 1,
    startIndex: 0,
    endIndex: 1,
    hasNextPage: false,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      providers: [
        CharacterService,
        {
          provide: CharacterRepository,
          useValue: repositoryMockFactory,
        },
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of characters with pagination', async () => {
      jest
        .spyOn(service, 'findPaginated')
        .mockImplementation(() => mockInputPagination as any)
        .mockResolvedValueOnce({
          pagingMeta: pagingMockData,
          data: [responseMock],
        });
      jest.spyOn(service, 'findAllPaginated').mockImplementation();

      const result = await service.findPaginated({
        pagination: mockInputPagination,
      } as any);

      expect(service.findPaginated).toHaveBeenCalledWith({
        pagination: mockInputPagination,
      });

      expect(result).toEqual({
        pagingMeta: pagingMockData,
        data: [responseMock],
      });
    });
  });

  describe('create', () => {
    it('should create and return a character', async () => {
      const newChar = {
        name: 'char1',
        species: 'ran',
        sensitivity: 8,
        location: '65e75a985c1ad5ea43822b79',
      };

      jest
        .spyOn(service, 'create')
        .mockImplementationOnce(() => Promise.resolve(responseMock));
      const result = await service.create(newChar as unknown as Character);
      expect(result).toEqual(responseMock);
      expect(service.create).toHaveBeenCalled();
    });
  });

  describe('findById', () => {
    it('should find and return a character by id', async () => {
      jest
        .spyOn(service, 'findById')
        .mockImplementationOnce(() => Promise.resolve(responseMock));

      const result = await service.findById(mockCharacter.id);

      expect(service.findById).toHaveBeenCalledWith(mockCharacter.id);
      expect(service.findById).toHaveBeenCalled();
      expect(result).toEqual(responseMock);
    });
  });

  describe('updateById', () => {
    it('should update and return a character', async () => {
      const updatedCharacter = { ...mockCharacter, sensitivity: 4 };
      const newData = { sensitivity: 4 };

      jest
        .spyOn(service, 'update')
        .mockResolvedValue(updatedCharacter as unknown as Character);

      const result = await service.update(mockCharacter.id, newData as any);

      expect(service.update).toHaveBeenCalledWith(
        mockCharacter.id,
        newData as any,
      );
      expect(service.update).toHaveBeenCalled();
      expect(result.sensitivity).toEqual(newData.sensitivity);
    });
  });

  describe('deleteById', () => {
    it('should delete and return a character', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(responseMock);

      const result = await service.remove(mockCharacter.id);

      expect(service.remove).toHaveBeenCalledWith(mockCharacter.id);
      expect(result).toEqual(responseMock);
    });
  });

  it('should throw NotFoundException if character is not found', async () => {
    //Workarround in service to throw error
    jest.spyOn(service, 'checkIfExist').mockRejectedValue(null);

    await expect(service.findById(mockCharacter.id)).rejects.toThrow(
      NotFoundException,
    );
  });
});
