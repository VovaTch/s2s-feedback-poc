import { FEEDBACK_GRADE } from "@/app/static/feedback-grade";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CircleProgress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  const value = llmResponse ? llmResponse.total_rating * 10 : 0;
  const rgbValue = `rgb(${value ? 255 - value * 2.55 : 0}, ${value ? value * 2.55 : 0}, 0.0)`;
  const backgroundRgbaValue = `rgba(${value ? 255 - value * 2.55 : 0}, ${value ? value * 2.55 : 0}, 0.0, 0.2)`;
  return (
    <div className="bg-white p-5 rounded-lg shadow-slate-600 shadow-xl m-10">
      <div
        className="flex flex-row items-center justify-center border-2 rounded-md"
        style={{ background: backgroundRgbaValue, borderColor: rgbValue }}
      >
        <CircleProgress
          value={value}
          className="lg:text-7xl text-4xl m-5 mr-10 h-[80px] w-[80px] lg:h-[150px] lg:w-[150px] shadow-lg font-bold text-slate-600"
        />
        <h1 className={cn("text-4xl font-bold")} style={{ color: rgbValue }}>
          {llmResponse
            ? FEEDBACK_GRADE[Math.ceil(llmResponse.total_rating).toString()]
            : ""}
        </h1>
      </div>
      <div>
        {llmResponse?.errors.map((error, index) => (
          <ErrorCard
            key={index}
            error={error.message}
            pointsDeducted={error.rating_deducted}
          />
        ))}
      </div>
      <div className="w-full flex flex-col">
        <Drawer>
          <DrawerTrigger>
            <Button variant="ghost" className="w-full lg:p-15 p-5 mt-10">
              Show Answers
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle className="text-slate-500 font-bold">
                  {llmResponse && llmResponse.correct_translations.length > 0
                    ? "Suggested Correct Translations"
                    : "No correct translations available"}
                </DrawerTitle>
              </DrawerHeader>
              <div>
                {llmResponse?.correct_translations.map(
                  (correctTranslation, index) => (
                    <CorrectTranslationCard
                      key={index}
                      correctTranslation={correctTranslation}
                    />
                  ),
                )}
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="primaryOutline">OK</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <Button
        variant={"secondary"}
        onClick={onReset}
        className="w-full lg:p-15 p-5 mt-10"
      >
        Reset
      </Button>
    </div>
  );
}

function ErrorCard({
  error,
  pointsDeducted,
}: {
  error: string;
  pointsDeducted: number;
}) {
  return (
    <div className="bg-white p-3 shadow-violet-200 border-b-2 border-indigo-50 m-3 mt-5 flex flex-row items-center">
      <h1 className="min-w-[70px] text-4xl font-extrabold text-indigo-800">
        -{pointsDeducted}
      </h1>
      <h2 className="lg:text-xl text-sm justify-left text-slate-600">
        {error}
      </h2>
    </div>
  );
}

function CorrectTranslationCard({
  correctTranslation,
}: {
  correctTranslation: string;
}) {
  return (
    <div className="bg-white p-3 p-b-1 border-b-2 shadow-violet-200  border-indigo-100 m-1 items-center">
      <h2
        className="min-w-[256px] lg:text-xl text-lg justify-left text-indigo-600 rounded-lg lg:rounded-xl\
      p-5 max-w-full"
      >
        {correctTranslation}
      </h2>
    </div>
  );
}
