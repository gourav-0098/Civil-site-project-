import ProjectForm from '../../../../components/admin/ProjectForm';

export const metadata = {
  title: 'Create New Infrastructure Project | CMS Control Center'
};

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <ProjectForm isEdit={false} />
    </div>
  );
}
