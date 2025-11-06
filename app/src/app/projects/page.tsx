import { getProjects } from "@/lib/microcms";

const Page = async () => {
  const projects = await getProjects();
  console.log(projects);
  return <div>Projects Page</div>;
};

export default Page;
