import { getProjects } from "@/lib/microcms";
import { ProjectOverviewCard } from "./_components/project-overview-card";

export const revalidate = 60;

const Page = async () => {
  const projects = await getProjects();

  return (
    <div>
      <div>
        <h1>活動実績</h1>

        <div>
          {projects.map((project) => (
            <ProjectOverviewCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      <aside>
        <h2>月別アーカイブ</h2>
      </aside>
    </div>
  );
};

export default Page;
