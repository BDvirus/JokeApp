import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JokedialogComponent } from './jokedialog.component';

describe('JokedialogComponent', () => {
  let component: JokedialogComponent;
  let fixture: ComponentFixture<JokedialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JokedialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JokedialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
