import { useState } from 'react';
import { Project } from '../types/Project';
import { addProject } from '../api/ProjectsAPI';

// This component will handle the form for adding a new project
interface NewProjectFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}
const NewProjectForm = ({ onSuccess, onCancel }: NewProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({
    //of project type inside project.ts
    //resset the form data to initial state
    projectId: 0,
    projectName: '',
    projectType: '',
    projectRegionalProgram: '',
    projectImpact: 0,
    projectPhase: '',
    projectFunctionalityStatus: '',
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); //set equal to whatever what in form and add whatever was typed in into form data
  };
  const handleSubmit = async (e: React.FormEvent) => {
    //prevent default and await data
    e.preventDefault();
    await addProject(formData);
    onSuccess(); //got the data!
  };
  return (
    //form fields
    <form onSubmit={handleSubmit}>
      <h2>Add New Project</h2>
      <div className="form-grid">
        <label>
          Project Name:
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange} //like asp.for
          />
        </label>
        <label>
          Project Type:
          <input
            type="text"
            name="projectType"
            value={formData.projectType}
            onChange={handleChange}
          />
        </label>
        <label>
          Regional Program:
          <input
            type="text"
            name="projectRegionalProgram" //remember to match name in project.ts
            value={formData.projectRegionalProgram}
            onChange={handleChange}
          />
        </label>
        <label>
          Impact:
          <input
            type="number"
            name="projectImpact"
            value={formData.projectImpact}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Phase:
          <input
            type="text"
            name="projectPhase"
            value={formData.projectPhase}
            onChange={handleChange}
          />
        </label>
        <label>
          Project Functionality Status:
          <input
            type="text"
            name="projectFunctionalityStatus"
            value={formData.projectFunctionalityStatus}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Project</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};
export default NewProjectForm;
