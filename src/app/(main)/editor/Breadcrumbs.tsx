import { steps } from "./steps";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
interface BreadcrumbsProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
}
export default function Breadcrumbs({
  currentStep,
  setCurrentStep,
}: BreadcrumbsProps) {
  return (
    <div className="flex justify-center">
      <Breadcrumb>
        <BreadcrumbList>
          {steps.map((step) => (
            <React.Fragment key={step.key}>
              <BreadcrumbItem>
                {step.key === currentStep ? (
                  <BreadcrumbPage className="relative pb-1 font-semibold text-primary after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-100 after:bg-primary after:transition-transform after:duration-300">
                    {step.title}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={`?step=${step.key}`}
                    onClick={() => setCurrentStep(step.key)}
                    className="relative pb-1 text-muted-foreground after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-muted-foreground after:transition-transform after:duration-300 hover:after:scale-x-100"
                  >
                    {step.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              <BreadcrumbSeparator className="last:hidden" />
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
