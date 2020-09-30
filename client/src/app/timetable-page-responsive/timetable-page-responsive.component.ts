import { Component, OnInit } from '@angular/core';
import { TimeTable } from '../shared/models/TimeTable';
import { TimetableService } from '../shared/services/timetable.service';
import { StudentService } from '../shared/services/student.service';
import { MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-timetable-page-responsive',
  templateUrl: './timetable-page-responsive.component.html',
  styleUrls: ['./timetable-page-responsive.component.css'],
})
export class TimetablePageResponsiveComponent implements OnInit {
  timeTable: TimeTable;
  timeTableArray: any[];
  currentDay: number;
  currentWeek: number;
  constructor(
    private timeTableService: TimetableService,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.timeTableService.get(this.studentService.get_student_id()).subscribe(
      (timeTable) => {
        this.timeTable = timeTable;
        console.log(timeTable);
        this.timeTableArray = this.toArray(timeTable);
        console.log(this.timeTableArray);
      },
      (error) => {
        MaterialService.toast('Ошибка при загрузке');
        console.error('Ошибка при загрузке');
        console.error(error);
      }
    );

    this.currentDay = new Date().getDay();
    this.currentWeek = this.getNumberOfWeek() % 2;
    console.log(this.currentDay);
  }

  toArray(timeTable: TimeTable) {
    let timeTableArray = [];
    for (let week of Object.values(timeTable)) {
      let weekArr = [];
      for (let day of Object.values(week)) {
        var reversed = day.reverse();
        weekArr.push(reversed);
      }
      timeTableArray.push(weekArr);
    }

    return timeTableArray;
  }
  getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    // @ts-ignore
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }
}
