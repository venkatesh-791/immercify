import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { distinctUntilChanged, map, pairwise, takeUntil, throttleTime } from 'rxjs/operators';
import { Subject ,fromEvent} from 'rxjs';
import { Router } from '@angular/router';


export enum VisibilityState {
  Visible = 'visible',
  Hidden = 'hidden'
}

export enum Direction {
  None = 'None',
  Up = 'Up',
  Down = 'Down'
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state(VisibilityState.Visible, style({
        transform: 'translateY(0)'
      })),
      state(VisibilityState.Hidden, style({
        transform: 'translateY(-64px)' // adjust this to the height of your header
      })),
      transition(`${VisibilityState.Visible} => ${VisibilityState.Hidden}`, animate('250ms')),
      transition(`${VisibilityState.Hidden} => ${VisibilityState.Visible}`, animate('250ms'))
    ])
  ]
})
export class HeaderComponent implements OnInit {

  @ViewChild('toggle', {static: true}) public toggle!: ElementRef;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  isHeader1Visible = VisibilityState.Visible;
  isHeader2Visible = VisibilityState.Hidden;
  slideHeader2InAtPosition = 30;
  isBottom = false;
  defaultStatus: string = 'Product';
  toggleS = false;
  isColorValue: any;
  show: boolean=true;
  constructor(
    private renderer: Renderer2, private router: Router,

  ) { }

  @HostListener('window:scroll', [])
  onScroll(): void {
 
    if(window.scrollY == 0) {
      this.isBottom = false;
   
      // this.defaultStatus = ''
    } else if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
     
      this.isBottom = true;
        } 
  }
  ngOnInit(){
  }
  openimg() {
    this.defaultStatus = ''

  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  ngAfterViewInit() {
    // create an observable stream of scroll positions and map them to UP / DOWN directions
    var content:any = document.querySelector('.scrollWrapper');
    var scroll$ = fromEvent(content, 'scroll').pipe( // if the scroll events happen on your window you could use 'window' instead of 'content' here
      throttleTime(10),
      map(() => content.scrollTop), // if you used 'window' above replace 'content.scrollTop' with 'window.pageYOffset'
      pairwise(),
      map(([y1, y2]): Direction => {
        // console.log(y1, y2);
        return (y2 < y1 ? Direction.Up : (y2 > this.slideHeader2InAtPosition ? Direction.Down : Direction.None));
      }),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    );

    // subscribe to the UP / DOWN scroll direction stream and set the header state accordingly
    scroll$.subscribe(dir => {
      if (dir === Direction.Down) {
        console.log('scrolling down', content.scrollTop);
        this.isHeader1Visible = VisibilityState.Hidden;
        this.isHeader2Visible = VisibilityState.Visible;
      } else {
        console.log('scrolling up', content.scrollTop);
        this.isHeader1Visible = VisibilityState.Visible;
        this.isHeader2Visible = VisibilityState.Hidden;
      }
    });
  }

 
  activeStatus(e: string) {
    this.show=!this.show;
    this.defaultStatus = e;
     this.removeClass();
    this.isBottom = false;
  }
 testBool = true;
  clickToggleColor() {
    this.testBool = !this.testBool;
    console.log('this.testBool',this.testBool)

    if(this.testBool) {
      this.isBottom = false;
    }

    else {
      this.isBottom = true;
    }
  
  }

  routeNav(){
    this.router.navigate(['/start']);
    this.removeClass();

  }
  routeChange() {
    this.router.navigate(['/try']);
    this.removeClass();
  }

   removeClass() {
     this.renderer.removeClass(this.toggle.nativeElement, 'show')
   }

}
