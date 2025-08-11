'use client';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { PerfilData } from '@/lib/mock-data';

interface SettingsTabsProps {
  preferences: PerfilData['preferencias'];
}

export function SettingsTabs({ preferences }: SettingsTabsProps) {
  return (
    <Tabs defaultValue="preferencias">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="preferencias">Preferencias</TabsTrigger>
        <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
        <TabsTrigger value="notificaciones">Notificaciones</TabsTrigger>
      </TabsList>

      <Card className="mt-4">
        <TabsContent value="preferencias" className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tema de la Aplicación</p>
                <p className="text-sm text-muted-foreground">Elige entre claro, oscuro o automático.</p>
              </div>
              <Select defaultValue={preferences.tema}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Seleccionar tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Claro</SelectItem>
                  <SelectItem value="dark">Oscuro</SelectItem>
                  <SelectItem value="auto">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="privacidad" className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Perfil Público</p>
                <p className="text-sm text-muted-foreground">Permite que otros usuarios vean tu perfil.</p>
              </div>
              <Switch defaultChecked={preferences.privacidad.perfil_publico} />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Mostrar Estado de Ánimo</p>
                <p className="text-sm text-muted-foreground">Tu estado de ánimo será visible en los grupos.</p>
              </div>
              <Switch defaultChecked={preferences.privacidad.mostrar_estado_animo} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="notificaciones" className="p-6">
          <div className="space-y-6">
             <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Tareas Vencidas</p>
                <p className="text-sm text-muted-foreground">Recibir avisos de tareas a punto de vencer.</p>
              </div>
              <Switch defaultChecked={preferences.notificaciones.tareas_vencidas} />
            </div>
             <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Recordatorios de Bienestar</p>
                <p className="text-sm text-muted-foreground">Recibir notificaciones para tomar descansos.</p>
              </div>
              <Switch defaultChecked={preferences.notificaciones.recordatorios_bienestar} />
            </div>
          </div>
        </TabsContent>
      </Card>
    </Tabs>
  );
}