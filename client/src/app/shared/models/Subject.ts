export interface Subject {
  _id: string;
  name: string;
  teachers: string[];
  lessonsZoom: any[];
  labsZoom: any[];
  isRequired: boolean;
}
