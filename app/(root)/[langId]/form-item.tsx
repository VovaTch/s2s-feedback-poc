import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { ControllerRenderProps } from "react-hook-form";

type Props = {
  field: ControllerRenderProps<
    {
      eng_sentence: string;
      lang_sentence: string;
      lang_id: number;
    },
    "lang_sentence" | "eng_sentence" | "lang_id"
  >;
  langName: string;
};

export const LangSentenceFormItem = ({ field, langName }: Props) => {
  return (
    <>
      <FormItem className="flex mb-4 min-w-[400px] items-center justify-center">
        <FormLabel className=" w-1/3 text-2xl text-indigo-700 font-extrabold tracking-wider">
          {langName}
        </FormLabel>
        <FormControl>
          <Textarea
            className="w-2/3 shadow-md"
            placeholder={`Write your ${langName} sentence here...`}
            {...field}
          />
        </FormControl>
      </FormItem>
      <FormMessage />
    </>
  );
};
