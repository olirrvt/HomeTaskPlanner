import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private exibirModalSource = new BehaviorSubject<boolean>(false);
  exibirModal$ = this.exibirModalSource.asObservable();

  exibirModal(): void {
    this.exibirModalSource.next(true);
  }

  fecharModal(): void {
    this.exibirModalSource.next(false);
  }
}