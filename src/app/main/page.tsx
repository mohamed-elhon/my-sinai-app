"use client";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebase";
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { Plus, Trash, Edit } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WelcomeLogo } from "@/components/welcome-logo";

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
}

export default function ServicesPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ServicesSkeleton />;
  }

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      {user ? <ServiceManager user={user} /> : <WelcomeGuest />}
    </div>
  );
}

const WelcomeGuest = () => (
  <div className="flex flex-col items-center justify-center text-center py-20">
    <WelcomeLogo />
    <p className="text-lg text-muted-foreground mb-8 max-w-2xl -mt-4">
      Manage your web services with ease. Sign in to view and manage your services, or create an account to get started.
    </p>
    <div className="flex gap-4">
      <Button asChild size="lg">
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button asChild variant="secondary" size="lg">
        <Link href="/auth/signup">Sign Up</Link>
      </Button>
    </div>
  </div>
);

const ServiceManager = ({ user }: { user: any }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    setLoadingServices(true);
    const q = query(collection(db, "services"), where("userId", "==", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const servicesData: Service[] = [];
      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() } as Service);
      });
      setServices(servicesData);
      setLoadingServices(false);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-headline">Your Services</h1>
        <ServiceDialog mode="add" userId={user.uid} onOperationSuccess={() => toast({ title: "Service added successfully!" })}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Service
          </Button>
        </ServiceDialog>
      </div>
      {loadingServices ? (
        <ServicesGridSkeleton />
      ) : services.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} toast={toast} />
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground py-10">You have no services yet. Add one to get started!</p>
      )}
    </div>
  );
};

const ServiceCard = ({ service, toast }: { service: Service, toast: any }) => {
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "services", service.id));
      toast({ title: "Service deleted successfully!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error deleting service", description: "Please try again." });
    }
  };

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">{service.name}</CardTitle>
        <CardDescription>{service.price}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p>{service.description}</p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
         <ServiceDialog mode="edit" service={service} onOperationSuccess={() => toast({ title: "Service updated successfully!" })}>
          <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
        </ServiceDialog>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon"><Trash className="h-4 w-4" /></Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this service.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

const ServiceDialog = ({ children, mode, service, userId, onOperationSuccess }: { children: React.ReactNode, mode: 'add' | 'edit', service?: Service, userId?: string, onOperationSuccess: () => void }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(service?.name || "");
  const [description, setDescription] = useState(service?.description || "");
  const [price, setPrice] = useState(service?.price || "");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price) {
      toast({ variant: "destructive", title: "Please fill all fields" });
      return;
    }

    const serviceData = { name, description, price, userId };

    try {
      if (mode === 'add' && userId) {
        await addDoc(collection(db, "services"), { ...serviceData, userId });
      } else if (mode === 'edit' && service) {
        await updateDoc(doc(db, "services", service.id), serviceData);
      }
      onOperationSuccess();
      setOpen(false);
    } catch (error) {
      toast({ variant: "destructive", title: "An error occurred", description: "Please try again." });
    }
  };

  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description);
      setPrice(service.price);
    }
  }, [service]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline">{mode === 'add' ? 'Add a new service' : 'Edit service'}</DialogTitle>
          <DialogDescription>
            Fill in the details below. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Service Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Website Development" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the service" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price / Pricing</Label>
            <Input id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. $500 or Starting at $50/mo" />
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};


const ServicesSkeleton = () => (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-10 w-36" />
      </div>
      <ServicesGridSkeleton />
    </div>
);

const ServicesGridSkeleton = () => (
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
    {[...Array(3)].map((_, i) => (
      <Card key={i}>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/4" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </CardFooter>
      </Card>
    ))}
  </div>
);
