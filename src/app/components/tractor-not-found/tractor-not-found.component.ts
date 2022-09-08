import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-tractor-not-found',
  templateUrl: './tractor-not-found.component.html',
  styleUrls: ['./tractor-not-found.component.scss']
})
export class TractorNotFoundComponent implements OnInit {
  @Input() noTractorFound: boolean | null = false;
  constructor(
  ) { }

  ngOnInit(): void {
  }
}
