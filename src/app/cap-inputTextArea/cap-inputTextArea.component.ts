import { Component, forwardRef, Input, OnInit, ElementRef, AfterViewInit, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgControl, NgModel } from "@angular/forms";
import { Subject } from "rxjs/Subject";
import BRCapUtil from "../../brcap-util";

const noop = () => {};

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CapInputTextAreaComponent),
  multi: true
};

import * as jqueryProxy from "jquery";
const $: JQueryStatic = (<any>jqueryProxy).default || jqueryProxy;

@Component({
  selector: "cap-inputTextArea",
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  templateUrl: "./cap-inputTextArea.component.html",
  styleUrls: ["./cap-inputTextArea.component.css"]
})
export class CapInputTextAreaComponent implements AfterViewInit, ControlValueAccessor, OnInit {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("placeholder") placeholder: string;
  @Input("mask") mask: string;
  @Input("styleClass") styleClass: string;
  @Input("maxlength") maxlength: string;
  @Input("styleInline") styleInline: string;
  @Input("textHelper") textHelper: string;
  @Input("disabled") disabled: boolean;

  @Input("cols") cols: string;
  @Input("rows") rows: string;

  @ViewChild("input") input;

  textError;

  private $el: any;
  private innerValue: any = "";

  constructor(private el: ElementRef) {
    this.$el = $(el.nativeElement);
  }

  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  ngOnInit() {
    if (!this.id) {
      this.id = BRCapUtil.guid();
    } else {
      this.id += "_textarea";
    }
    if (this.styleClass && this.styleClass.indexOf("error") != -1) {
      this.textError = "error";
    }
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  onBlur() {
    this.onTouchedCallback();
  }

  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  public ngAfterViewInit() {
    if (this.mask) {
      $(this.input.nativeElement).mask(this.mask);
    }
  }
}
