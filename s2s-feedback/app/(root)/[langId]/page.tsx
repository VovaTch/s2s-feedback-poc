"use client";

import { langState, languageStates } from "../../static/lang-states";
import { notFound, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FormDisplay } from "./form";

import LLMResponseCard, { LangFeedbackResponse } from "./llm-response";

// const dummyLlmResponse: LangFeedbackResponse = {
//   thoughts: [
//     "This is a CoT thought, как дела?a",
//     "Este traducción está muy bueno.",
//   ],
//   total_rating: 6,
//   errors: [
//     {
//       message: "This is an error message because I hate the first sentence.",
//       rating_deducted: 1,
//     },
//     {
//       message:
//         "This is an error message because I hate the second sentence even more.",
//       rating_deducted: 2,
//     },
//   ],
//   correct_translations: [
//     "Ich möchte meine Fahrkarte stornieren",
//     "Me da miedo escribir en español cuando no tengo un corrector ortográfico.",
//   ],
// };

export default function LangEnterPage() {
  const params = useParams<{ langId: string }>();
  const [langState, setLangState] = useState<langState>(languageStates[0]);
  const [llmResponse, setLlmResponse] = useState<LangFeedbackResponse | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const langStateInd = languageStates.find(
      (lang) => lang.id === params.langId,
    );
    if (!langStateInd) {
      notFound();
    }
    setLangState(langStateInd);
  }, [params.langId]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const formData = new FormData(event.currentTarget);
      console.log(
        JSON.stringify({
          ...Object.fromEntries(formData),
          lang_id: langState.id,
        }),
      );
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/s2s_eval/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...Object.fromEntries(formData),
            lang_id: langState.id,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to submit form.");
      }

      const data = await response.json();
      setLlmResponse(data);
    } catch (e: any) {
      setError(e.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const onReset = () => {
    setLlmResponse(null);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${langState.bgPath})`,
      }}
      className="flex-1 flex-col flex items-center justify-center bg-cover bg-center bg-blend-multiply bg-indigo-300"
    >
      {llmResponse ? (
        <LLMResponseCard onReset={onReset} llmResponse={llmResponse} />
      ) : (
        <FormDisplay
          onSubmit={onSubmit}
          isLoading={isLoading}
          langState={langState}
        />
      )}
    </div>
  );
}
