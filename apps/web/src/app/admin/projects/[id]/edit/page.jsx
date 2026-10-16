'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '../../../../../components/admin/ProjectForm';

export default function EditProjectPage() {
  const params = useParams();
  const id = params?.id;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadProject() {
      try {
        const res = await fetch(`/api/proxy/admin/projects/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setProject(data.data);
        } else {
          setError(data.error || 'Project not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center space-y-3">
        <div className="w-8 h-8 border-4 border-industrial-orange border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-mono text-steel-500 uppercase tracking-widest">
          Loading Project Data from Database...
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 text-sm">
        Failed to load project: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProjectForm initialData={project} isEdit={true} />
    </div>
  );
}
