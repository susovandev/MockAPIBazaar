import { isValidObjectId } from 'mongoose';

export const isValidMongoObjectId = (mongoId: string): boolean => {
    return isValidObjectId(mongoId);
};
