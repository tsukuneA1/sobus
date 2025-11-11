import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/types/microcms";

type ProjectOverviewCardProps = {
  project: Project;
};

export const ProjectOverviewCard = ({ project }: ProjectOverviewCardProps) => {
  const truncatedDescription =
    project.description.length > 100
      ? `${project.description.slice(0, 100)}...`
      : project.description;

  return (
    <Link href={`/projects/${project.id}`}>
      <article className="flex gap-4">
        <Image
          src={project.sumbnail.url}
          alt={project.title}
          width={project.sumbnail.width || 400}
          height={project.sumbnail.height || 300}
          className="w-1/3"
        />
        <div className="flex w-2/3 flex-col gap-2">
          <span>{project.category}</span>
          <h2>{project.title}</h2>
          <p>{truncatedDescription}</p>
        </div>
      </article>
    </Link>
  );
};
