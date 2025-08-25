import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';


@Component({
  selector: 'app-web-parallax',
  templateUrl: './web-parallax.component.html',
  styleUrls: ['./web-parallax.component.scss']
})
export class WebParallaxComponent implements OnInit, OnDestroy {

  @Input() title: string = 'Nurture Your Mental Wellness';
  @Input() subtitle: string = 'Discover the path to inner peace and mental clarity';
  @Input() ctaText: string = 'Begin Your Journey';
  @Input() height: string = '100vh';
  
  @Output() ctaClick = new EventEmitter<void>();
  
  @ViewChild('parallaxContainer', { static: false }) parallaxContainer?: ElementRef;
  @ViewChild('skyLayer', { static: false }) skyLayer?: ElementRef;
  @ViewChild('mountainBack', { static: false }) mountainBack?: ElementRef;
  @ViewChild('mountainMid', { static: false }) mountainMid?: ElementRef;
  @ViewChild('brainLayer', { static: false }) brainLayer?: ElementRef;
  @ViewChild('foliageLayer', { static: false }) foliageLayer?: ElementRef;

  private animationFrameId: number = 0;
  private isScrolling: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // Initialize parallax effect after view init
    setTimeout(() => {
      this.updateParallax();
    }, 100);
  }







  
  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    if (!this.isScrolling) {
      this.isScrolling = true;
      this.animationFrameId = requestAnimationFrame(() => {
        this.updateParallax();
        this.isScrolling = false;
      });
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(): void {
    this.updateParallax();
  }

  private updateParallax(): void {
    if (!this.parallaxContainer?.nativeElement) return;

    const scrollTop = window.pageYOffset;
    const containerRect = this.parallaxContainer.nativeElement.getBoundingClientRect();
    const containerHeight = this.parallaxContainer.nativeElement.offsetHeight;
    
    // Only apply parallax when container is in viewport
    if (containerRect.bottom < 0 || containerRect.top > window.innerHeight) {
      return;
    }

    // Calculate parallax offset based on scroll position
    const parallaxOffset = scrollTop * 0.5;

    // Apply different speeds to different layers
    this.applyParallaxTransform(this.skyLayer, scrollTop * 0.1); // Slowest - sky and sun
    this.applyParallaxTransform(this.mountainBack, scrollTop * 0.3); // Slow - back mountains
    this.applyParallaxTransform(this.mountainMid, scrollTop * 0.5); // Medium - mid mountains
    this.applyParallaxTransform(this.brainLayer, scrollTop * 0.7); // Fast - brain
    this.applyParallaxTransform(this.foliageLayer, scrollTop * 1.0); // Fastest - foreground plants

    // Add subtle rotation to brain based on scroll
    if (this.brainLayer?.nativeElement) {
      const brainContainer = this.brainLayer.nativeElement.querySelector('.brain-container');
      if (brainContainer) {
        const rotationAngle = (scrollTop * 0.05) % 360;
        (brainContainer as HTMLElement).style.transform += ` rotate(${rotationAngle}deg)`;
      }
    }
  }

  private applyParallaxTransform(elementRef: ElementRef | undefined, offset: number): void {
    if (elementRef?.nativeElement) {
      elementRef.nativeElement.style.transform = `translateY(${offset}px)`;
    }
  }

  onCtaClick(): void {
    this.ctaClick.emit();
  }

  // Public method to trigger animations
  triggerBrainAnimation(): void {
    if (this.brainLayer?.nativeElement) {
      const brainSpirals = this.brainLayer.nativeElement.querySelectorAll('.brain-spiral');
      brainSpirals.forEach((spiral: HTMLElement, index: number) => {
        spiral.style.animation = `brainPulse 2s ease-in-out ${index * 0.2}s infinite`;
      });
    }
  }

  // Public method to get parallax progress (0-1)
  getParallaxProgress(): number {
    if (!this.parallaxContainer?.nativeElement) return 0;
    
    const containerRect = this.parallaxContainer.nativeElement.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, 
      (window.innerHeight - containerRect.top) / (window.innerHeight + containerRect.height)
    ));
    
    return progress;
  }
}