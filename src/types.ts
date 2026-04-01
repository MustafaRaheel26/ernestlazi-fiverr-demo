export type Language = 'en' | 'es';

export interface MenuItem {
  name: string;
  description: string;
  price: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface TranslationContent {
  nav: {
    home: string;
    menu: string;
    gallery: string;
    about: string;
    contact: string;
    book: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaBook: string;
    ctaMenu: string;
  };
  about: {
    title: string;
    subtitle: string;
    text1: string;
    text2: string;
  };
  menu: {
    title: string;
    categories: {
      starters: string;
      pasta: string;
      pizza: string;
      desserts: string;
      drinks: string;
    };
  };
  reservation: {
    title: string;
    subtitle: string;
    name: string;
    guests: string;
    date: string;
    time: string;
    submit: string;
  };
  location: {
    title: string;
    hours: string;
    monSun: string;
  };
  instagram: {
    title: string;
    follow: string;
  };
  contact: {
    title: string;
    name: string;
    email: string;
    message: string;
    send: string;
  };
  footer: {
    desc: string;
    quickLinks: string;
    contact: string;
  };
}
