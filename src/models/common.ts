import { z } from "zod";

export const DatabaseIdSchema = z.strictObject({
  id: z.number().int().positive(),
});

export const DatabaseRecordSchema = DatabaseIdSchema.merge(
  z.strictObject({
    updatedAt: z.date(),
    createdAt: z.date(),
  })
);

export type DatabaseRecord = z.infer<typeof DatabaseRecordSchema>
// export interface IDatabaseRecord extends DatabaseRecord{}
