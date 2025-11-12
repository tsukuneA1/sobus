import Image from "next/image";
import { getProjectById } from "@/lib/microcms";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;
  const project = await getProjectById(id);

  return (
    <div>
      <h1>{project.title}</h1>
      <span>{project.category}</span>
      <Image
        src={project.sumbnail.url}
        alt={project.title}
        width={project.sumbnail.width || 800}
        height={project.sumbnail.height || 600}
      />
      <p>{project.description}</p>
      {project.gallery && project.gallery.length > 0 && (
        <div>
          <h2>ギャラリー</h2>
          <div>
            {project.gallery.map((image) => (
              <Image
                key={project.id}
                src={image.url}
                alt={project.title}
                width={image.width || 400}
                height={image.height || 300}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
