import { TranslationContent } from './types';

export const translations: Record<'en' | 'es', TranslationContent> = {
  en: {
    nav: {
      home: 'Home',
      menu: 'Menu',
      gallery: 'Gallery',
      about: 'About',
      contact: 'Contact',
      book: 'Book a Table',
    },
    hero: {
      title: 'Authentic Italian Dining in Estepona',
      subtitle: 'Experience warmth, tradition, and modern Italian flavors',
      ctaBook: 'Book a Table',
      ctaMenu: 'View Menu',
    },
    about: {
      title: 'Our Story',
      subtitle: 'Authentic Italian soul in the heart of Estepona',
      text1: 'Lorenzo’s Trattoria Moderna was born from a passion for the timeless traditions of Italian cuisine, reimagined for the modern palate. Every dish tells a story of heritage, sourced from the finest ingredients and prepared with love.',
      text2: 'Nestled in the beautiful coastal town of Estepona, we offer a warm, inviting atmosphere where friends and family gather to share more than just a meal—they share a piece of Italy.',
    },
    menu: {
      title: 'The Menu',
      categories: {
        starters: 'Starters',
        pasta: 'Pasta',
        pizza: 'Pizza',
        desserts: 'Desserts',
        drinks: 'Drinks',
      },
    },
    reservation: {
      title: 'Reserve Your Table',
      subtitle: 'Join us for an unforgettable dining experience.',
      name: 'Full Name',
      guests: 'Number of Guests',
      date: 'Date',
      time: 'Time',
      submit: 'Confirm Reservation',
    },
    location: {
      title: 'Find Us',
      hours: 'Opening Hours',
      monSun: 'Mon – Sun: 12:00 – 23:00',
    },
    instagram: {
      title: 'Follow Our Journey',
      follow: 'Follow Us on Instagram',
    },
    contact: {
      title: 'Get in Touch',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send Message',
    },
    footer: {
      desc: 'Authentic Italian Trattoria in Estepona. Tradition meets modern elegance.',
      quickLinks: 'Quick Links',
      contact: 'Contact Info',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      menu: 'Menú',
      gallery: 'Galería',
      about: 'Nosotros',
      contact: 'Contacto',
      book: 'Reservar Mesa',
    },
    hero: {
      title: 'Auténtica Cocina Italiana en Estepona',
      subtitle: 'Vive la calidez, la tradición y los sabores italianos modernos',
      ctaBook: 'Reservar Mesa',
      ctaMenu: 'Ver Menú',
    },
    about: {
      title: 'Nuestra Historia',
      subtitle: 'Alma italiana auténtica en el corazón de Estepona',
      text1: 'Lorenzo’s Trattoria Moderna nació de la pasión por las tradiciones atemporales de la cocina italiana, reinventadas para el paladar moderno. Cada plato cuenta una historia de herencia, elaborado con los mejores ingredientes y preparado con amor.',
      text2: 'Situados en la hermosa ciudad costera de Estepona, ofrecemos un ambiente cálido y acogedor donde amigos y familiares se reúnen para compartir más que una comida: comparten un pedazo de Italia.',
    },
    menu: {
      title: 'El Menú',
      categories: {
        starters: 'Entrantes',
        pasta: 'Pasta',
        pizza: 'Pizza',
        desserts: 'Postres',
        drinks: 'Bebidas',
      },
    },
    reservation: {
      title: 'Reserva tu Mesa',
      subtitle: 'Únete a nosotros para una experiencia culinaria inolvidable.',
      name: 'Nombre Completo',
      guests: 'Número de Personas',
      date: 'Fecha',
      time: 'Hora',
      submit: 'Confirmar Reserva',
    },
    location: {
      title: 'Encuéntranos',
      hours: 'Horario de Apertura',
      monSun: 'Lun – Dom: 12:00 – 23:00',
    },
    instagram: {
      title: 'Sigue Nuestro Viaje',
      follow: 'Síguenos en Instagram',
    },
    contact: {
      title: 'Contacto',
      name: 'Nombre',
      email: 'Correo Electrónico',
      message: 'Mensaje',
      send: 'Enviar Mensaje',
    },
    footer: {
      desc: 'Auténtica Trattoria Italiana en Estepona. La tradición se une a la elegancia moderna.',
      quickLinks: 'Enlaces Rápidos',
      contact: 'Información de Contacto',
    },
  },
};

