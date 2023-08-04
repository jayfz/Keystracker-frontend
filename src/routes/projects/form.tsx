import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FormikProps,
  FormikConfig,
} from "formik";
import { CreateProjectInput } from "@/models/Project";
import {
  FormControl,
  FormLabel,
  Input as ChackraInput,
  FormErrorMessage,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useNavigation } from "react-router-dom";

type ProjectFormProps = {
  initialValues: FormikConfig<CreateProjectInput>["initialValues"];
  onSubmit: FormikConfig<CreateProjectInput>["onSubmit"];
  validate: FormikConfig<CreateProjectInput>["validate"];
  formIntent: "update" | "create";
};

export default function ProjectForm(projectFormProps: ProjectFormProps) {
  const submitButtonText =
    projectFormProps.formIntent === "update"
      ? "Update Project"
      : "Create Project";

  const loadingButtonText =
    projectFormProps.formIntent === "update"
      ? "Updating Project"
      : "Creating Project";
  const shouldDisableField = projectFormProps.formIntent === "update";

  function shouldShowFeedbackError(
    formikProps: FormikProps<CreateProjectInput>,
    property: keyof CreateProjectInput
  ) {
    return (
      Boolean(formikProps.errors[property]) && formikProps.touched[property]
    );
  }

  const navigation = useNavigation();

  const mutatingProject =
    navigation.state === "submitting" &&
    (navigation.formMethod === "POST" || navigation.formMethod === "PATCH");

  return (
    <Formik {...projectFormProps}>
      {(props: FormikProps<CreateProjectInput>) => (
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
              isLoading={mutatingProject}
              loadingText={loadingButtonText}
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
