import { Component, Input } from "@angular/core";

declare var $: any;

@Component({
  selector: "cap-button",
  host: {
    class: "cap-button"
  },
  templateUrl: "./cap-button.component.html",
  styleUrls: ["./cap-button.component.css"]
})
export class CapButtonComponent {
  @Input("id") id: string;
  @Input("label") label: string;
  @Input("disabled") disabled: string;
  @Input("icon") icon: string;
  @Input("loader") loader: boolean;
  @Input("styleClass") styleClass: string;


  constructor() {}
}
