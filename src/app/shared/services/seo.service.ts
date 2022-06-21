import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(private title: Title, private meta: Meta, @Inject(DOCUMENT) private readonly document: Document) {}

  public setLanguage(language: string) {
    this.document.documentElement.lang = language;
  }

  public setTitle(title: string) {
    this.title.setTitle(title);
    this.meta.updateTag({ itemprop: 'name', content: title }, 'itemprop="name"');
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ property: 'og:title', content: title });
  }

  public setDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ itemprop: 'description', content: description }, 'itemprop="description"');
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ property: 'og:description', content: description });
  }

  public setUrl(path: string) {
    this.meta.updateTag({ property: 'og:url', content: environment.baseUrl + path });
  }

  public setImage(url: string) {
    this.meta.updateTag({ itemprop: 'image', content: url }, 'itemprop="image"');
    this.meta.updateTag({ name: 'twitter:image', content: url });
    this.meta.updateTag({ name: 'twitter:image:src', content: url });
    this.meta.updateTag({ property: 'og:image', content: url });
    this.meta.updateTag({ property: 'og:image:secure_url', content: url });
  }
}
