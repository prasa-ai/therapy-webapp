import { Component, OnDestroy, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { ConfigurationService } from '../services/configuration.service';
import { Router } from '@angular/router';
import { HostListener } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateY(30px)'
        }),
        animate('800ms ease-in-out')
      ]),
      transition('* => void', [
        animate('600ms ease-in-out', style({
          opacity: 0,
          transform: 'translateY(-20px)'
        }))
      ])
    ]),
    trigger('slideInOut', [
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-50px) scale(0.8)'
        }),
        animate('1000ms cubic-bezier(0.35, 0, 0.25, 1)', style({
          opacity: 1,
          transform: 'translateX(0) scale(1)'
        }))
      ]),
      transition('* => void', [
        animate('700ms cubic-bezier(0.35, 0, 0.25, 1)', style({
          opacity: 0,
          transform: 'translateX(50px) scale(0.9)'
        }))
      ])
    ]),
    trigger('pulseGlow', [
      transition('* => *', [
        animate('600ms ease-in-out', keyframes([
          style({ transform: 'scale(1)', opacity: 1, offset: 0 }),
          style({ transform: 'scale(1.05)', opacity: 0.8, offset: 0.3 }),
          style({ transform: 'scale(1.02)', opacity: 0.9, offset: 0.7 }),
          style({ transform: 'scale(1)', opacity: 1, offset: 1 })
        ]))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, OnDestroy {


  constructor(
    private AuthService: AuthService,
    private configurationService: ConfigurationService,
    private router: Router) 
  {  }


  ngOnDestroy(): void {
    if (this.wordAnimationInterval) {
      clearInterval(this.wordAnimationInterval);
    }
  }

  cardDetail: string = "";
  flippedCardId: string | null = null;
  detailView: boolean = false;
  selectedCardId: string = '';
  selectedCard: any = null;
  private scrollProgress: number = 0;
  private ticking: boolean = false;


   // Animation properties
   currentWordIndex: number = 0;
   currentWord: string = '';
   currentWordType: 'challenge' | 'support' = 'challenge';
   showAnimatedWord: boolean = false;
   wordAnimationInterval: any;
   isInitialLoad: boolean = true;

  cardContents = [
    {
      id: 'card1',
      icon: 'pi pi-users',
      front: 'Individual & Family Therapy',
      back: 'Individual, Couple, Family Therapy (CBT, DBT, Solution Focus, trauma-focused, burnout recovery).',
      details: ""
    },
    {
      id: 'card2',
      icon: 'pi pi-heart-fill',
      front: 'Marriage Counseling',
      back: 'Marriage, Relationship conflict, Coparenting, & Pre/Post Marriage.',
      details: ""
    },
    {
      id: 'card3',
      icon: 'pi pi-compass',
      front: 'Career Transitions',
      back: 'Career Transitions and Burnouts.',
      details: ""
    },
    {
      id: 'card4',
      icon: 'pi pi-bolt',
      front: 'Crisis Intervention',
      back: 'Crisis Intervention and Risk Assessment.',
      details: ""
    },
    {
      id: 'card5',
      icon: 'pi pi-eye',
      front: 'Forensic Evaluations - Immigration',
      back: 'Immigration Evaluations (Asylum, VAWA, U-visa, T-visa).',
      details: ''
    },
    {
      id: 'card6',
      icon: 'pi pi-comments',
      front: 'Consulting Services',
      back: 'Consulting Services (for community agencies and legal partners).',
      details: ""
    }
  ];

  // Mental health challenges and supportive messages
  mentalHealthChallenges = [
    { word: 'Trauma', color: '#700000', shadow: 'rgba(231, 76, 60, 0.3)' },
    { word: 'Depression', color: '#3498DB', shadow: 'rgba(52, 152, 219, 0.3)' },
    { word: 'Anxiety', color: '#F39C12', shadow: 'rgba(243, 156, 18, 0.3)' },
    { word: 'PTSD', color: '#9B59B6', shadow: 'rgba(155, 89, 182, 0.3)' },
    { word: 'Grief', color: '#34495E', shadow: 'rgba(52, 73, 94, 0.3)' },
    { word: 'Stress', color: '#E67E22', shadow: 'rgba(230, 126, 34, 0.3)' },
    { word: 'Burnout', color: '#2ECC71', shadow: 'rgba(46, 204, 113, 0.3)' }
  ];

  supportiveMessages = [
    { 
      message: "You don't have to face this alone", 
      color: '#27AE60', 
      shadow: 'rgba(39, 174, 96, 0.2)' 
    },
    { 
      message: "Healing is possible", 
      color: '#3498DB', 
      shadow: 'rgba(52, 152, 219, 0.2)' 
    },
    { 
      message: "Your mental health matters", 
      color: '#E74C3C', 
      shadow: 'rgba(231, 76, 60, 0.3)' 
    },
    { 
      message: "Take it one day at a time", 
      color: '#9B59B6', 
      shadow: 'rgba(155, 89, 182, 0.4)' 
    },
    { 
      message: "You are stronger than you know", 
      color: '#F39C12', 
      shadow: 'rgba(243, 156, 18, 0.3)' 
    },
    { 
      message: "Recovery is a journey, not a destination", 
      color: '#1ABC9C', 
      shadow: 'rgba(155, 89, 182, 0.4)'  
    },
    { 
      message: "You deserve support and care", 
      color: '#E67E22', 
      shadow: 'rgba(230, 126, 34, 0.4)' 
    },
    { 
      message: "", 
      color: '#E67E22', 
      shadow: 'rgba(230, 126, 34, 0.4)' 
    }
  ];
  
  /* @HostListener('click')
  callme() {
    alert("you freaking call me ?")
  } */

  ngOnInit(): void {
    this.AuthService.getUsersList()
    /* let value = 100;
    let sum = 100 + value;
    console.log(sum); */
    /* DARK MODE
    this.configurationService.darkMode$.subscribe(cssValue => {
      this.cssWelcome = cssValue;
    }) */
  }

  ngAfterViewInit(): void {
    // Start the word animation cycle after a short delay
    setTimeout(() => {
      this.startWordAnimation();
    }, 2000); // Wait 2 seconds after page load
  }

  startWordAnimation(): void {
    this.showNextWord();
    
    // Continue the animation cycle
    this.wordAnimationInterval = setInterval(() => {
      this.showNextWord();
    }, 4000); // Change word every 4 seconds
  }


  showNextWord(): void {
    // Hide current word first
    this.showAnimatedWord = false;
    
    setTimeout(() => {
      if (this.currentWordType === 'challenge') {
        // Show challenge words for first few cycles
        const challenge = this.mentalHealthChallenges[this.currentWordIndex];
        this.currentWord = challenge.word;
        
        // Set dynamic styles
        this.setWordStyles(challenge.color, challenge.shadow);

        this.currentWordIndex++;
        
        // After showing all challenges, switch to support messages
        if (this.currentWordIndex >= this.mentalHealthChallenges.length) {
          this.currentWordType = 'support';
          this.currentWordIndex = 0;
        }

        

        // if(this.currentWordIndex > this.mentalHealthChallenges.length) {
        //   this.currentWordType = 'support';
        //   this.currentWordIndex = 0;
        // }

        console.log(this.currentWordIndex);
        console.log(this.currentWordType);
      
        
      } else {
        // Show supportive messages
        const message = this.supportiveMessages[this.currentWordIndex];
        this.currentWord = message.message;
        
        // Set dynamic styles
        this.setWordStyles(message.color, message.shadow);

        
        this.currentWordIndex++;
        console.log(this.currentWordIndex);
        
        // After showing all support messages, go back to challenges
        if (this.currentWordIndex >= this.supportiveMessages.length) {
          this.currentWordType = 'challenge';
          this.currentWordIndex = 0;
        }
      }
      
      // Show the new word
      this.showAnimatedWord = true;
      this.isInitialLoad = false;
    }, 600); // Wait for fade out animation to complete
  }

  onGetStarted(): void {
    // Handle the CTA button click
    console.log('User clicked Begin Your Healing Journey');
    
    // Options for what to do:
    // 1. Navigate to another page
    this.router.navigate(['/about']);
    
    // 2. Scroll to services section
    // document.querySelector('.services-section')?.scrollIntoView({ 
    //   behavior: 'smooth' 
    // });
    
    // 3. Open contact form modal
    // this.openContactModal();
  }

  setWordStyles(color: string, shadow: string): void {
    // Dynamically set CSS custom properties for the animated word
    document.documentElement.style.setProperty('--animated-word-color', color);
    document.documentElement.style.setProperty('--animated-word-shadow', shadow);
  }

  // ngAfterViewInit(): void {
  //   // Initialize parallax effect after view is ready
  //   setTimeout(() => {
  //     this.updateParallax();
  //   }, 100);
  // }

  // @HostListener('window:scroll', ['$event'])
  // onWindowScroll(): void {
  //   this.requestTick();
  // }

  // @HostListener('window:resize', ['$event'])
  // onWindowResize(): void {
  //   this.updateParallax();
  // }

  // private requestTick(): void {
  //   if (!this.ticking) {
  //     requestAnimationFrame(() => this.updateParallax());
  //     this.ticking = true;
  //   }
  // }

  // private updateParallax(): void {
  //   this.ticking = false;
    
  //   if (!this.scene1 || !this.scene2 || !this.scene3 || !this.scene4) {
  //     return;
  //   }

  //   const scrollTop = window.pageYOffset;
  //   const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  //   this.scrollProgress = scrollTop / documentHeight;
    
  //   const scene1El = this.scene1.nativeElement;
  //   const scene2El = this.scene2.nativeElement;
  //   const scene3El = this.scene3.nativeElement;
  //   const scene4El = this.scene4.nativeElement;
    
  //   const welcomeTextEl = this.welcomeText.nativeElement;
  //   const transitionTextEl = this.transitionText.nativeElement;
  //   const meadowTextEl = this.meadowText.nativeElement;
  //   const doorLightEl = this.doorLight.nativeElement;
    
  //   // Scene transitions based on scroll progress
  //   if (this.scrollProgress < 0.2) {
  //     // Scene 1: Dark room
  //     scene1El.style.opacity = '1';
  //     scene1El.style.transform = `scale(${1 + this.scrollProgress * 0.5})`;
  //     scene2El.style.opacity = '0';
  //     scene3El.style.opacity = '0';
  //     scene4El.style.opacity = '0';
      
  //     welcomeTextEl.style.opacity = Math.max(0, 1 - this.scrollProgress * 5);
  //     doorLightEl.style.opacity = Math.min(1, this.scrollProgress * 10);
      
  //   } else if (this.scrollProgress < 0.4) {
  //     // Scene 2: Transition
  //     const localProgress = (this.scrollProgress - 0.2) / 0.2;
  //     scene1El.style.opacity = Math.max(0, 1 - localProgress * 2);
  //     scene2El.style.opacity = '1';
  //     scene2El.style.transform = `translateZ(${localProgress * 200}px)`;
  //     scene3El.style.opacity = '0';
  //     scene4El.style.opacity = '0';
      
  //     transitionTextEl.style.opacity = Math.min(1, localProgress * 2);
  //     welcomeTextEl.style.opacity = '0';
      
  //   } else if (this.scrollProgress < 0.7) {
  //     // Scene 3: Meadow
  //     const localProgress = (this.scrollProgress - 0.4) / 0.3;
  //     scene1El.style.opacity = '0';
  //     scene2El.style.opacity = Math.max(0, 1 - localProgress);
  //     scene3El.style.opacity = '1';
  //     scene3El.style.transform = `scale(${0.8 + localProgress * 0.3})`;
  //     scene4El.style.opacity = '0';
      
  //     meadowTextEl.style.opacity = Math.min(1, localProgress * 1.5);
  //     transitionTextEl.style.opacity = Math.max(0, 1 - localProgress * 2);
      
  //   } else {
  //     // Scene 4: Services
  //     const localProgress = (this.scrollProgress - 0.7) / 0.3;
  //     scene1El.style.opacity = '0';
  //     scene2El.style.opacity = '0';
  //     scene3El.style.opacity = Math.max(0, 1 - localProgress);
  //     scene4El.style.opacity = '1';
  //     scene4El.style.transform = `translateY(${Math.max(0, (1 - localProgress) * 100)}px)`;
      
  //     meadowTextEl.style.opacity = Math.max(0, 1 - localProgress * 2);
  //   }
  // }



  // Add these methods to your home.component.ts

// Handle video loading success
onVideoLoaded(): void {
  console.log('Hero video loaded successfully');
  // Add class to hide fallback background
  const container = document.querySelector('.hero-image-container');
  if (container) {
    container.classList.add('video-loaded');
  }
}

// Handle video loading error
onVideoError(event: any): void {
  console.log('Hero video failed to load, using fallback background');
  event.target.style.display = 'none';
  // Ensure fallback background is visible
  const fallback = document.querySelector('.hero-fallback-bg');
  if (fallback) {
    (fallback as HTMLElement).style.display = 'block';
  }
}

  // Update flipped card ID to control which card is currently flipped
  onCardToggled(cardId: string) {
    this.flippedCardId = this.flippedCardId === cardId ? null : cardId;
    this.detailView = false;
  }

  // Set card details on "View Details" click
  displayCardDetails(cardId: string) {
    const card = this.cardContents.find(c => c.id === cardId);
    this.cardDetail = card ? card.details : '';
    this.detailView = true;
  }

  getData(): any[] {
    this.router.navigate(['/about-me'])
    return [1,2,3,4];
  }

  // Method to manually trigger word change (for testing)
  triggerWordChange(): void {
    this.showNextWord();
  }

  // Method to pause/resume animation
  toggleAnimation(): void {
    if (this.wordAnimationInterval) {
      clearInterval(this.wordAnimationInterval);
      this.wordAnimationInterval = null;
    } else {
      this.startWordAnimation();
    }
  }
}
