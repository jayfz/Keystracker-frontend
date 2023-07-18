import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FormikProps,
  FormikConfig,
} from "formik";
import { createProjectInput } from "@/models/Project";
import {
  FormControl,
  FormLabel,
  Input as ChackraInput,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";

type ProjectFormProps = {
  initialValues: FormikConfig<createProjectInput>["initialValues"];
  onSubmit: FormikConfig<createProjectInput>["onSubmit"];
  validate: FormikConfig<createProjectInput>["validate"];
  formIntent: "update" | "create";
};

export default function ProjectForm(projectFormProps: ProjectFormProps) {
  const submitButtonText =
    projectFormProps.formIntent === "update"
      ? "Update Project"
      : "Create Project";
  const shouldDisableField = projectFormProps.formIntent === "update";
  return (
    <Formik {...projectFormProps}>
      {(props: FormikProps<createProjectInput>) => (
        <Form>
          <FormControl isInvalid={Boolean(props.errors.name)}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Field
              as={ChackraInput}
              type="text"
              id="name"
              name="name"
              variant="filled"
            />
            <ErrorMessage component={FormErrorMessage} name="name" />
          </FormControl>

          <FormControl isInvalid={Boolean(props.errors.url)}>
            <FormLabel htmlFor="url">URL</FormLabel>
            <Field
              as={ChackraInput}
              type="url"
              id="url"
              name="url"
              variant="filled"
              disabled={shouldDisableField}
            />
            <ErrorMessage component={FormErrorMessage} name="url" />
          </FormControl>

          <FormControl>
            <Button
              disabled={!props.dirty || !props.isValid}
              isLoading={props.isSubmitting}
              type="submit"
            >
              {submitButtonText}
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
}
