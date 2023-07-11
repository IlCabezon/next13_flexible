// native
import { redirect } from "next/navigation";

// components
import { Modal, ProjectForm } from "@/components";

// lib
import { getCurrentUser } from "@/lib/session";
import { getProjectDetails } from "@/lib/actions";
import { ProjectInterface } from "@/common.types";

type Props = {
  params: {
    id: string
  }
}

export default async function EditProject ({ params } : Props) {
  const session = await getCurrentUser()

  if(!session?.user) redirect('/')

  const result = await getProjectDetails(params.id) as { project: ProjectInterface }

  if (!result?.project) return (
    <p className="no-result-text">Failed to fetch project info</p>
  )

  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>

      <ProjectForm type="edit" session={session} project={result.project} />
    </Modal>
  );
}
