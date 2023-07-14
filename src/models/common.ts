import { z } from "zod";

export const DatabaseIdSchema = z.strictObject({
  id: z.coerce.number().int().positive(),
});

export const DatabaseRecordSchema = DatabaseIdSchema.merge(
  z.strictObject({
    updatedAt: z.coerce.date(),
    createdAt: z.coerce.date(),
  })
);

export type DatabaseRecord = z.infer<typeof DatabaseRecordSchema>
// export interface IDatabaseRecord extends DatabaseRecord{}
