import {Component, Input, OnInit} from '@angular/core';
import {NzTableQueryParams} from "ng-zorro-antd/table";
import {RequestService} from "../../request.service";
import {NzModalRef} from "ng-zorro-antd/modal";
import {parseTableQuery} from "../table";

@Component({
  selector: 'app-product-browser',
  templateUrl: './product-browser.component.html',
  styleUrls: ['./product-browser.component.scss']
})
export class ProductBrowserComponent implements OnInit {
  datum: any[] = [];

  loading = false;
  total = 0;
  pageSize = 10;
  pageIndex = 1;

  params: any = {filter: {}};

  @Input()
  multiple = false;
  checked = false;
  indeterminate = false;
  setCheckedOfId = new Set<string>();
  tableData: readonly any[] = [];

  ids: string[] = [];

  onCurrentPageDataChange(currentPageData: readonly any[]): void {
    this.tableData = currentPageData;
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      if (!this.multiple)
        this.setCheckedOfId.clear();
      this.setCheckedOfId.add(id);
    } else {
      this.setCheckedOfId.delete(id);
    }
  }

  refreshCheckedStatus(): void {
    this.checked = this.tableData.every(({id}) => this.setCheckedOfId.has(id));
    this.indeterminate = this.tableData.some(({id}) => this.setCheckedOfId.has(id)) && !this.checked;
    this.ids = Array.from(this.setCheckedOfId)
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.tableData.forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  onItemClick(data: any) {
    this.onItemChecked(data.id, !this.setCheckedOfId.has(data.id))
  }

  constructor(private rs: RequestService, private mr: NzModalRef) {
  }

  ngOnInit(): void {
    //this.load();
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

  load(): void {
    this.loading = true;
    this.rs.post('product/list', this.params).subscribe(res => {
      console.log('res', res);
      this.datum = res.data;
      this.total = res.total;
    }).add(() => {
      this.loading = false;
    });
  }

  cancel() {
    this.mr.close()
  }

  ok() {
    this.mr.close(this.multiple ? this.ids : (this.ids.length && this.ids[0]));
    //this.mr.close(this.ids.length ? (this.multiple ? this.ids : this.ids[0]) : undefined);
  }
}
