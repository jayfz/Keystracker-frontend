import { deserializeRecord, client as axiosClient } from './common';
import { Project, ProjectWithParameters, UpdateProjectInput, CreateProjectInput } from '../models/Project';


export default class ProjectService{

    private signal: AbortSignal;

    constructor(externalSignal : AbortSignal){
        this.signal = externalSignal;
    }


    async getAllProjects (): Promise<Project[]> {
        try {
            const {data: projects} = await axiosClient.get(`/projects`, {signal: this.signal});
            projects.forEach(deserializeRecord<Project>);
            return projects;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getProjectById (id: number): Promise<ProjectWithParameters | null>{
        try {
            const {data: project} = await axiosClient.get(`/projects/${id}`, {signal: this.signal});
            return deserializeRecord<ProjectWithParameters>(project);

        } catch (error) {
            console.error(error);
        }
        return null;
    }

    async createProject (projectInput: CreateProjectInput) : Promise<Project | null>{
        try{
            const {data: project} = await axiosClient.post(`/projects`, projectInput,{signal: this.signal} );
            return deserializeRecord<Project>(project);
        }
        catch(error){
            console.error(error);
        }

        return null;
    }

    async updateProject (id: number, projectInput: UpdateProjectInput): Promise<Project | null>{
        try{
            const {data:project} = await axiosClient.patch(`/projects/${id}`, projectInput, {signal: this.signal});
            return deserializeRecord<Project>(project);
        }

        catch(error){
            console.error(error);
        }
        return null;
    }

    async deleteProject(id: number) : Promise<boolean> {
        try {
            await axiosClient.delete(`/projects/${id}`, {signal: this.signal});
            return true;
        }
        catch(error){
            console.error(error);
        }


        return false;
    }

}