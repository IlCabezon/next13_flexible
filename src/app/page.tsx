// components
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import LoadMore from "@/components/LoadMore";

// types
import { fetchAllProjects } from "@/lib/actions";

// lib
import { ProjectInterface } from "@/common.types";

type Props = {
  searchParams: {
    category: string;
    endcursor: string;
  };
};

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

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

export default async function Home({ searchParams }: Props) {
  const data = (await fetchAllProjects(
    searchParams?.category,
    searchParams?.endcursor
  )) as ProjectsSearch;

  let projectsToDisplay = data?.projectSearch?.edges || [];

  if (!projectsToDisplay.length) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-text text-center">No projects found.</p>
      </section>
    );
  }
  /* if (projectsToDisplay.length < 8) {
    projectsToDisplay = new Array(10).fill(null).map(el => el || projectsToDisplay[0]);
  } */

  const pagination = data?.projectSearch?.pageInfo;

  return (
    <section className="flex-start flex-col paddings mb-16">
      <Categories />

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

      <LoadMore
        startCursor={pagination?.startCursor}
        endCursor={pagination?.endCursor}
        hasPreviousPage={pagination?.hasPreviousPage}
        hasNextPage={pagination?.hasNextPage}
      />
    </section>
  );
}
