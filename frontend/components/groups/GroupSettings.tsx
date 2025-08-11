// frontend/components/groups/GroupSettings.tsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, AlertTriangle } from 'lucide-react';
import type { GroupDetailData } from '@/lib/mock-data';

export function GroupSettings({ group }: { group: GroupDetailData }) {
  const [groupName, setGroupName] = useState(group.nombre);
  const [groupDescription, setGroupDescription] = useState(group.descripcion);

  // Si el usuario no es admin, mostramos un mensaje y no el formulario.
  if (!group.puedeAdministrar) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No tienes permisos para editar la configuración de este grupo.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Información del Grupo</CardTitle>
          <CardDescription>Cambia el nombre y la descripción de tu grupo.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="group-name">Nombre del Grupo</Label>
            <Input id="group-name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="group-description">Descripción</Label>
            <Input id="group-description" value={groupDescription} onChange={(e) => setGroupDescription(e.target.value)} />
          </div>
          <Button>Guardar Cambios</Button>
        </CardContent>
      </Card>

      {/* Zona de Peligro */}
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            Zona de Peligro
          </CardTitle>
          <CardDescription>Estas acciones son permanentes y no se pueden deshacer.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Eliminar este grupo</p>
            <p className="text-sm text-muted-foreground">Se eliminará el grupo y todas sus tareas asociadas.</p>
          </div>
          <Button variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Eliminar Grupo
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}