import { langState } from "@/app/static/lang-states";
import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { LangSentenceFormItem } from "./form-item";

export const FormSchema = z.object({
  eng_sentence: z.string().min(2, {
    message: "English sentence must contain at least 2 characters.",
  }),
  lang_sentence: z.string().min(2, {
    message: "Alt Language sentence must contain at least 2 characters.",
  }),
  lang_id: z.number().int().min(0, {
    message: "Language ID must be a positive number.",
  }),
});

type Props = {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  langState: langState;
};

export const FormDisplay = ({ onSubmit, isLoading, langState }: Props) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      eng_sentence: "",
      lang_sentence: "",
    },
    mode: "onChange",
  });

  return (
    <div className="bg-gradient-to-tr from-violet-300 to-transparent flex-1 flex-col w-full flex items-center justify-center">
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          onReset={() => {
            form.reset();
          }}
          className="bg-white p-5 rounded-lg shadow-lg"
        >
          <p className="text-sm lg:text-lg font-bold text-center text-indigo-800 pb-5 tracking-wider">
            From English to {langState.name}
          </p>
          <FormField
            control={form.control}
            name="eng_sentence"
            render={({ field }) => (
              <>
                <LangSentenceFormItem field={field} langName="English" />
              </>
            )}
          ></FormField>
          <FormField
            control={form.control}
            name="lang_sentence"
            render={({ field }) => (
              <>
                <LangSentenceFormItem field={field} langName={langState.name} />
              </>
            )}
          />
          <Button
            variant="primary"
            size="lg"
            className="w-full mt-5"
            type="submit"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full mt-5"
            type="reset"
          >
            Reset
          </Button>
        </form>
      </Form>
    </div>
  );
};
