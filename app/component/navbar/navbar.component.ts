import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('slideToggle', [
      state(
        'closed',
        style({
          height: '0',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          height: '*',
          opacity: 1,
        })
      ),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class NavbarComponent {
  iconToggle: boolean = false;
  isIconShow: boolean = true;
  isMobileView: boolean = false;
  currentSection: string = '';
  private readonly offset = 80; // Navbar height or desired offset

  private sections: string[] = [
    'home',
    'about',
    'skills',
    'resume',
    'services',
    'contact',
  ];

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  @ViewChild('navbar') navbarRef!: ElementRef;

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
    this.setCurrentSectionFromHash();
    this.onWindowScroll(); // Detect section on initial load

    window.addEventListener('hashchange', () =>
      this.setCurrentSectionFromHash()
    );
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 1200;
  }

  toggleNavMobile(): void {
    this.iconToggle = !this.iconToggle;
    this.isIconShow = !this.isIconShow;
  }

  @HostListener('window:scroll', [])
  handleScroll() {
    this.onWindowScroll();
  }
  onWindowScroll() {
    const navbar = this.navbarRef?.nativeElement;
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    for (const section of this.sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= this.offset && rect.bottom >= this.offset) {
          if (this.currentSection !== section) {
            this.currentSection = section;
            this.cdr.detectChanges(); // Force Angular to check view
          }
          return;
        }
      }
    }
    this.currentSection = 'home';
    this.cdr.detectChanges();
  }

  setCurrentSectionFromHash(): void {
    const hash = window.location.hash;
    const section = hash ? hash.replace('#', '') : 'home';
    this.currentSection = this.sections.includes(section) ? section : 'home';
  }

  onNavItemClick() {
    this.iconToggle = false;
    this.isIconShow = true;
  }
}
