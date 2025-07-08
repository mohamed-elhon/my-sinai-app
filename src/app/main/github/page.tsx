"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Github, UploadCloud, File, X } from "lucide-react";

export default function GitHubPage() {
  const { toast } = useToast();
  const [repoUrl, setRepoUrl] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  
  const stagedFiles = [
    { name: "src/app/page.tsx", size: "4.5 KB" },
    { name: "src/components/ui/button.tsx", size: "1.2 KB" },
    { name: "package.json", size: "0.8 KB" },
  ];

  const handleConnect = () => {
    if (!repoUrl.startsWith("https://github.com/")) {
      toast({
        variant: "destructive",
        title: "Invalid Repository URL",
        description: "Please enter a valid GitHub repository URL.",
      });
      return;
    }
    toast({
      title: "Connection Simulated",
      description: `Successfully connected to repository: ${repoUrl}`,
    });
    setIsConnected(true);
  };
  
  const handleCommit = () => {
     toast({
      title: "Commit & Push Simulated",
      description: "Your files have been successfully 'pushed' to GitHub.",
    });
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-12">
        <Github className="mx-auto h-12 w-12 mb-4" />
        <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
          Upload to GitHub
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Push your project files directly to a GitHub repository.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Repository Setup</CardTitle>
          <CardDescription>
            Connect to your GitHub repository to begin uploading files.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="repo-url">GitHub Repository URL</Label>
            <div className="flex gap-2">
              <Input
                id="repo-url"
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                disabled={isConnected}
              />
              <Button onClick={handleConnect} disabled={isConnected || !repoUrl}>
                {isConnected ? "Connected" : "Connect"}
              </Button>
            </div>
          </div>

          {isConnected && (
            <div className="space-y-4">
              <div>
                <Label>Upload Files</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10">
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-sm text-muted-foreground">
                      <span className="font-semibold text-primary">Drag and drop files here</span>
                    </p>
                     <p className="text-xs text-muted-foreground">This is a visual prototype. File dropping is not functional.</p>
                  </div>
                </div>
              </div>

              <div>
                 <Label>Staged Files</Label>
                 <div className="mt-2 space-y-2 rounded-md border p-4">
                    {stagedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <File className="h-4 w-4 text-muted-foreground" />
                          <span>{file.name}</span>
                          <span className="text-xs text-muted-foreground">{file.size}</span>
                        </div>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                            <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                 </div>
              </div>
              
              <Button onClick={handleCommit} className="w-full" size="lg">
                Commit & Push 3 Files
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
