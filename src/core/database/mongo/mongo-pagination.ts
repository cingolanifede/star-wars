import { Model, Types } from 'mongoose';
import { PaginationOrderDir } from '../../enums/pagination';
import { PaginationDto } from '../../dto/pagination.dto';
import { PaginatedData } from '../../interfaces';

export const sortResults = ({
  orderBy = 'createdAt',
  orderByDir = PaginationOrderDir.ASC,
}: {
  orderBy?: string;
  orderByDir?: PaginationOrderDir;
}) => {
  return {
    $sort: {
      [orderBy]: orderByDir === PaginationOrderDir.ASC ? 1 : -1,
    },
  };
};

export const paginateResults = ({ limit = 0, skip = 0 }: { limit?: number; skip?: number }) => {
  const pagination = [];

  if (skip >= 0) {
    pagination.push({ $skip: skip });
  }

  if (limit > 0) {
    pagination.push({ $limit: limit });
  }

  return {
    $facet: {
      metadata: [{ $count: 'count' }],
      data: pagination,
    },
  };
};

const collation = {
  locale: 'en',
};

export const paginateData = async <T>(
  args: {
    pagination: Partial<PaginationDto>;
    model: Model<T>;
    projection?: any;
  },
  query = {},
): Promise<PaginatedData<T>> => {
  const { pagination = {}, model } = args || {};
  const { limit, skip } = pagination;
  const projection = args.projection ? [args.projection] : [];

  const isEmpty = (object: any): boolean => {
    return Object.keys(object).length === 0;
  };

  const getMatchObject = (query: any) => {
    if (!query || (query && isEmpty(query))) {
      return { $match: {} };
    }
    const arr = [];
    let obj = {};
    Object.keys(query).forEach((key) => {
      if (key === 'id') {
        arr.push({ _id: new Types.ObjectId(query[key]) });
        obj = { $match: { $or: arr } };
        return;
      } else {
        obj = { $match: { [key]: { $regex: `${query[key]}`, $options: 'i' } } };
      }
    });
    return obj;
  };

  try {
    const aggregation = [getMatchObject(query), sortResults(pagination), ...projection, paginateResults(pagination)];
    const results = await model
      .aggregate<{
        metadata: { count: number };
        data: T[];
      }>(aggregation, { collation })
      .exec();
    const { metadata = {}, data = [] } = results[0] || {};
    const { count = 0 } = metadata?.[0] || {};

    const startIndex = limit >= 0 ? skip || 0 : 0;
    const endIndex = data.length + startIndex;

    return {
      data: data.map((d) => {
        return new model(d);
      }),
      pagingMeta: {
        count,
        startIndex,
        endIndex,
        hasNextPage: endIndex < count,
      },
    };
  } catch (error) {
    console.error('error:', error);
  }
};
