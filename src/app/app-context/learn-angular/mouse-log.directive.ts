import {Attribute, Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from "../../service/app.service";

@Directive({
  selector: '[mouse-log]'
})
export class MouseLogDirective implements OnInit{

  @Input("mouse-log")
  prefix: string;

  @Output("mouse-action")
  mouseAction: EventEmitter<string> = new EventEmitter<string>();

  constructor(public element: ElementRef,
              @Attribute("mouse-log") prefix,
              public appService: AppService) {
    console.log(prefix)
  }

  ngOnInit(): void {
    this.element.nativeElement.addEventListener('click', e => {
      const actionMsg = `${this.prefix}元素: 鼠标点击`;
      this.appService.showSnackBar(actionMsg, 1000);
      this.mouseAction.emit(actionMsg)
    });
    this.element.nativeElement.addEventListener('mouseenter', e => {
      const actionMsg = `${this.prefix}元素: 鼠标进入`;
      this.appService.showSnackBar(actionMsg, 1000);
      this.mouseAction.emit(actionMsg)
    });
    this.element.nativeElement.addEventListener('mouseleave', e => {
      const actionMsg = `${this.prefix}元素: 鼠标移出`;
      this.appService.showSnackBar(`${this.prefix}元素: 鼠标移出`, 1000);
      this.mouseAction.emit(actionMsg)
    });

  }


}
