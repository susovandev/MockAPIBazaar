import { isValidObjectId, ObjectId } from 'mongoose';

export const isValidMongoObjectId = (mongoId: ObjectId): boolean => {
    return isValidObjectId(mongoId);
};
