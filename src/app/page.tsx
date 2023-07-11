// ib
import { ProjectInterface } from "@/common.types";
import ProjectCard from "@/components/ProjectCard";
import { fetchAllProjects } from "@/lib/actions";

type ProjectsSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasPreviousPage: boolean;
      hasNextPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export default async function Home({}) {
  const data = (await fetchAllProjects()) as ProjectsSearch;

  const projectsToDisplay = data?.projectSearch?.edges || [];

  if (!projectsToDisplay.length) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-text text-center">No projects found.</p>
      </section>
    );
  }

  return (
    <section className="flex-start flex-col paddings mb-16">
      <h1>Categories</h1>

      <section className="projects-grid">
        {projectsToDisplay.map(
          ({ node }: { node: ProjectInterface }, i: number) => (
            <ProjectCard
              key={i}
              id={node?.id}
              image={node?.image}
              title={node?.title}
              name={node?.createdBy.name}
              avatarUrl={node?.createdBy.avatarUrl}
              userId={node?.createdBy.id}
            />
          )
        )}
      </section>

      <h1>LoadMore</h1>
    </section>
  );
}
