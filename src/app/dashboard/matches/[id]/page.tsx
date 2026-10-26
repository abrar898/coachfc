import React from 'react';
import { db } from '@/lib/db';
import { MatchEventRecorderClient } from '@/components/dashboard/MatchEventRecorderClient';

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return db.getMatches().map((m) => ({ id: m.id }));
}

export default async function MatchRecorderPage({ params }: MatchPageProps) {
  const { id } = await params;
  return <MatchEventRecorderClient matchId={id} />;
}
