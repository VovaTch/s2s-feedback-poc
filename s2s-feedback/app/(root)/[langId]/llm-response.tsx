import { Button } from "@/components/ui/button";

export type LangFeedbackResponse = {
  thoughts: string[];
  total_rating: number;
  errors: {
    message: string;
    rating_deducted: number;
  }[];
  correct_translations: string[];
};

export default function LLMResponseCard({
  onReset,
  llmResponse,
}: {
  onReset: () => void;
  llmResponse: LangFeedbackResponse | null;
}) {
  return (
    <div
      className="bg-white p-5 rounded-lg shadow-lg m-10">
      <p>{JSON.stringify(llmResponse)}</p>
      <Button variant={'secondary'} onClick={onReset}>Reset</Button>
    </div>
  );
}
