import React from 'react';
import { useParams } from 'react-router-dom';

export default function Watcher() {
  const { streamId } = useParams<{ streamId: string }>();
  return <div>Stream Id: {streamId}</div>;
}
