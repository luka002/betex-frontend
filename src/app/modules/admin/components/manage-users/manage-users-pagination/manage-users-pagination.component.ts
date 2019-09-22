import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Page} from '../../../../core/models';

@Component({
  selector: 'betex-manage-users-pagination',
  templateUrl: './manage-users-pagination.component.html',
  styleUrls: ['./manage-users-pagination.component.scss']
})
export class ManageUsersPaginationComponent {
  @Input() page: Page;
  @Output() getUsers = new EventEmitter<number>();
  @Output() setUsername = new EventEmitter<string>();

  goToPage(input: HTMLInputElement) {
    if (isNaN(+input.value) || +input.value < 1 || +input.value > this.page.lastPage) {
      return;
    }
    this.getUsers.emit(+input.value);
  }

  search(input: HTMLInputElement) {
    this.setUsername.emit(input.value);
    this.getUsers.emit(1);
  }

  setPage(page) {
    this.getUsers.emit(page);
  }

  previousPage() {
    if (this.page.currentPage > 1) {
      this.getUsers.emit(this.page.currentPage - 1);
    }
  }

  nextPage() {
    if (this.page.currentPage < this.page.lastPage) {
      this.getUsers.emit(this.page.currentPage + 1);
    }
  }

  availablePages(): Array<number> {
    const numbers = [];
    for (let i = this.firstPage(); i <= this.lastPage(); i++) {
      numbers.push(i);
    }
    return numbers;
  }

  private firstPage(): number {
    return this.page.currentPage - this.page.previousPagesCount;
  }

  private lastPage(): number {
    return this.page.currentPage + this.page.nextPagesCount;
  }

}
