import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.less']
})
export class IconComponent implements OnInit {
  constructor() {}
  @Input() name!: string;
  @Input() isrotate?: boolean;
  ngOnInit(): void {}
}
