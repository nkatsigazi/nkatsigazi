import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/projects";
import ProjectClient from "./ProjectClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  return <ProjectClient project={project} nextProject={nextProject} />;
}