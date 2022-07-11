import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {NzMessageService} from "ng-zorro-antd/message";
import {RequestService} from "../../request.service";

@Component({
  selector: 'app-project-hmi',
  templateUrl: './project-hmi.component.html',
  styleUrls: ['./project-hmi.component.scss']
})
export class ProjectHmiComponent implements OnInit, OnDestroy {

  @Input() hmi = "";
  @Input() id = 0;

  ws?: WebSocket;

  data: any = {};
  values: any = {};

  constructor(private ms: NzMessageService, private rs: RequestService) { }

  ngOnInit(): void {
    this.load();
    this.watch();
  }

  ngOnDestroy(): void {
    this.ws?.close();
  }

  load() {
    this.rs.get(`hmi/${this.hmi}/manifest`).subscribe(res=>{
      this.data = res
    })
  }

  watch() {
    const host = environment.production ? location.origin.replace(/^http/, 'ws') : 'ws://localhost:8080';

    this.ws = new WebSocket(`${host}/api/project/${this.id}/watch`);
    //this.transfer = this.san.bypassSecurityTrustUrl(`open-vcom://${host}/api/tunnel/${this._id}/transfer`);

    this.ws.onmessage = (e: any) => {
      console.log('websocket onmessage', e.data)
      const msg: any = JSON.parse(e.data);

      switch (msg.event) {
        case "error":
          this.ms.error(msg.data)
          break;
        case "data":
          //this.ms.success(JSON.stringify(msg.data))
          this.values = msg.data;
          break;
      }
    }
    this.ws.onerror = (e: any) => {
      console.log('websocket onerror', e)
    }
    this.ws.onclose = (e: any) => {
      console.log('websocket onclose', e)
    }
  }

  invoke($event: any) {
    console.log("invoke", $event)
    this.rs.post(`project/${this.id}/execute`, $event).subscribe(res=>{
      this.data = res.data
    })
  }

  bind(obj: any) {
    console.log("bind", obj)
    this.rs.post(`project/${this.id}/context`, obj).subscribe(res=>{
      this.data = res.data
    })
  }
}
