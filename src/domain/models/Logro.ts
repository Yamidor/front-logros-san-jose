import { Course, CourseId } from "./Course" 
import { Period, PeriodId } from "./Period"
import { Activity, ActivityId } from "./Activity"  
import { Teacher, TeacherId } from "./Teacher"
import { SubjectId } from "./Subject"

export type LogroId = string

export type Logro = {
  id: LogroId
  number: string
  name: string
  course: any,
  period: any,
  teacher: any;
  subject: any
}