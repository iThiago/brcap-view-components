import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: "cap-menu",
  templateUrl: "./cap-menu.component.html",
  styleUrls: ["./cap-menu.component.css"]
})
export class CapMenuComponent implements OnInit {
  @Input("id") id: string;
  @Input("value") value: Array<any>;
  @Input("width") width: number;
  @Input("backgroundColor") backgroundColor: string;
  @ViewChild("divMenu") divMenu: ElementRef;

  constructor() {}

  ngOnInit() {
    if (this.width) {
      this.divMenu.nativeElement.style.width = this.width + "px";
    }
    if (this.backgroundColor) {
      this.divMenu.nativeElement.style.background = this.backgroundColor;
    }
  }
}
