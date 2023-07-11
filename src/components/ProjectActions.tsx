"use client";

// native
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

// lib
import { deleteProject, fetchToken } from "@/lib/actions";

type Props = {
  projectId: string;
};

export default function ProjectActions ({ projectId }: Props) {
  const router = useRouter()

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteProject = async () => {
    setIsDeleting(true)

    const { token } = await fetchToken()
    try {
      await deleteProject(projectId, token)
      router.push('/')
    } catch (err) {
      throw err
    } finally {
      setIsDeleting(false)
    }
  };

  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src="/pencile.svg" width={15} height={15} alt="edit" />
      </Link>

      <button
        type="button"
        onClick={handleDeleteProject}
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
      >
        <Image src="/trash.svg" width={15} height={15} alt="delete" />
      </button>
    </>
  );
}
