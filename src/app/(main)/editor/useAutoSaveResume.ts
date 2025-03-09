import { useEffect, useState } from "react";
import { useDebounce } from "@/components/hooks/useDebounce";
import { ResumeValues } from "@/lib/validation";

export default function useAutoSaveResume(resumeData: ResumeValues) {
   
    const debouncedResumeData = useDebounce(resumeData, 1500);

    const [lastSaved, setLastSaved] = useState(
        structuredClone(resumeData)
    );

    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function save() {
            setIsSaving(true);
            await new Promise(resolve => setTimeout(resolve, 1500));
            setLastSaved(structuredClone(debouncedResumeData));
            setIsSaving(false);
        }
        const hasUnsavedChanges = JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSaved);
        if (hasUnsavedChanges && debouncedResumeData && !isSaving) {
            save();
        }
    }, [debouncedResumeData, isSaving, lastSaved])

    return {
        isSaving,
        hasUnsavedChanges: JSON.stringify(resumeData) !== JSON.stringify(lastSaved),
    };
}