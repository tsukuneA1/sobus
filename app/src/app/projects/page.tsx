import { getProjects } from "@/lib/microcms";

const Page = async () => {
  const projects = await getProjects();

  return (
    <div>
      <h1>活動実績</h1>
      <div>
        {projects.map((project) => (
          <div key={project.title}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
