import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.scss']
})
export class JobEditComponent implements OnInit {
  target = 'job';
  title = '任务创建';
  id = 0;

  data: any = {};

  constructor(private as: ApiService, private routeInfo: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.routeInfo.snapshot.params.id || 0;
    if (this.id > 0) {
      this.as.get(this.target + '/' + this.id).subscribe(res => {
        this.data = res.data;
      });
    }
  }

  submit(): void {
    if (this.data.id) {
      this.as.put(this.target + '/' + this.data.id, this.data).subscribe(res => {
        console.log(res);
        // TODO 修改成功
        this['closeTab']();
      });
    } else {
      this.as.post(this.target, this.data).subscribe(res => {
        console.log(res);
        // TODO 保存成功
        this['closeTab']();
      });
    }
  }
}
