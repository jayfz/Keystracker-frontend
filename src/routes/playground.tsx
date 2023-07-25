import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FormikProps,
  FormikConfig,
} from "formik";
import {
  FormControl,
  FormLabel,
  Input as ChackraInput,
  FormErrorMessage,
  Button,
  VStack,
} from "@chakra-ui/react";

type createSomethingInput = {
  firstName?: string | undefined;
  lastName?: string;
  age?: number;
  isResponsible?: boolean;
};

type ProjectFormProps = {
  initialValues: FormikConfig<createSomethingInput>["initialValues"];
  onSubmit: FormikConfig<createSomethingInput>["onSubmit"];
  validate: FormikConfig<createSomethingInput>["validate"];
};

export default function Playground() {
  const initialValues = {
    firstName: "",
    // lastName: "",
    // age: 0,
    // isResponsible: false,
  };

  const onSubmit = async () => {
    return 0;
  };

  const validate = () => {
    return {};
  };

  const props = {
    initialValues,
    onSubmit,
    validate,
  };

  return <ProjectForm {...props} />;
}

export function ProjectForm(projectFormProps: ProjectFormProps) {
  const submitButtonText = "create something";

  function shouldShowFeedbackError(
    formikProps: FormikProps<createSomethingInput>,
    property: keyof createSomethingInput
  ) {
    return (
      Boolean(formikProps.errors[property]) && formikProps.touched[property]
    );
  }

  return (
    <Formik {...projectFormProps}>
      {(props: FormikProps<createSomethingInput>) => (
        <Form>
          <VStack spacing={6} maxW={"container.lg"}>
            {/* <FormControl
              isInvalid={shouldShowFeedbackError(props, "firstName")}
            >
              <FormLabel>Name</FormLabel>
              <Field
                as={ChackraInput}
                type="text"
                name="firstName"
                variant="filled"
              />
              <ErrorMessage component={FormErrorMessage} name="name" />
            </FormControl> */}
            {/* 
            <FormControl isInvalid={shouldShowFeedbackError(props, "lastName")}>
              <FormLabel>Last name</FormLabel>
              <Field
                as={ChackraInput}
                type="url"
                name="lastName"
                variant="filled"
              />
              <ErrorMessage component={FormErrorMessage} name="url" />
            </FormControl>

            <FormControl>
              <FormLabel>what</FormLabel>
              <Field
                as={ChackraInput}
                type="url"
                name="what"
                variant="filled"
              />
              <ErrorMessage component={FormErrorMessage} name="url" />
            </FormControl> */}

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
