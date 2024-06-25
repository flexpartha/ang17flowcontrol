import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { UserDetail } from '../model/response.interface';

@Component({
  selector: 'app-descriptionview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './descriptionview.component.html',
  styleUrl: './descriptionview.component.scss',
})
export class DescriptionviewComponent implements OnInit {
  safeHtml!: SafeHtml;

  @Input() datalist!: UserDetail;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  sanitizeHTML(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
