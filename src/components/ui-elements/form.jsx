import React from "react";
import {
  Form as RBForm,
  FormControl as RBFormControl,
  FormLabel as RBFormLabel,
  FormText,
} from "react-bootstrap";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form";

// Contexts to manage field state
const FormItemContext = React.createContext({});
const FormFieldContext = React.createContext({ name: "" });

/**
 * Wraps your form and provides React Hook Form context.
 * @param {Object} props
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {Object} [props.defaultValues] - Optional default field values.
 * @param {React.ReactNode} props.children
 */
export function Form({ children, onSubmit, defaultValues = {}, ...props }) {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <RBForm noValidate onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {children}
      </RBForm>
    </FormProvider>
  );
}

/**
 * Controller for a form field, stores the field name in context.
 * @param {Object} props
 * @param {string} props.name - Field name.
 * @param {Object} props.control - RHF control object.
 * @param {Object} [props.rules] - Validation rules.
 * @param {Function} props.children - Function receiving RHF field props.
 */
export function FormField({ name, control, rules = {}, children }) {
  return (
    <FormFieldContext.Provider value={{ name }}>
      <Controller name={name} control={control} rules={rules} render={children} />
    </FormFieldContext.Provider>
  );
}

/**
 * Hook to access current field state and error message.
 * @returns {Object} - Metadata for form control.
 */
export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext?.name) {
    throw new Error("useFormField must be used within <FormField>");
  }

  const id = itemContext?.id || fieldContext.name;

  return {
    id,
    name: fieldContext.name,
    error: fieldState.error,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-description`,
    formMessageId: `${id}-message`,
  };
}

/**
 * Wraps a field block (label + control + error).
 * Provides a unique ID via context.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function FormItem({ children, className = "", ...props }) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={`mb-3 ${className}`} {...props}>
        {children}
      </div>
    </FormItemContext.Provider>
  );
}

/**
 * Renders a <label> with error state color if needed.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function FormLabel({ children, className = "" }) {
  const { formItemId, error } = useFormField();

  return (
    <RBFormLabel htmlFor={formItemId} className={`${error ? "text-danger" : ""} ${className}`}>
      {children}
    </RBFormLabel>
  );
}

/**
 * Renders the form control element.
 * @param {Object} props - Passed to FormControl.
 * @returns ReactNode
 */
export function FormControl({ as = "input", ...props }) {
  const { formItemId, formDescriptionId, formMessageId, error } = useFormField();

  return (
    <RBFormControl
      id={formItemId}
      aria-describedby={`${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      isInvalid={!!error}
      as={as}
      {...props}
    />
  );
}

/**
 * Renders helper text below input.
 * @param {Object} props
 * @param {React.ReactNode} props.children
 */
export function FormDescription({ children, className = "" }) {
  const { formDescriptionId } = useFormField();

  return (
    <FormText id={formDescriptionId} className={`text-muted ${className}`}>
      {children}
    </FormText>
  );
}

/**
 * Renders validation error message.
 * @param {Object} props
 * @param {string} [props.className]
 */
export function FormMessage({ className = "" }) {
  const { error, formMessageId } = useFormField();
  if (!error?.message) return null;

  return (
    <FormText id={formMessageId} className={`text-danger ${className}`}>
      {String(error.message)}
    </FormText>
  );
}
