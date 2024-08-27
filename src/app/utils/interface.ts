import { Point2D } from "./geometry";

export interface ROIProperty{
    name: string;
    color: string;
    initial1: Point2D;
    initial2: Point2D;
    data?: ImageData;
}