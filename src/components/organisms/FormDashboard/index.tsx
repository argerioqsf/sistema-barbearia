"use client";

import { Button, Form, Text } from "@/components/atoms";
import Box from "@/components/atoms/Box";
import SelectForm from "@/components/atoms/SelectForm";
import { FormFieldText } from "@/components/molecules";
import FormFieldSelect from "@/components/molecules/FormFieldSelect";
import { Templateform } from "@/types/general";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { z } from "zod";

type FormDashboardProps = {
  templateform: Templateform;
  handlerForm: (state: any) => void;
  handleSubmit: UseFormHandleSubmit<any>;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

const FormDashboard = ({
  handlerForm,
  templateform,
  handleSubmit,
  register,
  errors,
}: FormDashboardProps) => {
  return (
    <div className="w-full">
      <Form onSubmit={handleSubmit(handlerForm)} className="mb-8">
        <div className="w-[90vw] lg:w-[95vw] flex flex-row justify-between items-center">
          <Text className="uppercase font-bold text-2xl lg:text-4xl text-black whitespace-nowrap overflow-hidden text-ellipsis">
            {templateform.title}
          </Text>
          <Button
            className="rounded-xl h-10 flex justify-center items-center px-2 sm:px-5 md:px-10 bg-secondary-50 text-white"
            type="submit"
          >
            {templateform.textButton}
          </Button>
        </div>
        {templateform.sections.map((section) => (
          <div key={section.id} className="w-[90vw] lg:w-[95vw] mt-10 lg:mt-8">
            <div className="p-4 pb-2 w-max bg-gray-200 rounded-xl rounded-b-none">
              {section.title}
            </div>
            <div className="w-[90vw lg:w-[95vw] border-2 flex flex-col gap-4 bg-gray-200 p-6 rounded-xl rounded-tl-none">
              {section.boxs.map((box) => (
                <Box
                  key={box.id}
                  className={`grid-cols- md:grid-cols-${box.fields.length}`}
                >
                  {box.fields.map((field) => {
                    if (field.type == "text" || field.type == "date") {
                      return (
                        <FormFieldText
                          key={field.id}
                          propsInput={{
                            ...register(field.id, { required: field.required }),
                          }}
                          classInput={`bg-gray-300 ${field.classInput ?? ""} ${
                            errors[field.id] &&
                            "ring-red-500 focus:ring-red-500"
                          }`}
                          type={field.type}
                          label={field.label}
                          error={errors[field.id]?.message}
                        />
                      );
                    }

                    if (field.type == "select") {
                      return (
                        <FormFieldSelect
                          key={field.id}
                          propsSelect={{
                            ...register(field.id, { required: field.required }),
                          }}
                          type="select"
                          label={field.label}
                          options={field.options}
                          error={errors[field.id]?.message}
                          classInput={`bg-gray-300 ${field.classInput ?? ""} ${
                            errors[field.id] &&
                            "ring-red-500 focus:ring-red-500"
                          }`}
                        />
                      );
                    }
                  })}
                </Box>
              ))}
            </div>
          </div>
        ))}
      </Form>
    </div>
  );
};

export default FormDashboard;
