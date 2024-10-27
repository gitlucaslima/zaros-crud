export class Mapper {
    static toDTO<T, U>(entity: T, mapperFunction: (entity: T) => U): U {
        return mapperFunction(entity);
    }

    static toDTOArray<T, U>(entities: T[], mapperFunction: (entity: T) => U): U[] {
        return entities.map(mapperFunction);
    }
}