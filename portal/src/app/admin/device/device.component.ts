import {Component, OnInit} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {Router} from "@angular/router";
import {RequestService} from "../../request.service";
import {NzModalService} from "ng-zorro-antd/modal";
import {parseTableQuery} from "../table";

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  datum: any[] = [];

  loading = false;
  total = 0;
  pageSize = 20;
  pageIndex = 1;

  params: any = {filter: {}};
  view: string = 'card';

  constructor(private router: Router, private rs: RequestService, private ms: NzModalService) {

  }

  ngOnInit(): void {
    this.load();
  }

  search(keyword: string) {
    this.pageIndex = 1;
    this.params.skip = 0;
    if (keyword)
      this.params.keyword = {name: keyword};
    else
      delete this.params.keyword;
    this.load();
  }

  onQuery(params: NzTableQueryParams) {
    parseTableQuery(params, this.params);
    this.load();
  }

  onPageChange(page: number) {
    this.pageIndex = page;
    this.params.skip = (this.pageIndex - 1) * this.pageSize;
    this.load()
  }

  load(): void {
    this.loading = true;
    this.rs.post('device/list', this.params).subscribe(res => {
      console.log('res', res);
      this.datum = res.data;
      this.total = res.total;
    }).add(() => {
      this.loading = false;
    });
  }

  create(): void {
    this.router.navigate(["admin/device/create"]);
  }

  open(data: any): void {
    this.router.navigate(['/admin/device/detail/' + data.id]);
  }

  remove(data: any, i: number) {
    this.rs.get(`device/${data.id}/delete`).subscribe(res => {
      this.datum.splice(i, 1);
    });
  }

  enable(data: any) {
    this.rs.get(`device/${data.id}/enable`).subscribe(res => {
      data.disabled = false
    });
  }

  disable(data: any) {
    this.rs.get(`device/${data.id}/disable`).subscribe(res => {
      data.disabled = true
    });
  }
}
