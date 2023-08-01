export type ActivityDTOId = string;

export interface ActivityDTO {
    actividad_id: ActivityDTOId,
    nombre: string,
    tipo_actividad_normal: boolean
  }