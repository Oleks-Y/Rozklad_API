import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Lesson, TimeTable } from '../shared/models/TimeTable';
import { TimetableService } from '../shared/services/timetable.service';
import { StudentService } from '../shared/services/student.service';
import { MaterialService } from '../shared/classes/material.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-timetable-page-responsive',
  templateUrl: './timetable-page-responsive.component.html',
  styleUrls: ['./timetable-page-responsive.component.css'],
})
export class TimetablePageResponsiveComponent implements OnInit, AfterViewInit {
  timeTable: TimeTable;
  timeTableArray: any[];
  currentDay: number;
  currentWeek: number;

  constructor(
    private timeTableService: TimetableService,
    private studentService: StudentService,
    private route: ActivatedRoute
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

  ngAfterViewInit() {
    this.goToHash();
    this.scrollToResults();
  }

  public scrollToResults() {
    setTimeout(() => {
      console.log(`day${this.currentDay - 1}`);
      setTimeout(() => {
        let element = document.getElementById(`day${this.currentDay - 1}`);
        //1000 is the scroll time it self, 1s:
        window.scroll(0, element.offsetTop);
      }, 1000);
    });
  }

  toArray(timeTable: TimeTable) {
    let timeTableArray = [];
    for (let week of Object.values(timeTable)) {
      let weekArr = [];
      for (let day of Object.values(week)) {
        let dayOrdered = this.arrangeLessons(day);

        weekArr.push(dayOrdered);
      }
      timeTableArray.push(weekArr);
    }
    console.log('TimeTable:', timeTableArray);
    return timeTableArray;
  }

  arrangeLessons(day: Lesson[]) {
    let dayOrdered = new Array(5);
    for (let lesson of day) {
      switch (lesson.timeStart) {
        case '08:30':
          dayOrdered[0] = lesson;
          break;
        case '10:25':
          dayOrdered[1] = lesson;
          break;
        case '12:20':
          dayOrdered[2] = lesson;
          break;
        case '14:15':
          dayOrdered[3] = lesson;
          break;
        case '16:10':
          dayOrdered[4] = lesson;
          break;
        default:
          break;
      }
    }
    return dayOrdered;
  }

  getNumberOfWeek() {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    // @ts-ignore
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }

  goToHash() {
    location.hash = '#day' + (this.currentDay - 1);
  }
}
