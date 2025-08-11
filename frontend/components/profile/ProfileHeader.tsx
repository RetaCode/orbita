// frontend/components/profile/ProfileHeader.tsx
'use client';

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import type { PerfilData } from '@/lib/mock-data';

interface ProfileHeaderProps {
  user: Pick<PerfilData, 'nombre' | 'correo' | 'avatar'>;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <Card className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt={`Avatar de ${user.nombre}`}
            className="w-24 h-24 rounded-full border-4 border-primary"
          />
          <div className="flex-grow text-center sm:text-left">
            <h1 className="text-3xl font-bold">{user.nombre}</h1>
            <p className="text-muted-foreground">{user.correo}</p>
          </div>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Pencil className="mr-2 h-4 w-4" /> Editar Perfil
            </Button>
          </DialogTrigger>
        </Card>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar Perfil</DialogTitle>
            <DialogDescription>
              Realiza cambios en tu perfil aquí. Haz clic en guardar cuando termines.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm user={user} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <Card className="p-6 flex flex-col sm:flex-row items-center gap-6">
        <img
          src={user.avatar}
          alt={`Avatar de ${user.nombre}`}
          className="w-24 h-24 rounded-full border-4 border-primary"
        />
        <div className="flex-grow text-center sm:text-left">
          <h1 className="text-3xl font-bold">{user.nombre}</h1>
          <p className="text-muted-foreground">{user.correo}</p>
        </div>
        <DrawerTrigger asChild>
          <Button variant="outline">
            <Pencil className="mr-2 h-4 w-4" /> Editar Perfil
          </Button>
        </DrawerTrigger>
      </Card>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Editar Perfil</DrawerTitle>
          <DrawerDescription>
            Realiza cambios en tu perfil aquí. Haz clic en guardar cuando termines.
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <ProfileForm user={user} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// Componente interno para no duplicar el código del formulario
function ProfileForm({ user }: { user: Pick<PerfilData, 'nombre'> }) {
  const [editedName, setEditedName] = useState(user.nombre);

  const handleSaveChanges = () => {
    console.log("Guardando nuevo nombre:", editedName);
  };

  return (
    <form className="grid items-start gap-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Nombre</Label>
        <Input
          id="name"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
        />
      </div>
      <Button type="submit" onClick={handleSaveChanges}>Guardar Cambios</Button>
    </form>
  );
}