// frontend/app/(app)/groups/page.tsx
'use client';
import { motion } from 'framer-motion';
import { userGroupsData } from '@/lib/mock-data';
import { GroupsToolbar } from '@/components/groups/GroupsToolbar';
import { GroupCard } from '@/components/groups/GroupCard';

export default function GroupsPage() {
  // Ya no necesitamos generar números aleatorios aquí
  const groups = userGroupsData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <GroupsToolbar />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {groups.map((group, index) => (
          <motion.div
            key={group.id_grupo}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <GroupCard group={group} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}