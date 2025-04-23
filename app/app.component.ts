import { AfterViewInit, Component, HostListener } from '@angular/core';
import * as AOS from 'aos';
import { RouterOutlet } from '@angular/router';
import { SkillsComponent } from './component/skills/skills.component';
import { AboutComponent } from './component/about/about.component';
import { ResumeComponent } from './component/resume/resume.component';
import { OServicesComponent } from './component/o-services/o-services.component';
import { ContactComponent } from './component/contact/contact.component';
import { FooterComponent } from './component/footer/footer.component';
import { HeroComponent } from './component/hero/hero.component';
import { NavbarComponent } from './component/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    SkillsComponent,
    AboutComponent,
    HeroComponent,
    ResumeComponent,
    OServicesComponent,
    ContactComponent,
    FooterComponent,
    NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements AfterViewInit {
  title = 'radhakrishna';
  isScrollTopVisible = false;

  ngAfterViewInit(): void {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false,
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.toggleScrollTop();
  }
  ngOnInit() {
    this.toggleScrollTop();
  }
  toggleScrollTop() {
    this.isScrollTopVisible = window.scrollY > 100;
  }

  scrollToTop(event: Event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
