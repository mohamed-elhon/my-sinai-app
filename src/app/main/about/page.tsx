import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

export default function AboutPage() {
  const services = [
    "Custom Website Development",
    "E-commerce Solutions",
    "Web Application Development",
    "UI/UX Design",
    "Firebase Integration",
    "Hosting and Deployment",
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-12">
      <div className="grid gap-12 md:grid-cols-5">
        <div className="md:col-span-3 space-y-6">
          <h1 className="text-4xl font-bold font-headline tracking-tight lg:text-5xl">
            About Sinai Web Services
          </h1>
          <p className="text-xl text-muted-foreground">
            Founded by Mohamed Gomaa, Sinai Web Services is dedicated to delivering high-quality, modern web solutions tailored to your needs. We believe in the power of a strong online presence to transform businesses.
          </p>
          <p className="text-lg">
            Our mission is to combine cutting-edge technology with user-centric design to create websites and applications that are not only visually stunning but also functional, responsive, and scalable. Whether you're a small business looking for a simple landing page or a large enterprise needing a complex web application, we have the skills and experience to bring your vision to life.
          </p>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Our Core Services</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src="https://i1.sndcdn.com/avatars-000428758278-llevka-t240x240.jpg" alt="Mohamed Gomaa" />
                <AvatarFallback>MG</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold font-headline">Mohamed Gomaa</h2>
              <p className="text-muted-foreground">Founder & Lead Developer</p>
            </CardContent>
          </Card>
           <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1724638954023-263806200eea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8UmVkJTIwTGluZXxlbnwwfHx8fDE3NTE4NTQ4NTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Developer workspace"
              width={600}
              height={400}
              className="w-full object-cover"
              data-ai-hint="developer workspace"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
