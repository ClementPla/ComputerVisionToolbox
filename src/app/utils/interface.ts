import { Point2D } from "./geometry";

export interface ROIProperty{
    name: string;
    color: string;
    initial1: Point2D;
    initial2: Point2D;
    data?: ImageData;
}


interface SVGProperty{
    x1?: string;
    y1?: string;
    x2?: string;
    y2?: string;
    x?: string;
    y?: string;
    cx?: string;
    cy?: string;
    r?: string;
    width?: string;
    height?: string;
    stroke?: string;
    'stroke-width'?: string;
    fill?: string;
}

export interface SVGElementInterface{
    id: number;
    type: string;
    attributes: SVGProperty;
}