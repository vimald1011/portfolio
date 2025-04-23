import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-skills',
  imports: [],
  standalone: true,
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent implements AfterViewInit {
  @Input() label: string = '';
  @Input() value: number = 0;

  @ViewChild('skillContainer') skillContainer!: ElementRef;

  animatedValue: number = 0;

  ngAfterViewInit() {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              this.animateProgress();
              observer.unobserve(this.skillContainer.nativeElement); // trigger once
            }
          });
        },
        { threshold: 0.8 }
      );

      observer.observe(this.skillContainer.nativeElement);
    } else {
      // Fallback if IntersectionObserver not supported
      this.animateProgress(); // just animate immediately
    }
  }

  animateProgress() {
    let current = 0;
    const interval = setInterval(() => {
      if (current >= this.value) {
        clearInterval(interval);
      } else {
        current++;
        this.animatedValue = current;
      }
    }, 10); // controls animation speed
  }

  ngOnInit() {
    setTimeout(() => {
      this.animatedValue = this.value;
    }, 30); // triggers animation after component loads
  }
}
