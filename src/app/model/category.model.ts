import { Attribute } from "./attribute.model";

export default interface Category{
     id: number;
     name: string;
     attributes: Attribute[];
}