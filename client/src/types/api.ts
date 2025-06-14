import { 
    MeshData, 
    BoundingBox, 
    PrimitiveType, 
    BooleanOperation, 
    ExportFormat,
    PlaneType,
    SketchElementType,
    ExtrudeParameters,
    SketchPlane,
    Sketch,
    ExtrudeFeature
} from './geometry';

export interface CADResponse {
    success: boolean;
    session_id: string;
    timestamp: string;
    data?: any;
    error?: {
        code: string;
        message: string;
        details?: Record<string, any>;
    };
    performance?: {
        processing_time_ms: number;
        geometry_complexity: number;
    };
}

export interface ModelCreateRequest {
    session_id: string;
    operation: 'create_model';
    parameters: {
        type: 'primitive' | 'sketch' | 'imported';
        primitive_type?: PrimitiveType;
        dimensions?: Record<string, number>;
        position?: [number, number, number];
        rotation?: [number, number, number];
    };
}

export interface ModelResponse extends CADResponse {
    data: {
        model_id: string;
        mesh_data?: MeshData;
        bounding_box: BoundingBox;
        file_urls?: Record<string, string>; // format -> download URL
    };
}

// Sketch-based modeling requests/responses
export interface CreateSketchPlaneRequest {
    plane_type: PlaneType;
    origin?: [number, number, number];
}

export interface CreateSketchPlaneResponse extends CADResponse {
    data: {
        plane_id: string;
        plane_type: PlaneType;
        origin_x: number;
        origin_y: number;
        origin_z: number;
    };
}

export interface CreateSketchRequest {
    plane_id: string;
}

export interface CreateSketchResponse extends CADResponse {
    data: {
        sketch_id: string;
        plane_id: string;
    };
}

export interface AddSketchElementRequest {
    sketch_id: string;
    element_type: SketchElementType;
    parameters: {
        // For lines
        x1?: number;
        y1?: number;
        x2?: number;
        y2?: number;
        
        // For circles
        center_x?: number;
        center_y?: number;
        radius?: number;
    };
}

export interface AddSketchElementResponse extends CADResponse {
    data: {
        sketch_id: string;
        element_type: SketchElementType;
        element_id: string;
    };
}

export interface ExtrudeSketchRequest {
    sketch_id: string;
    distance: number;
    direction?: 'normal' | 'custom';
}

export interface ExtrudeSketchResponse extends CADResponse {
    data: {
        feature_id: string;
        sketch_id: string;
        distance: number;
        direction: string;
        mesh_data?: MeshData;
    };
}

export interface DaydreamsInstructionRequest {
    instruction: string;
    sessionId: string;
} 