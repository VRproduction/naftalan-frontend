export interface HeroSection {
  title: string;
  description: string;
}

export interface LocationSection {
  title: string;
  description: string;
  map_iframe: string;
}

export interface TransportSection{
  title: string;
  description: string;
  options: [
    {
      title: string;
      description: string;
      icon: string;
    }
  ]
}

export interface VisaSection {
  title: string;
  description: string;
  content: string;
}
  