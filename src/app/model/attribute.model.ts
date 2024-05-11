import { AttributeDescription } from "./attributedescription.model";

export interface Attribute{
    id:number;
    name:string;
    categoryId:number;
    attributeDescription:AttributeDescription[];
}