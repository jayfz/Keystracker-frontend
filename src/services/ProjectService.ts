import axios from 'axios'
import { Project, ProjectWithParameters, UpdateProjectInput, createProjectInput } from '../models/Project';


axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.headers.patch['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';

/* eslint-disable @typescript-eslint/no-explicit-any */
function deserializeProject (project: any): Project {
    project.createdAt = new Date(project.createdAt)
    project.updatedAt = new Date(project.createdAt)
    return project;
}
/* eslint-enable @typescript-eslint/no-explicit-any */


export async function getAllProjects (): Promise<Project[]> {

    try {
        const result = await axios.get(`/projects`);
        const collection = result.data.data;
        collection.forEach(deserializeProject);
        return collection;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getProjectById (id: number): Promise<ProjectWithParameters | null>{
    try {
        const {data} = await axios.get(`/projects/${id}`);
        deserializeProject(data.data);
        return data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function createProject (project: createProjectInput) : Promise<boolean>{
    try{
        await axios.post(`/projects`, project );
        return true;
    }
    catch(error){
        console.error(error);
    }

    return false;
}

export async function updateProject (project: UpdateProjectInput): Promise<Project | null>{
    try{
        const result = await axios.patch(`/projects/${project.id}`, project);
        return result.data.data;
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

