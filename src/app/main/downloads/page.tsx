import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import Link from "next/link";

const programs = [
  {
    name: "Visual Studio Code",
    description: "A lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.",
    link: "https://code.visualstudio.com/download",
  },
  {
    name: "Node.js",
    description: "An open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
    link: "https://nodejs.org/en/download/",
  },
  {
    name: "Git",
    description: "A free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.",
    link: "https://git-scm.com/downloads",
  },
   {
    name: "Firebase Tools",
    description: "The Firebase CLI provides a variety of tools for managing, viewing, and deploying to Firebase projects.",
    link: "https://firebase.google.com/docs/cli#install-cli-standalone-binary",
  },
  {
    name: "Figma",
    description: "A collaborative web application for interface design, with additional offline features enabled by desktop applications for macOS and Windows.",
    link: "https://www.figma.com/downloads/",
  },
  {
    name: "Postman",
    description: "An API platform for developers to design, build, test and iterate their APIs.",
    link: "https://www.postman.com/downloads/",
  },
];

export default function DownloadsPage() {
  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
          برامج مهمة للمبرمجين
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          قائمة منسقة من البرامج والأدوات لتعزيز سير عمل التطوير الخاص بك.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {programs.map((program) => (
          <Card key={program.name} className="flex flex-col">
            <CardHeader>
              <CardTitle className="font-headline">{program.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{program.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={program.link} target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4" /> Download
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
