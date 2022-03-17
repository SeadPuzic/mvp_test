import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReportTableComponent } from './report-table.component';
import {HttpClientModule} from "@angular/common/http";

describe('FlowerListComponent', () => {
  let component: ReportTableComponent;
  let fixture: ComponentFixture<ReportTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [ ReportTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
