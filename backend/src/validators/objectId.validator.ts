import { Types } from "mongoose";
import { ErrorHelper, ForbiddenError } from "../helpers/error.helper";

export default async function validateObjectId(id: string): Promise<boolean> {
    let isValid: boolean = false;
    try {
        isValid = await Types.ObjectId.isValid(id);
        if (!isValid)
            throw new ForbiddenError(`Invalid id: ${id}`);
        return isValid;
    } catch (error: any) {
        throw new ErrorHelper().customError(error);
    }
}