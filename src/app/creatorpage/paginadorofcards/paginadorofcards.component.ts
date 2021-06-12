import { Component, Input, OnInit } from '@angular/core';
import { CardsModel } from 'src/app/gamepage/models/cardsmodel.model';
import { CreatorcardService } from '../../shared/creatorcard.service';

@Component({
  selector: 'app-paginadorofcards',
  templateUrl: './paginadorofcards.component.html',
  styleUrls: ['./paginadorofcards.component.css'],
})
export class PaginadorofcardsComponent implements OnInit {
  constructor(private creatorCardSer: CreatorcardService) {}

  @Input() packageCards: any;
  card: CardsModel;
  ngOnInit(): void {}
  startNumber = 0;
  editCard(index) {
    //this.isEditingCard = true;
    this.card = { ...this.packageCards[index] };
    //this.currenCardIndex = index;
    this.creatorCardSer.infoCard.next({ card: this.card, index: index });
  }

  showElemntsList(startNum) {
    this.startNumber += startNum;
    if (this.startNumber <= 0) {
      this.startNumber = 0;
    } else {
      if (!this.packageCards[this.startNumber]) {
        this.startNumber -= 5;
      }
    }
  }
}
