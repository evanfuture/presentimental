import {
  Component,
  ViewChild,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-modal-base',
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss'],
})
export class ModalBaseComponent {
  @ViewChild('container', { static: true }) container: ElementRef;

  @Output()
  public modalClose = new EventEmitter();

  constructor() {}

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.container.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.modalClose.emit();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.modalClose.emit(null);
  }
}
