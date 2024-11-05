import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCocktailComponent } from './details-cocktail.component';

describe('DetailsCocktailComponent', () => {
  let component: DetailsCocktailComponent;
  let fixture: ComponentFixture<DetailsCocktailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsCocktailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsCocktailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
