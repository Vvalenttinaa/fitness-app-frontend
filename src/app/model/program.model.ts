import { Image } from "./image.model";
import { Attribute } from "./attribute.model";
import { AttributeDescription } from "./attributedescription.model";

export interface Program{
    id: number;
    name: string;
    description: string;
    price:number;
    locationName:string;
    level:number;
    duration:number;
    contact:string;
    instructorName:string;
    categoryName:string;
    images: Image[];
    attributedescriptionsById : AttributeDescription[];

}