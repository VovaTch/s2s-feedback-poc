"use client";

import { langState, languageStates } from "../../static/lang-states";
import { notFound, useParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { FormDisplay } from "./form";

import LLMResponseCard, { LangFeedbackResponse } from "./llm-response";

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
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/s2s_eval/`,
        {
          method: "POST",
          headers: {
            accept: "application/json",
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e);
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
      className="flex-1 flex-col flex items-center justify-center bg-cover bg-center bg-blend-multiply bg-indigo-300\
      transition fade-in-0 duration-500"
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
