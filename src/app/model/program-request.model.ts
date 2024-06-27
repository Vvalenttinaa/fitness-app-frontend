import { AttributeDescriptionRequest } from "./attribute-description-request.model";
import {Image} from "./image.model";
import { AttributeDescription } from "./attributedescription.model";

export interface ProgramRequest {
    name: string;
    price: number;
    description: string;
    level: number;
    duration: number;
    contact: string;
    locationName: string;
    instructorName: string;
    categoryId: number;
    attributes: AttributeDescriptionRequest[];
  }