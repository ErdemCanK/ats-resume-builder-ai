import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema, PersonalInfoValues } from "@/lib/validation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";
import { EditorFormProps } from "@/lib/types";
import { UploadIcon, TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { BorderStyles } from "@/app/(main)/editor/BorderStyleButton";
export default function PersonalInfoForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const form = useForm<PersonalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: resumeData.firstName || "",
      lastName: resumeData.lastName || "",
      jobTitle: resumeData.jobTitle || "",
      city: resumeData.city || "",
      country: resumeData.country || "",
      phone: resumeData.phone || "",
      email: resumeData.email || "",
    },
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(
    resumeData.photo instanceof File
      ? URL.createObjectURL(resumeData.photo)
      : null,
  );

  useEffect(() => {
    if (resumeData.photo instanceof File) {
      setPreviewUrl(URL.createObjectURL(resumeData.photo));
    } else if (typeof resumeData.photo === "string") {
      setPreviewUrl(resumeData.photo);
    } else {
      setPreviewUrl(null);
    }
  }, [resumeData.photo]);

  useEffect(() => {
    const { unsubscribe } = form.watch(async (values) => {
      const isValid = await form.trigger();
      if (!isValid) return;
      setResumeData({ ...resumeData, ...values, photo: resumeData.photo });
    });
    return unsubscribe;
  }, [form, resumeData, setResumeData, previewUrl]);

  const photoInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="mx-auto max-w-xl space-x-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-2xl font-semibold">Personal information</h2>
        <p className="text-sm text-muted-foreground">Tell us about yourself.</p>
      </div>
      <Form {...form}>
        <form className="space-y-3">
          <FormField
            control={form.control}
            name="photo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Photo</FormLabel>
                <div className="flex items-center gap-4">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={photoInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        field.onChange(file);
                        setPreviewUrl(imageUrl);
                        setResumeData({ ...resumeData, photo: imageUrl });
                      } else {
                        field.onChange(null);
                        setPreviewUrl(null);
                        setResumeData({ ...resumeData, photo: null });
                      }
                    }}
                  />
                  <div className="flex flex-col items-center space-y-3">
                    {/* 📸 Preview Image */}
                    {previewUrl ? (
                      <div className="relative h-[100px] w-[100px]">
                        <Image
                          src={previewUrl}
                          alt="Photo"
                          width={100}
                          height={100}
                          className="rounded-lg border object-cover shadow-md transition-all duration-300 ease-in-out hover:shadow-lg"
                          style={{
                            borderRadius:
                              resumeData.borderStyle === BorderStyles.SQUARE
                                ? "0px"
                                : resumeData.borderStyle === BorderStyles.CIRCLE
                                  ? "999px"
                                  : "10%",
                          }}
                        />
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        type="button"
                        className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 shadow-sm transition hover:bg-gray-100"
                        onClick={() => photoInputRef.current?.click()}
                      >
                        <UploadIcon className="size-4" />
                        Upload Photo
                      </Button>
                    )}

                    {/* 📂 Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={photoInputRef}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const imageUrl = URL.createObjectURL(file);
                          setPreviewUrl(imageUrl);
                          setResumeData({ ...resumeData, photo: file });
                        }
                      }}
                    />

                    {/* 🗑️ If Photo Exists, Remove Button */}
                    {previewUrl && (
                      <Button
                        variant="destructive"
                        type="button"
                        className="flex items-center gap-2 rounded-lg px-4 py-2 shadow-sm transition hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                        onClick={() => {
                          setPreviewUrl(null);
                          setResumeData({ ...resumeData, photo: undefined });
                          if (photoInputRef.current) {
                            photoInputRef.current.value = "";
                          }
                        }}
                      >
                        <TrashIcon className="size-4" />
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
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
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
