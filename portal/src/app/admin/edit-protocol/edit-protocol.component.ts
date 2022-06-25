import {Component, EventEmitter, forwardRef, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators} from "@angular/forms";
import {RequestService} from "../../request.service";

@Component({
  selector: 'app-edit-protocol',
  templateUrl: './edit-protocol.component.html',
  styleUrls: ['./edit-protocol.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditProtocolComponent),
      multi: true
    }
  ]
})
export class EditProtocolComponent implements OnInit, ControlValueAccessor {
  onChanged: any = () => {
  }
  onTouched: any = () => {
  }

  data: any = {};
  formGroup = new FormGroup({});
  protocols: any = [];

  @Output() codes: EventEmitter<any> = new EventEmitter<any>()

  constructor(private fb: FormBuilder, private rs: RequestService) {
  }

  findCodes() {
    this.protocols.forEach((p: any) => {
      if (p.name == this.formGroup.value.name) {
        this.codes.emit(p.codes)
      }
    })
  }

  ngOnInit(): void {
    this.rs.get('system/protocols').subscribe(res => {
      this.protocols = res.data;
      this.findCodes()
    })
    this.buildForm();
  }

  buildForm(): void {
    this.formGroup = this.fb.group({
      name: [this.data.name, [Validators.required]],
      options: [this.data.options, []],
    })
  }

  change() {
    this.formGroup.markAsDirty();
    this.formGroup.updateValueAndValidity();
    this.onChanged(this.formGroup.value);
    this.onTouched();
    this.findCodes()
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(obj: any): void {
    this.data = obj || {};
    this.buildForm();
    this.findCodes()
  }

}
