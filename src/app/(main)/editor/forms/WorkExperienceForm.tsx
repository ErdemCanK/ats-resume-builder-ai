import { EditorFormProps } from "@/lib/types";
import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { workExperienceSchema, WorkExperienceValues } from "@/lib/validation";
import { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { GripHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";  
import { Textarea } from "@/components/ui/textarea";
import {useSensors, useSensor, PointerSensor, KeyboardSensor, DndContext,DragEndEvent} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, useSortable,arrayMove, verticalListSortingStrategy , SortableContext} from "@dnd-kit/sortable";
import { closestCenter } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
export default function WorkExperienceForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<WorkExperienceValues>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperiences: resumeData.workExperiences || [],
    },
  });

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;

      setResumeData({
        ...resumeData,
        workExperiences:
          values.workExperiences?.filter((exp) => exp !== undefined) || [],
      });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData]);

  const { fields, append, remove, move } = useFieldArray({
    control: form.control,
    name: "workExperiences",
  });

  const sensors = useSensors(
   useSensor(PointerSensor),
   useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
   }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = fields.findIndex(field => field.id === active.id);
      const newIndex = fields.findIndex(field => field.id === over.id);
      move(oldIndex, newIndex);
      return arrayMove(fields, oldIndex, newIndex);
    }
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Work Experience</h2>
        <p className="text-sm text-muted-foreground">
          Add your work experience here.
        </p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          modifiers={[restrictToParentElement]}
          onDragEnd={handleDragEnd}
          >
            <SortableContext
            items={fields}
            strategy={verticalListSortingStrategy}
            >
          {fields.map((field, index) => (
            <WorkExperienceItem
              id={field.id}
              key={field.id}
              index={index}
              form={form}
              remove={remove}
            />
          ))}
          </SortableContext>
          </DndContext>
          <div className="flex justify-center">
            <Button
              type="button"
              onClick={() =>
                append({
                  position: "",
                  company: "",
                  startDate: "",
                  endDate: "",
                  description: "",
                })
              }
            >
              Add Experience
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

interface WorkExperienceItemProps {
  id: string;
  form: UseFormReturn<WorkExperienceValues>;
  index: number;
  remove: (index: number) => void;
}

function WorkExperienceItem({ id, form, index, remove }: WorkExperienceItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transition,
    transform,
    isDragging
  } = useSortable({id})
  return (
    <div className={cn("space-y-3 rounded-md border bg-background p-3", isDragging && "shadow-xl z-50 opacity-50 cursor-grab relative")}
    ref={setNodeRef}
    style={{
      transform: CSS.Transform.toString(transform),
      transition,
    }}
    >
      <div className="flex justify-between gap-2">
        <span className="font-semibold">Work Experience {index + 1}</span>
        <GripHorizontal className="size-5 cursor-grab text-muted-foreground focus:outline-none" 
        {...attributes}
        {...listeners}
        />
      </div>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.position`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Job Title</FormLabel>
            <FormControl>
              <Input {...field} autoFocus />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`workExperiences.${index}.company`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="grid grid-cols-2 gap-3">
        <FormField
          control={form.control}
          name={`workExperiences.${index}.startDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`workExperiences.${index}.endDate`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  value={field.value?.slice(0, 10)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormDescription>
        Leave <span className="font-semibold">end date</span> empty if you are
        currently working here.
      </FormDescription>
      <FormField
        control={form.control}
        name={`workExperiences.${index}.description`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="button" variant="destructive" onClick={() => remove(index)}>
        Remove
      </Button>
    </div>
  );
}
