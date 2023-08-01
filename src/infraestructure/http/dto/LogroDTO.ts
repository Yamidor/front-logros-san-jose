import { ActivityDTO, ActivityDTOId } from "./ActivityDTO";
import { CuorseDTO, CuorseDTOId } from "./CourseDTO";
import { PeriodDTO, PeriodDTOId } from "./PeriodDTO";
import { SubjectDTOId } from "./SubjectDTO";
import { TeacherDTO, TeacherDTOId } from "./TeacherDTO";

//type CuorseDTO = string;
//type PeriodDTO = string;
//type TeacherDTO = string;

export type LogroDTOId = string;


export interface LogroDTO {
    id: LogroDTOId,
    name: string,
    course: CuorseDTOId,
    period: PeriodDTOId,
    teacher: TeacherDTOId,
    subject: SubjectDTOId,
    activity?: ActivityDTOId[]
}