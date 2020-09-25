import { Component, OnInit } from '@angular/core';
import { TimetableService } from '../shared/services/timetable.service';
import { TimeTable } from '../shared/models/TimeTable';
import { StudentService } from '../shared/services/student.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-timetable-page',
  templateUrl: './timetable-page.component.html',
  styleUrls: ['./timetable-page.component.css'],
})
export class TimetablePageComponent implements OnInit {
  timeTable: TimeTable;
  dataFormatted: any[];
  constructor(
    private timeTableService: TimetableService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.timeTableService.get(this.studentService.get_student_id()).subscribe(
      (timeTable) => {
        this.timeTable = timeTable;
        console.log(timeTable);
        this.dataFormatted = this.processData(timeTable);
        console.log(this.dataFormatted);
      },
      (error) => {
        MaterialService.toast('Ошибка при загрузке');
        console.error('Ошибка при загрузке');
        console.error(error);
      }
    );
  }

  processData(timeTable: TimeTable) {
    let grouped_by_time: any[] = [
      [[], [], [], [], []],
      [[], [], [], [], []],
    ];
    // for(var weekIndex=0; weekIndex <Object.keys(timeTable).length; weekIndex++){
    //   for(var dayIndex=0; dayIndex < Object.keys(timeTable[weekIndex]).length; dayIndex++){
    //     for(var lessonIndex=0; lessonIndex< Object.keys(timeTable[weekIndex][dayIndex]).length;lessonIndex++){
    //
    //     }
    //   }
    // }
    for (let week of Object.values(timeTable)) {
      for (let day of Object.values(week)) {
        for (let lesson of day) {
          switch (lesson.timeStart) {
            case '08:30':
              grouped_by_time[lesson.week - 1][0][
                lesson.dayOfWeek - 1
              ] = lesson;
              break;
            case '10:25':
              grouped_by_time[lesson.week - 1][1][
                lesson.dayOfWeek - 1
              ] = lesson;
              break;
            case '12:20':
              grouped_by_time[lesson.week - 1][2][
                lesson.dayOfWeek - 1
              ] = lesson;
              break;
            case '14:15':
              grouped_by_time[lesson.week - 1][3][
                lesson.dayOfWeek - 1
              ] = lesson;
              break;
            case '16:10':
              grouped_by_time[lesson.week - 1][4][
                lesson.dayOfWeek - 1
              ] = lesson;
              break;
          }
        }
      }
    }

    return grouped_by_time;
  }
}

enum Times {
  First,
  Second,
  Third,
  Fourth,
  Fifth,
  Sixth,
}
