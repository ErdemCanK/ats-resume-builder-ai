import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Link from "next/link";
export const metadata = {
    title: "Your Resumes",
    description: "Here are will be a list of resumes",
}

export default function Page() {
    return <main className="max-w-7xl mx-auto w-full px-3 py-6 space-y-6">
        <Button asChild className="w-fit mx-auto flex gap-2">
            <Link href="/editor">
                <PlusSquare className="size-5" />
                New Resume
            </Link>
        </Button>
        <Sonner />
    </main>
}