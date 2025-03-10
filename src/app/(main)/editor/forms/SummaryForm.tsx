import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { EditorFormProps } from "@/lib/types";
import { SummaryValues, summarySchema } from "@/lib/validation";
import { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import GenerateSummaryButton from "./GenerateSummaryButton";

export default function SummaryForm({resumeData, setResumeData}: EditorFormProps) {
    const form = useForm<SummaryValues>({
        resolver: zodResolver(summarySchema),
        defaultValues: {
            summary: resumeData.summary || "",
        },
    });

    useEffect(() => {
        const { unsubscribe } = form.watch(async (values) => {
            const isValid = await form.trigger();
            if (!isValid) return;
            setResumeData({...resumeData, ...values});
        });
        return unsubscribe;
    }, [form, resumeData, setResumeData]);

    return (
        <div className="mx-auto max-w-xl space-y-6">
            <div className="space-y-1.5 text-center">
                <h2 className="text-2xl font-semibold">Professional Summary</h2>
                <p className="text-sm text-muted-foreground">
                    Write a short introduction for your resume or let AI generate one from your entered data.
                </p>
            </div>
            <Form {...form}>
                <form className="space-y-3">
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className="sr-only">Professional Summary</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="e.g. I am a software engineer with a passion for building scalable and efficient systems."
                                        rows={5}
                                    />
                                </FormControl>
                                <FormMessage />
                                <GenerateSummaryButton
                                resumeData={resumeData}
                                onSummaryGenerated={summary => form.setValue("summary", summary)}
                                />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </div>
    )
}