import { z } from "zod";
import { DatabaseRecordSchema, DatabaseIdSchema } from "./common.js";
import { CLIParameters } from "./CLIParameters.js";

export const CreateProjectInputSchema = z.strictObject({
  name: z.string().trim().min(3, {message: "Name must be at least 3 characters long"}),
  url: z.string().trim().url({message: "Must be a valid URL"}).includes("youtube.com", {message: "The URL must be a Youtube URL"}),
  thumbnail: z.string().nonempty().nullable().optional()
});

export const UpdateProjectInputSchema =
  CreateProjectInputSchema.partial().merge(DatabaseIdSchema);

const ProjectSchema = DatabaseRecordSchema.merge(CreateProjectInputSchema);

export type createProjectInput = z.infer<typeof CreateProjectInputSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type ProjectWithParameters = Project & {
  cliParameters: CLIParameters[];
};
export type UpdateProjectInput = z.infer<typeof UpdateProjectInputSchema>;
