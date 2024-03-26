"use client";

import { Button, Form, Text } from "@/components/atoms";
import Box from "@/components/atoms/Box";
import { FormFieldText } from "@/components/molecules";
import FormFieldSelect from "@/components/molecules/FormFieldSelect";
import { formSchemaRegisterCourse } from "@/components/template/RegisterCourses/schema";
import { useHandlerRouter } from "@/hooks/use-handler-router";
import { useHandlerForm } from "@/hooks/use-hanlder-form";
import {
  BoxTemplateForm,
  FieldsTemplateForm,
  LimitColsGrid,
  Templateform,
} from "@/types/general";
import React, { useEffect } from "react";
import { useFormState } from "react-dom";
import { z } from "zod";

type FormDashboardProps = {
  templateform?: Templateform;
  loading?: boolean;
  getDefaultValues?: () => Promise<any>;
  title?: string;
  action: (prevState: any, formData: FormData) => Promise<any>;
  schema: z.ZodObject<any>;
  pathSuccess: string;
  errorMessage?: string;
};

const FormDashboard = ({
  templateform,
  loading = false,
  getDefaultValues,
  title,
  action,
  schema,
  pathSuccess,
  errorMessage,
}: FormDashboardProps) => {
  const { register } = useHandlerForm(schema, getDefaultValues);

  const { pushRouter } = useHandlerRouter();

  const initialStateForm = {
    errors: null,
    register_success: false,
  };

  const [state, formAction] = useFormState(action, initialStateForm);
  console.log("state: ", state);

  useEffect(() => {
    if (state.register_success) {
      pushRouter(pathSuccess);
    }
  }, [action, pathSuccess, pushRouter, state.register_success]);

  const handlerFieldRender = (field: FieldsTemplateForm) => {
    const id = field.id;
    const propsField = {
      props: { ...register(id, { required: field.required }) },
      label: field.label,
      classInput: `bg-gray-300 ${field.classInput ?? ""} ${
        state?.errors?.[id] && "ring-red-500 focus:ring-red-500"
      }`,
      error: state?.errors?.[id] && state?.errors?.[id][0],
      disabled: field.disabled,
    };
    if (field.type == "select") {
      return (
        <FormFieldSelect
          key={field.id}
          {...propsField}
          type="select"
          options={field.options}
        />
      );
    } else {
      return <FormFieldText key={field.id} {...propsField} type={field.type} />;
    }
  };

  const handlerBoxRender = (boxitem: BoxTemplateForm) => {
    const grid_cols: LimitColsGrid = boxitem?.fields?.length as LimitColsGrid;
    return (
      <Box key={boxitem.id} cols={grid_cols}>
        {boxitem.fields.map((field) => handlerFieldRender(field))}
      </Box>
    );
  };

  return (
    <div className="w-full">
      <Form action={formAction} className="mb-8">
        <div className="w-[90vw] md:w-full flex flex-row justify-between items-center">
          <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {!loading && (title ?? templateform?.title)}
          </Text>
          {!loading && templateform?.textButton && (
            <Button
              className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
              type="submit"
            >
              {templateform?.textButton}
            </Button>
          )}
        </div>

        {state?.errors?.request && (
          <Text
            role="alert"
            className="text-red-400 font-semibold whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {state?.errors?.request}
          </Text>
        )}

        {templateform?.sections.map((section) => (
          <div key={section.id} className="w-[90vw] md:w-full mt-10 lg:mt-8">
            <div className="p-4 pb-2 bg-gray-200 rounded-xl rounded-b-none w-56 shadow-md shadow-slate-400">
              <Text className="text-black font-normal text-sm text-center uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                {section.title}
              </Text>
            </div>
            <div className="w-[90vw] grid-cols-12 md:w-full border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl rounded-tl-none shadow-md shadow-slate-400">
              {!loading && !errorMessage ? (
                section?.boxs.map((boxitem) => handlerBoxRender(boxitem))
              ) : !errorMessage ? (
                <div className="w-full h-[20vh] p-4 flex justify-center items-center">
                  <Text>Loading...</Text>
                </div>
              ) : (
                <div className="w-full h-[20vh] p-4 flex justify-center items-center">
                  <Text>{errorMessage}</Text>
                </div>
              )}
            </div>
          </div>
        ))}
      </Form>
    </div>
  );
};

export default FormDashboard;
