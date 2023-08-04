import { z } from "zod";
import { DatabaseRecordSchema } from "./common.js";
import { CLIParameters } from "./CLIParameters.js";

export const CreateProjectInputSchema = z.strictObject({
  name: z
    .string()
    .trim()
    .min(3, { message: "Name must be at least 3 characters long" }),
  url: z
    .string()
    .trim()
    .url({ message: "Must be a valid URL" })
    .includes("youtube.com", { message: "The URL must be a Youtube URL" }),
});

export const UpdateProjectInputSchema = CreateProjectInputSchema.omit({
  url: true,
}).partial();

const ProjectSchema = DatabaseRecordSchema.merge(
  CreateProjectInputSchema
).merge(
  z.strictObject({
    status: z.enum(["Enqueued", "Processing", "Failed", "Completed"]),
    thumbnail: z.string().nonempty().nullable(),
  })
);

type iCreateProjectInput = z.infer<typeof CreateProjectInputSchema>;
type iUpdateProjectInput = z.infer<typeof UpdateProjectInputSchema>;
type iProject = z.infer<typeof ProjectSchema>;
type iProjectWithParameters = iProject & {
  cliParameters: CLIParameters[];
};

export type CreateProjectInput = iCreateProjectInput;
export type UpdateProjectInput = iUpdateProjectInput;
export type Project = iProject;
export type ProjectWithParameters = iProjectWithParameters;

// export interface CreateProjectInput
//   extends z.infer<typeof CreateProjectInputSchema> {}
// export interface UpdateProjectInput
//   extends z.infer<typeof UpdateProjectInputSchema> {}
// export interface Project extends z.infer<typeof ProjectSchema> {}
// export interface ProjectWithParameters extends Project {
//   cliParameters: CLIParameters[];
// }
