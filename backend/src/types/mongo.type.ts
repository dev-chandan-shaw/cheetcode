export type DeleteResult = {
    /** Indicates whether this write result was acknowledged. If not, then all other members of this result will be undefined. */
    acknowledged: boolean;
    /** The number of documents that were deleted */
    deletedCount: number;
}

export type BulkWriteResult={
    /** Number of documents inserted. */
    readonly insertedCount: number;
    /** Number of documents matched for update. */
    readonly matchedCount: number;
    /** Number of documents modified. */
    readonly modifiedCount: number;
    /** Number of documents deleted. */
    readonly deletedCount: number;
    /** Number of documents upserted. */
    readonly upsertedCount: number;
}