import LoadingButton from "@/components/LoadingButton";
import { ResumeValues } from "@/lib/validation";
import { WandSparkles } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { generateSummary } from "./actions";
interface GenerateSummaryButtonProps {
    resumeData: ResumeValues
    onSummaryGenerated: (summary: string) => void
}

export default function GenerateSummaryButton({ resumeData, onSummaryGenerated }: GenerateSummaryButtonProps) {

    const {toast} = useToast();
    const [loading, setLoading] = useState(false);

    async function handleClick() {
        // TODO: Block for non-premium users

        try {
            setLoading(true);
            const aiResponse = await generateSummary(resumeData);
            onSummaryGenerated(aiResponse);
        } catch (error) {
            console.error(error);
            toast({
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    }

    return <LoadingButton
    variant={"outline"}
    onClick={handleClick}
    loading={loading}
    >
        <WandSparkles className="size-4 " />
        Generate (AI)
    </LoadingButton>
}