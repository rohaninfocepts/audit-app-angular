import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReviewNcService} from './service/reviewNcService'

@Component({
  selector: 'app-review-nc',
  templateUrl: './review-nc.component.html',
  styleUrls: ['./review-nc.component.css'],
  providers: [ReviewNcService]
})
export class ReviewNcComponent implements OnInit {

  public NcInfo: Object;
  ncId: number;

  constructor(private _activatedRoute: ActivatedRoute, private _reviewNcService: ReviewNcService) {
  }

  ngOnInit() {
    this.ncId = this._activatedRoute.snapshot.params['ncId'];
    console.log(this.ncId);
    this.getNcInfo();
  }


  private getNcInfo() {
    this._reviewNcService.getNcInfo(this.ncId)
      .subscribe(
        (data) => {
          this.NcInfo = data;
          console.log(data);
        },
        (err) => {
          alert(err);
        }
      );
  }

  public onFormSubmit(reviewNcForm: any) {
    console.log(reviewNcForm.value);
    this._reviewNcService.updateNc(reviewNcForm.value)
      .subscribe(
        (data) => {
          if (Boolean(data) === true) {
            this.getNcInfo();
          }
        },
        (err) => alert(err)
      );
  }

}
