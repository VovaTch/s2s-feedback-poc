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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  engSentence: z.string().min(2, {
    message: "English sentence must contain at least 2 characters.",
  }),
  langSentence: z.string().min(2, {
    message: "Alt Language sentence must contain at least 2 characters.",
  }),
});

interface PageProps {
  params: {
    langId: string;
  };
}

export default function LangEnterPage({ params }: PageProps) {
  const [langState, setLangState] = useState<langState>();

  if (!langState) {
    notFound();
  }

  useEffect(() => {
    const getId = async () => {
      try {
        const paramId = await params.langId;
        const langState = languageStates.find((item) => item.id === paramId);
        setLangState(langState);
      } catch (e) {
        throw Error(`Cannot find language item: ${e}`);
      }
    };
  }, [params]);

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
        <p className="text-sm lg:text-lg font-bold text-center text-white pb-5">
          Score your {langState.name} translation from English!
        </p>
        <Form {...form}>
          <form onSubmit={() => {}}></form>
          <FormField
            control={form.control}
            name="engSentence"
            render={(field) => {
              return (
                <>
                  <LangSentenceFormItem field={field} langName="English" />
                </>
              );
            }}
          ></FormField>
          <FormField
            control={form.control}
            name="langSentence"
            render={(field) => {
              return (
                <>
                  <LangSentenceFormItem
                    field={field}
                    langName={langState.name}
                  />
                </>
              );
            }}
          />
        </Form>
        <Button
          variant="default"
          size="lg"
          className="w-3/5 max-w-[350px] mt-10"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

type SentFormItem = {
  field: any;
  langName: string;
};

const LangSentenceFormItem = ({ field, langName }: SentFormItem) => {
  return (
    <FormItem className="flex mb-4 min-w-[400px] items-center justify-center">
      <FormLabel className=" w-1/3 text-2xl text-white ">{langName}</FormLabel>
      <FormControl>
        <Textarea
          className="w-2/3"
          placeholder={`Write your ${langName} sentence here...`}
          {...field}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
