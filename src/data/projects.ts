export interface Project {
  slug: string;
  title: string;
  type: string;
  year: string;
  client: string;
  tools: string;
  role: string;
  desc: string;
  url?: string;
}

export const projects: Project[] = [
  { slug: 'aquaform', title: 'Aquaform', type: 'Brand microsite', year: '2002', client: 'Aquaform Mineral Co.', tools: 'Flash MX, AS1', role: 'Design + build', desc: 'A liquid, full-screen microsite where every navigation click sends ripples through the interface. Built around a single looping water sequence and a custom sound engine.' },
  { slug: 'substation-9', title: 'Substation 9', type: 'Band website', year: '2001', client: 'Substation 9', tools: 'Flash 5, Sound Forge', role: 'Design + motion', desc: 'Tour dates, a streaming MP3 player and a hidden remix toy. The whole site is laid out as a mixing desk; faders double as navigation.' },
  { slug: 'glasshouse', title: 'Glasshouse', type: 'Architecture portfolio', year: '2002', client: 'Glasshouse Architects', tools: 'Flash MX, 3D Studio', role: 'Art direction', desc: 'Buildings rendered as rotating wireframes that resolve into photography on hover. Designed to load fast over 56k without losing its calm.' },
  { slug: 'coldfront', title: 'Coldfront', type: 'Kiosk interface', year: '2001', client: 'Municipal Transit', tools: 'Director 8, Flash 5', role: 'Interface design', desc: 'Touchscreen weather and departures kiosk for train platforms. Large targets, high contrast and an idle attract loop that runs for 18 hours a day.' },
  { slug: 'vector-saint', title: 'Vector/Saint', type: 'Motion ident series', year: '2000', client: 'Channel 7 Late', tools: 'Flash 4, After Effects', role: 'Motion design', desc: 'Twelve five-second idents for a late-night TV block, drawn entirely in vector and exported frame-by-frame for broadcast.' },
  { slug: 'portal-04', title: 'Portal 04', type: 'Game launcher UI', year: '2002', client: 'Orbit Interactive', tools: 'Flash MX, C++ bridge', role: 'UI design', desc: 'Front-end menus and patcher for a PC shooter. Chrome panels, animated server lists and a loading bar people actually complimented.' },
];

export const pad = (n: number) => String(n).padStart(2, '0');
