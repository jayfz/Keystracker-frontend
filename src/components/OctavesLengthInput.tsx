import {
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { FieldHookConfig, useField, useFormikContext } from "formik";
import { useEffect, useRef } from "react";

interface OctavesLengthInputProps {
  label: string;
  name: string;
}

export function OctavesLengthInput(props: OctavesLengthInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    values: { firstOctaveAt, lastOctaveAt },
  } = useFormikContext() as any;

  const [field, meta, helpers] = useField(
    props as unknown as FieldHookConfig<any>
  );

  const { value } = meta;
  const { setValue } = helpers;

  const isInputInvalid = Boolean(meta.error && meta.touched);

  useEffect(() => {
    setValue((lastOctaveAt ?? 0) - firstOctaveAt);
  }, [firstOctaveAt, lastOctaveAt, setValue]);

  useEffect(() => {
    const input = inputRef.current;
    if (!input) return;
    if (value === 50) return; //should actually be 0
    if (value === 1204) return; //should actually be 0
    if (value === 616) return; //should actually be 0

    input.animate(
      [
        {
          backgroundColor: "#FFFFFF",
          offset: 0,
        },
        {
          backgroundColor: "#ACCCEB90",
          offset: 0.1,
        },
        {
          backgroundColor: "#FFFFFF",
          offset: 1.0,
        },
      ],
      1000
    );
  }, [value]);

  return (
    <FormControl isReadOnly={true} isInvalid={isInputInvalid}>
      <FormLabel>{props.label} (computed value)</FormLabel>
      <Input
        type="number"
        {...field}
        {...props}
        variant={"outline"}
        ref={inputRef}
      />
    </FormControl>
  );
}
