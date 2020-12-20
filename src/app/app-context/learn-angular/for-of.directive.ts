import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[forOf]'
})
export class ForOfDirective implements OnInit{

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<Object>) {

  }

  @Input('forOf')
  iterator: any[];

  ngOnInit(): void {
    this.container.clear();
    for (let item of this.iterator){
      this.container.createEmbeddedView(this.template, new IteratorContext(item, this.iterator.length))
    }
  }

}

class IteratorContext{
  constructor(public $implicit: any, public length: number) {
  }
}
