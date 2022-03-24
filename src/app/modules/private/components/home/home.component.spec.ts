import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CardsSliderComponent } from '../cards-slider/cards-slider.component';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CarouselComponent, IvyCarouselModule } from 'angular-responsive-carousel';


describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent, CardsSliderComponent, CarouselComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        IvyCarouselModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Event functions', () => {
    it('Should be equal true', () => {
      component.onCardAtivado(true);
      expect(component.cardVisto).toEqual(true);
    });
    it('Should change details variable', () => {
      component.onMoreClicked(123);
      expect(component.movieClickedId).toEqual(123);
      expect(component.showDetails).toEqual(true);
    });
    it('Should change variables change values', () => {
      component.mainMovieClick();
      expect(component.movieClickedId).toEqual(568124);
      expect(component.showDetails).toEqual(true);
    });
    it('should navigate to login', () => {
      jest.spyOn(router, 'navigate').mockReturnValue(null);
      component.returnLogin();
      expect(router.navigate).toHaveBeenCalledWith(['public/login']);
    });
    it('Should clean session and local storage', () => {
      var localStorageMock = (function() {
        var store = {};
        return {
          getItem: function(key) {
            return store[key];
          },
          setItem: function(key, value) {
            store[key] = value.toString();
          },
          clear: function() {
            store = {};
          },
          removeItem: function(key) {
            delete store[key];
          }
        };
      })();
      Object.defineProperty(window, 'localStorage', { value: localStorageMock });
      jest.restoreAllMocks();
      const returnLogin = jest.spyOn(component, 'returnLogin');
      const localStorage = jest.spyOn(localStorageMock, 'removeItem');
      component.resetStorage();
      expect(localStorage).toBeCalled();
      expect(window.sessionStorage.getItem('usuario')).toBe(null);
      expect(returnLogin).toHaveBeenCalled();
    });
  });
});
