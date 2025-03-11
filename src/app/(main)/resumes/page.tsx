import { Button } from "@/components/ui/button";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import ResumeItem from "./ResumeItem";
export const metadata = {
  title: "Your Resumes",
  description: "Here are will be a list of resumes",
};

export default async function Page() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
  await prisma.resume.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
    include: resumeDataInclude,
  }),
  prisma.resume.count({
    where: {
      userId,
    },
  })
]);

// TODO: Check quota for non-premium users

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New Resume
        </Link>
      </Button>
      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your Resumes</h1>
        <p className="text-sm text-muted-foreground">
          Total: {totalCount}
        </p>
      </div>
      <div className="flex flex-col sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-3">
        {resumes.map((resume) => (
            <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
