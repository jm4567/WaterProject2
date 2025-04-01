//this will help make changes across all of the calls using the same calls

import { Project } from '../types/Project';

interface FetchProjectsResponse {
  //template for the response
  projects: Project[];
  totalNumProjects: number;
}

const API_URL = 'https://localhost:5000/Water';
export const fetchProjects = async (
  pageSize: number,
  pageNum: number,
  selectedCategories: string[]
): Promise<FetchProjectsResponse> => {
  try {
    const categoryParams = selectedCategories
      .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
      .join('&');

    const response = await fetch(
      `${API_URL}/AllProjects?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
    );

    //Error handling: Check if the response is ok before attempting to parse it as JSON.
    if (!response.ok) {
      throw new Error(
        `failed to fetch projects: ${response.status} - ${response.statusText} `
      );
    }

    return await response.json(); //promising the response to be of type FetchProjectsResponse
  } catch (error) {
    console.error('Error fetching projects', error);
    throw error; //throwing the error to be caught and handled in the calling function
  }
};

export const addProject = async (newProject: Project): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/AddProject`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProject),
    }); //passing in json object

    if (!response.ok) {
      throw new Error('Failed to add project');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding project', error);
    throw error;
  }
};

export const updateProject = async (
  projectId: number,
  updatedProject: Project
): Promise<Project> => {
  try {
    const response = await fetch(`${API_URL}/UpdateProject/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProject),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating project', error);
    throw error;
  }
};

export const deleteProject = async (projectId: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/DeleteProject/${projectId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete project');
    }
  } catch (error) {
    console.error('Error deleting project', error);
    throw error;
  }
};
