"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { langState, languageStates } from "../../static/lang-states";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  engSentence: z.string().min(2, {
    message: "English sentence must contain at least 2 characters.",
  }),
  langSentence: z.string().min(2, {
    message: "Alt Language sentence must contain at least 2 characters.",
  }),
});

export default function LangEnterPage() {
  const params = useParams<{ langId: string }>();
  const [langState, setLangState] = useState<langState>(languageStates[0]);

  useEffect(() => {
    const langStateInd = languageStates.find(
      (lang) => lang.id === params.langId,
    );
    if (!langStateInd) {
      notFound();
    }
    setLangState(langStateInd);
  }, [params.langId]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      engSentence: "",
      langSentence: "",
    },
  });

  return (
    <div
      style={{
        backgroundImage: `url(${langState.bgPath})`,
      }}
      className="flex-1 flex-col flex items-center justify-center bg-cover bg-center bg-blend-multiply bg-indigo-300"
    >
      <div className="bg-gradient-to-tr from-violet-300 to-transparent flex-1 flex-col w-full flex items-center justify-center">
        <Form {...form}>
          <form onSubmit={() => {}} className='bg-white p-5 rounded-lg shadow-lg'>
            <p className="text-sm lg:text-lg font-bold text-center text-indigo-800 pb-5 tracking-wider">
              From English to {langState.name}
            </p>
            <FormField
              control={form.control}
              name="engSentence"
              render={({ field }) => (
                <>
                  <LangSentenceFormItem field={field} langName="English" />
                </>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="langSentence"
              render={({ field }) => (
                <>
                  <LangSentenceFormItem
                    field={field}
                    langName={langState.name}
                  />
                </>
              )}
            />
            <Button
              variant="primary"
              size="lg"
              className="w-full mt-5"
              type="submit"
            >
              Submit
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
    </div>
  );
}

type SentFormItem = {
  field: ControllerRenderProps<
    {
      engSentence: string;
      langSentence: string;
    },
    "langSentence" | "engSentence"
  >;
  langName: string;
};

const LangSentenceFormItem = ({ field, langName }: SentFormItem) => {
  return (
    <FormItem className="flex mb-4 min-w-[400px] items-center justify-center">
      <FormLabel className=" w-1/3 text-2xl text-indigo-700 font-extrabold tracking-wider">{langName}</FormLabel>
      <FormControl>
        <Textarea
          className="w-2/3 shadow-md"
          placeholder={`Write your ${langName} sentence here...`}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
