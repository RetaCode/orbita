// frontend/app/(app)/groups/[groupId]/page.tsx
'use client';

import { groupDetailData } from '@/lib/mock-data';
import { GroupHeader } from '@/components/groups/GroupHeader';
import { GroupTabs } from '@/components/groups/GroupTabs';
import { motion } from 'framer-motion';

export default function SingleGroupPage() {
  const group = groupDetailData;

  if (!group) {
    return <div>Grupo no encontrado.</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GroupHeader group={group} />
      {/* Nos aseguramos de pasar los datos del grupo a las pestañas */}
      <GroupTabs group={group} />
    </motion.div>
  );
}