export interface TimeTable {
  [Key: string]: Day;
}
export interface Day {
  [Key: string]: Lesson[];
}

interface Subject {
  name: string;
  teachers: string[];
  lessonsZoom: any[];
  labsZoom: any[];
  isRequired: boolean;
}

export interface Lesson {
  subject: Subject;
  // 1 or 2
  week: number;
  dayOfWeek: number;
  // numberOfLesson: number;
  timeStart: string;
  type: 'Лек' | 'Лаб';
}
