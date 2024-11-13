import React from 'react';
import { useUser } from '../context/UserContext';
import usePrivilege from '../hooks/usePrivilege';

function Projects() {
  const { userInfo } = useUser();
  const { hasPrivilege } = usePrivilege();

  return (
    <div className="projects">
      <h1>Projects</h1>
      
      <h2>User Information</h2>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>

      <h2>Available Actions</h2>
      {/* Conditional rendering based on privileges */}
      {hasPrivilege('canView') && (
        <button onClick={() => alert('Viewing projects...')}>View Projects</button>
      )}
      {hasPrivilege('canEdit') && (
        <button onClick={() => alert('Editing project...')}>Edit Project</button>
      )}
      {hasPrivilege('canDelete') && (
        <button onClick={() => alert('Deleting project...')}>Delete Project</button>
      )}

      {/* Additional content can be added here based on user role */}
    </div>
  );
}

export default Projects;
