import axios from 'axios'
import { Project, ProjectWithParameters, UpdateProjectInput, createProjectInput } from '../models/Project';


axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* eslint-disable @typescript-eslint/no-explicit-any */
function deserializeProject (project: any){
    project.createdAt = new Date(project.createdAt)
    project.updatedAt = new Date(project.createdAt)
    return project;
}
/* eslint-enable @typescript-eslint/no-explicit-any */


export async function getAllProjects (): Promise<Project[]> {

    try {
        const {data: {data: projectCollection}} = await axios.get(`/projects`);
        projectCollection.forEach(deserializeProject);
        return projectCollection;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProjectById (id: number): Promise<ProjectWithParameters | null>{
    try {
        const {data:{data: project}} = await axios.get(`/projects/${id}`);
        return deserializeProject(project);

    } catch (error) {
        console.error(error);
    }
    return null;
}

export async function createProject (projectInput: createProjectInput) : Promise<Project | null>{
    try{
        const {data: {data: project}} = await axios.post(`/projects`, projectInput );
        return deserializeProject(project);
    }
    catch(error){
        console.error(error);
    }

    return null;
}

export async function updateProject (projectInput: UpdateProjectInput): Promise<Project | null>{
    try{
        const {data: {data:project}} = await axios.patch(`/projects/${projectInput.id}`, projectInput);
        return deserializeProject(project);
    }

    catch(error){
        console.error(error);
    }
    return null;
}

export async function deleteProject(id: number) : Promise<boolean> {
    try {
        await axios.delete(`/projects/${id}`);
        return true;
    }
    catch(error){
        console.error(error);
    }


    return false;
}


export default  {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}

