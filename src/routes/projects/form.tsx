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
  VStack,
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

  function shouldShowFeedbackError(
    formikProps: FormikProps<createProjectInput>,
    property: keyof createProjectInput
  ) {
    return (
      Boolean(formikProps.errors[property]) && formikProps.touched[property]
    );
  }

  return (
    <Formik {...projectFormProps}>
      {(props: FormikProps<createProjectInput>) => (
        <Form>
          <VStack spacing={6} maxW={"container.lg"}>
            <FormControl isInvalid={shouldShowFeedbackError(props, "name")}>
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

            <FormControl isInvalid={shouldShowFeedbackError(props, "url")}>
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
            <Button
              isDisabled={!props.dirty || !props.isValid}
              isLoading={props.isSubmitting}
              type="submit"
              colorScheme="blue"
            >
              {submitButtonText}
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
