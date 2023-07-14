import styles from "../../components/styles/CreateProjectPage.module.css";
import {
  Formik,
  Form,
  ErrorMessage,
  Field,
  FormikProps,
  FormikConfig,
} from "formik";
import { createProjectInput } from "../../models/Project";

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
          <label htmlFor="name">Name</label>
          <Field type="text" id="name" name="name" />
          <ErrorMessage
            name="name"
            component="span"
            className={styles.validationError}
          />

          <label htmlFor="url">URL</label>
          <Field type="url" id="url" name="url" disabled={shouldDisableField} />
          <ErrorMessage
            name="url"
            component="span"
            className={styles.validationError}
          />

          <Field
            type="submit"
            id="submit"
            value={submitButtonText}
            disabled={!props.dirty || !props.isValid}
          />
        </Form>
      )}
    </Formik>
  );
}
