import {
  Component,
  OnInit,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { DescriptionviewComponent } from '../../descriptionview/descriptionview.component';
import { Observable } from 'rxjs';
import { UserDetail } from '../../model/response.interface';
import { JSonApiService } from '../../json-api.service';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-newflocontrol',
  standalone: true,
  imports: [RouterOutlet, FormsModule, DescriptionviewComponent],
  templateUrl: './newflocontrol.component.html',
  styleUrl: './newflocontrol.component.scss',
  //encapsulation: ViewEncapsulation.ShadowDom,
})
export class NewflocontrolComponent implements OnInit {
  LoadData$!: Observable<any>;
  loadData: UserDetail[] = [];
  //getEachValue: UserDetail[] = [];
  getEachValue = signal<UserDetail[]>([]);
  data$!: Observable<[]>;
  number = signal<number>(1);
  computedValue = computed(() => Number(this.number()) + 4);
  showCard = false;
  isVisibleNext = false;
  isVisible = false;
  name!: string;
  value1 = signal<number>(7);
  value2 = signal(0);

  sum = computed(() => this.value1() + 17);
  constructor(public readonly service: JSonApiService) {
    //this.LoadData$ = this.service.getJsonValue(this.number);
    // this.service.getJsonValue(this.number).subscribe((res) => {
    //   this.loadData = res;
    // });
    //this.onPreviousResult();
  }
  ngOnInit(): void {
    this.service.getJsonValue(this.number()).subscribe((res: UserDetail[]) => {
      this.loadData = res;
      if (this.loadData[0]?.userId === 1) {
        this.isVisible = true;
      }
    });
    this.loadCookieData();
  }

  onNextResult() {
    this.service.getNextPage().subscribe((res: UserDetail[]) => {
      this.loadData = res;
      this.isVisible = false;
      this.loadData.filter((item) => {
        if (item.userId === this.loadData.length) {
          this.isVisibleNext = true;
        }
      });
    });
  }

  onPreviousResult() {
    this.service.getPreviousPage().subscribe((res: UserDetail[]) => {
      this.loadData = res;
      this.isVisibleNext = false;
      if (this.loadData[0]?.userId == 1) {
        this.isVisible = true;
      }
    });
  }

  getChangedValue(evt: any) {
    this.number.set(evt.target.value);
  }
  getAllData() {
    console.log('value', this.number());
    this.service.getJsonValue(this.number()).subscribe((res: UserDetail[]) => {
      this.getEachValue.set(res);
      this.getEachValue.update((v) => v.slice(0, this.number()));
      console.log(this.getEachValue());
      if (this.getEachValue().length > 0) {
        this.showCard = true;
      } else {
        this.showCard = false;
      }
    });
    //this.data$ = this.service.getJsonValue(value);
  }
  trackByIndex(index: number, item: SafeHtml): number {
    return index;
  }

  saveData() {
    console.log('name', this.name);
    this.service.setCookie('key', this.name);
  }

  loadCookieData() {
    const value = this.service.getCookie('key');
    console.log('Load Value:::---', value);
    this.name = value;
  }

  deleteCookieData() {
    this.service.deleteCookie();
  }
}
