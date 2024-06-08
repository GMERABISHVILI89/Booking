import { Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILanguage } from '../Models/ILanguage';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  languages: ILanguage[] = [
    { id: 1, name: 'English', shortName: 'ENG', code: 'en'},
    { id: 2, name: 'Georgian', shortName: 'GEO', code: 'ge'}
  ]
  constructor(public translate: TranslateService) {
      this.changeLanguage(this.getCurrentLanguage())
    }
  selectedLanguage = signal<ILanguage>(this.getCurrentLanguage());

  changeLanguage(language: ILanguage) {
    localStorage.setItem('language', JSON.stringify(language));
    this.selectedLanguage.set(language);
    this.translate.use(language.code);
  }

  getCurrentLanguage() {
    var lang = localStorage.getItem('language');
    if (lang) {
      return JSON.parse(lang);
    } else {
      return this.languages[0];
    }
  }
}
