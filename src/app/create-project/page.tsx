// native
import { redirect } from "next/navigation";

// components
import { Modal, ProjectForm } from "@/components";

// lib
import { getCurrentUser } from "@/lib/session";

export default async function CreateProject () {
  const session = await getCurrentUser()

  if(!session?.user) redirect('/')

  return (
    <Modal>
      <h3 className="modal-head-text">Create New Project</h3>

      <ProjectForm type="create" session={session} />
    </Modal>
  );
}
