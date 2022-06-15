import { Component, OnInit } from '@angular/core';
// import SwiperCore, { Pagination, Navigation } from "swiper";
import { SwiperOptions } from 'swiper';

// import { SwiperComponent } from "swiper/angular";

// import Swiper core and required modules
// SwiperCore.use([Pagination, Navigation]);


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  config: SwiperOptions = {
    pagination: { 
      el: '.swiper-pagination', 
      clickable: true


    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    slidesPerView: 4
  };  

  // tradeshow=false;
  education =false;
  recruit = false;
  internal = false;
  iscard = false;

  // cardNames: string[];
  public cardNames=['Lobby','Exhibit Hall','Auditorium','Matchmaking','Networking','Mobile App'];

  public image =''
  constructor() {
    // this.image='../../assets/landing/dddddd.jpeg' 
  }

  ngOnInit(): void {
    this.toggleVisibility(7)
    this.trading(5)
      
  }
 public toggleVisibility(index:any){
    console.log('even--',index);
    switch(index) {
      case 0:
        // code block
        this.image='../../assets/landing/networking-chat.jpeg'
        break;
      case 1:
        // code block
        this.image='../../assets/landing/exhibit-hall.jpeg'
        break;
      case 2:
        // code block
        this.image='../../assets/landing/auditorium.jpeg'
        break;
      case 3:
        // code block
        this.image='../../assets/landing/matchmaking.jpeg'
        break;
      case 4:
        // code block
        this.image='../../assets/landing/networking-chat.jpeg'
        break;
      case 5:
        // code block
        this.image='../../assets/landing/mobile-app.jpeg'
        break;
        
      default:
        this.image='../../assets/landing/networking-chat.jpeg'
    }

    

  }

  public trading(index:any){
    switch(index) {
      case 1:
        this.iscard = true;

        break;
      case 2:
        // code block
        this.iscard = false;
        this.education = true;

        break;
      case 3:
          this.education = false;
        this.recruit = true;

      break;
      case 4:
        this.recruit = false;
        this.internal = true;
        // code block
      
        break;        
      default:
        this.iscard = true;

    }

    

  }

}
