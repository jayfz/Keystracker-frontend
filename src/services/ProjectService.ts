import axios from 'axios'
import { deserializeRecord, setAxiosDefaults } from './common';
import { Project, ProjectWithParameters, UpdateProjectInput, createProjectInput } from '../models/Project';

setAxiosDefaults(axios);


export default class ProjectService{

    private signal: AbortSignal;

    constructor(externalSignal : AbortSignal){
        this.signal = externalSignal;
    }


    async getAllProjects (): Promise<Project[]> {
        try {
            const {data: {data: projectCollection}} = await axios.get(`/projects`, {signal: this.signal});
            projectCollection.forEach(deserializeRecord<Project>);
            return projectCollection;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getProjectById (id: number): Promise<ProjectWithParameters | null>{
        try {
            const {data:{data: project}} = await axios.get(`/projects/${id}`, {signal: this.signal});
            return deserializeRecord<ProjectWithParameters>(project);

        } catch (error) {
            console.error(error);
        }
        return null;
    }

    async createProject (projectInput: createProjectInput) : Promise<Project | null>{
        try{
            const {data: {data: project}} = await axios.post(`/projects`, projectInput,{signal: this.signal} );
            return deserializeRecord<Project>(project);
        }
        catch(error){
            console.error(error);
        }

        return null;
    }

    async updateProject (projectInput: UpdateProjectInput): Promise<Project | null>{
        try{
            const {data: {data:project}} = await axios.patch(`/projects/${projectInput.id}`, projectInput, {signal: this.signal});
            return deserializeRecord<Project>(project);
        }

        catch(error){
            console.error(error);
        }
        return null;
    }

    async deleteProject(id: number) : Promise<boolean> {
        try {
            await new Promise(resolve => setTimeout(resolve, 4000));
            await axios.delete(`/projects/${id}`, {signal: this.signal});
            return true;
        }
        catch(error){
            console.error(error);
        }


        return false;
    }

}