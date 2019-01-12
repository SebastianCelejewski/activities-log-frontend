import { Component, OnInit } from '@angular/core';

import { AuthService } from "../../services/auth/auth.service";
import { DutyStatus } from "../../domain/dutyStatus";

@Component({
  selector: 'app-duties',
  templateUrl: './duties.component.html',
  styleUrls: ['./duties.component.css']
})
export class DutiesComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  public changeStatus(dutyStatus) {
      console.log("Changing status for " + dutyStatus.dutyType + " on " + dutyStatus.date + " from " + dutyStatus.status);
//      var element = this.duties.dutyInfo.find((x) => x.date===dutyStatus.date).dutyStatuses[0];
    var rawDuty = this.dutiesRaw.find((x) => x.date === dutyStatus.date && x.dutyType == dutyStatus.dutyType);

    if (!rawDuty) {
      this.dutiesRaw.push({
        date: dutyStatus.date,
        dutyType: dutyStatus.dutyType,
        user: "Filip",
        status: true
      });
    } else {
      if (dutyStatus.status == undefined) {
        rawDuty.status = true;
      } else if (dutyStatus.status == true) {
        rawDuty.status = false;
      } else {
        rawDuty.status = undefined;
      }
    }
  }

  public dutiesRaw = [
    { date: "2019-01-10", dutyType: "Obowiązki podstawowe", user: "Filip", status: true},
    { date: "2019-01-10", dutyType: "Coś dla domu", user: "Filip", status: true},
    { date: "2019-01-11", dutyType: "Przygotowanie do szkoły", user: "Filip", status: false},
    { date: "2019-01-12", dutyType: "W łóżku przed 21:30", user: "Filip", status: true}
  ]

  public dutyTypes = [ 
        "Obowiązki podstawowe",
        "Coś dla domu",
        "Przygotowanie do szkoły",
        "Porządek w pokoju",
        "W łóżku przed 21:30"];

  public dates = [ "2019-01-08", "2019-01-09", "2019-01-10", "2019-01-11", "2019-01-12"];

  public getDuties() {
    var data = [];
    this.dates.forEach(d => {
      var element = { date: d, dutyStatuses: []};
      this.dutyTypes.forEach(dt => {
        element.dutyStatuses.push({
          date: d,
          dutyType: dt,
          user: "Filip",
          status: undefined
        }
        );
      })
      data.push(element);
    });

    this.dutiesRaw.forEach(d => {
      data
        .find((x) => x.date === d.date)
        .dutyStatuses
        .find((x) => x.dutyType === d.dutyType)
        .status = d.status;
    });

    return data;
  }
}