export const menuData: Record<'en' | 'es', Record<string, any[]>> = {
  en: {
    starters: [
      { name: 'Bruschetta Classica', description: 'Toasted sourdough, vine-ripened tomatoes, garlic, basil, EVOO.', price: '€12' },
      { name: 'Burrata Pugliese', description: 'Creamy burrata, heirloom tomatoes, pesto drops, balsamic glaze.', price: '€16' },
      { name: 'Calamari Fritti', description: 'Crispy squid, lemon aioli, fresh parsley.', price: '€14' },
    ],
    pasta: [
      { name: 'Pappardelle al Ragu', description: 'Hand-cut pasta, 8-hour slow-cooked beef ragu, parmigiano.', price: '€22' },
      { name: 'Spaghetti alla Carbonara', description: 'Guanciale, pecorino romano, egg yolk, black pepper.', price: '€19' },
      { name: 'Truffle Tagliolini', description: 'Fresh black truffle, butter emulsion, aged parmesan.', price: '€28' },
    ],
    pizza: [
      { name: 'Margherita D.O.P', description: 'San Marzano tomato, buffalo mozzarella, fresh basil.', price: '€15' },
      { name: 'Diavola', description: 'Tomato, mozzarella, spicy salami, nduja, chili.', price: '€17' },
      { name: 'Tartufata', description: 'White base, mozzarella, porcini mushrooms, truffle oil.', price: '€21' },
    ],
    desserts: [
      { name: 'Tiramisu Classico', description: 'Mascarpone, espresso-soaked ladyfingers, cocoa.', price: '€9' },
      { name: 'Panna Cotta', description: 'Vanilla bean panna cotta, wild berry coulis.', price: '€8' },
    ],
    drinks: [
      { name: 'Negroni Sbagliato', description: 'Campari, sweet vermouth, prosecco.', price: '€12' },
      { name: 'Aperol Spritz', description: 'Aperol, prosecco, soda, orange.', price: '€10' },
    ],
  },
  es: {
    starters: [
      { name: 'Bruschetta Classica', description: 'Pan de masa madre tostado, tomates de viña, ajo, albahaca, AOVE.', price: '€12' },
      { name: 'Burrata Pugliese', description: 'Burrata cremosa, tomates reliquia, gotas de pesto, glaseado balsámico.', price: '€16' },
      { name: 'Calamari Fritti', description: 'Calamares crujientes, alioli de limón, perejil fresco.', price: '€14' },
    ],
    pasta: [
      { name: 'Pappardelle al Ragu', description: 'Pasta cortada a mano, ragú de ternera cocinado 8 horas, parmigiano.', price: '€22' },
      { name: 'Spaghetti alla Carbonara', description: 'Guanciale, pecorino romano, yema de huevo, pimienta negra.', price: '€19' },
      { name: 'Tagliolini de Trufa', description: 'Trufa negra fresca, emulsión de mantequilla, parmesano envejecido.', price: '€28' },
    ],
    pizza: [
      { name: 'Margherita D.O.P', description: 'Tomate San Marzano, mozzarella de búfala, albahaca fresca.', price: '€15' },
      { name: 'Diavola', description: 'Tomate, mozzarella, salami picante, nduja, chile.', price: '€17' },
      { name: 'Tartufata', description: 'Base blanca, mozzarella, boletus, aceite de trufa.', price: '€21' },
    ],
    desserts: [
      { name: 'Tiramisú Clásico', description: 'Mascarpone, bizcochos bañados en espresso, cacao.', price: '€9' },
      { name: 'Panna Cotta', description: 'Panna cotta de vainilla, coulis de frutos silvestres.', price: '€8' },
    ],
    drinks: [
      { name: 'Negroni Sbagliato', description: 'Campari, vermut dulce, prosecco.', price: '€12' },
      { name: 'Aperol Spritz', description: 'Aperol, prosecco, soda, naranja.', price: '€10' },
    ],
  },
};
