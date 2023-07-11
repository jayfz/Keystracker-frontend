import axios from 'axios'
import { deserializeRecord, setAxiosDefaults } from './common';
import { Project, ProjectWithParameters, UpdateProjectInput, createProjectInput } from '../models/Project';

setAxiosDefaults(axios);





async function getAllProjects (): Promise<Project[]> {

    try {
        const {data: {data: projectCollection}} = await axios.get(`/projects`);
        projectCollection.forEach(deserializeRecord<Project>);
        return projectCollection;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function getProjectById (id: number): Promise<ProjectWithParameters | null>{
    try {
        const {data:{data: project}} = await axios.get(`/projects/${id}`);
        return deserializeRecord<ProjectWithParameters>(project);

    } catch (error) {
        console.error(error);
    }
    return null;
}

async function createProject (projectInput: createProjectInput) : Promise<Project | null>{
    try{
        const {data: {data: project}} = await axios.post(`/projects`, projectInput );
        return deserializeRecord<Project>(project);
    }
    catch(error){
        console.error(error);
    }

    return null;
}

async function updateProject (projectInput: UpdateProjectInput): Promise<Project | null>{
    try{
        const {data: {data:project}} = await axios.patch(`/projects/${projectInput.id}`, projectInput);
        return deserializeRecord<Project>(project);
    }

    catch(error){
        console.error(error);
    }
    return null;
}

async function deleteProject(id: number) : Promise<boolean> {
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

