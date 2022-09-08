import { Input, Output, Component, OnInit, EventEmitter, Optional } from '@angular/core';

import { formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { TractorInterface } from '../../interfaces/DTO/tractor-interface';
import { environment } from '../../../environments/environment';
import { UserInterface } from 'src/app/interfaces/DTO/user-interface';

@Component({
  selector: 'app-tractor-card',
  templateUrl: './tractor-card.component.html',
  styleUrls: ['./tractor-card.component.scss']
})
export class TractorCardComponent implements OnInit {
  @Optional() @Input() user!: UserInterface | null;
  @Input() tractor!: TractorInterface;
  @Input() isEditableCard: boolean = false;
  @Optional() @Output() handleEditTractor = new EventEmitter<TractorInterface>();
  @Optional() @Output() handleDeleteTractor = new EventEmitter<TractorInterface>();
  UrlPhotoDefault: string = environment.serverNode + '/files/default.png';
  publishedDateRelativeToNow!: string;

  constructor(
  ) { }


  ngOnInit(): void {
    this.formatHour();
  }

  formatHour(): void {
    const publishedAt = new Date(this.tractor.createdAt)

    this.publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
      locale: ptBR,
      addSuffix: true,
    });
  }
}
