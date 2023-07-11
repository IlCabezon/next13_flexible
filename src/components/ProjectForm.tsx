"use client";

// native
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// components
import FormField from "./FormField";
import CustomMenu from "./CustomMenu";

// types
import { ProjectInterface, SessionInterface } from "@/common.types";

// constants
import { categoryFilters } from "@/constants";
import CustomButton from "./CustomButton";

// actions
import { createNewProject, fetchToken, updateProject } from "@/lib/actions";

type Props = {
  type: string;
  session: SessionInterface;
  project?: ProjectInterface;
};

type Form = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

type FormField = {
  name: "title" | "description" | "liveSiteUrl" | "githubUrl";
  title: string;
  placeholder: string;
  type?: string;
};

const fields: Array<FormField> = [
  {
    name: "title",
    title: "Title",
    placeholder: "Flexibble",
  },
  {
    name: "description",
    title: "Description",
    placeholder: "Showcase and discover remarkable developer projects.",
  },
  {
    name: "liveSiteUrl",
    type: "url",
    title: "Website URL",
    placeholder: "https://www.instagram.com/fcastroagus/?hl=es",
  },
  {
    name: "githubUrl",
    type: "url",
    title: "GitHub Url",
    placeholder: "https://github.com/IlCabezon",
  },
];

export default function ProjectForm({ type, session, project }: Props) {
  const router = useRouter();

  const [form, setForm] = useState<Form>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.currentTarget.files?.[0];

    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;

      handleStateChange("image", result);
    };
  };

  const handleStateChange = (fieldName: string, value: string) =>
    setForm((prev) => ({ ...prev, [fieldName]: value }));

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      if (type === "create") {
        await createNewProject(form, session?.user?.id, token);
      }
      if (type === "edit" && project?.id) {
        await updateProject(form, project.id, token);
      }

      router.push("/");
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "create"}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="project poster"
            fill
          />
        )}
      </div>

      {fields.map((props) => (
        <FormField
          type={props.type || "text"}
          key={props.title}
          title={props.title}
          state={form[props.name]}
          placeholder={props.placeholder}
          setState={(value: string) => handleStateChange(props.name, value)}
        />
      ))}

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value: string) => handleStateChange("category", value)}
      />

      <div className="flexStart w-full">
        <CustomButton
          title={
            isSubmitting
              ? `${type === "create" ? "Creating" : "Editing"}`
              : `${type === "create" ? "Create" : "Edit"}`
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          isLoading={isSubmitting}
        />
      </div>
    </form>
  );
}
