import { CommonModule, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() label: string = 'click Me';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() size: 'medium' | 'small' | 'large' = 'medium';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.click.emit();
    }
  }
}
