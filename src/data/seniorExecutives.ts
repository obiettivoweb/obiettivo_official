export interface SeniorExecutive {
  id: string;
  name: string;
  role: string;        // Designation (e.g. "Senior Executive", "Technical Lead")
  department?: string; // Optional department (e.g. "Photography", "Design")
  email?: string;      // Optional email address
  image: string;       // Path to image file in public folder or URL
}

export const seniorExecutives: SeniorExecutive[] = [
  {
    id: "adhil",
    name: "Adhil",
    role: "Videographer",
    image: "/images/team/senior/Adhil.webp",
  },
  {
    id: "amulya-gunturu",
    name: "Amulya Gunturu",
    role: "Senior Executive",
    image: "/images/team/senior/AMULYA GUNTURU.webp",
  },
  {
    id: "geetertha-kumar-nath",
    name: "Geetertha Kumar Nath",
    role: "Photographer",
    image: "/images/team/senior/GEETERTHA KUMAR NATH.webp",
  },
  {
    id: "shruti-kirti",
    name: "Shruti Kirti",
    role: "Photographer & Designer",
    image: "/images/team/senior/Shruti.webp",
  },
  {
    id: "abhilash",
    name: "Abhilash",
    role: "Photographer & Videographer",
    image: "/images/team/senior/Abhilash.webp",
  },
  {
    id: "sunil",
    name: "Sunil",
    role: "Photographer",
    image: "/images/team/senior/Sunil.webp",
  },
  {
    id: "hrishikesh",
    name: "Hrishikesh",
    role: "Videography & Content editing",
    image: "/images/team/senior/Hrishikesh.webp",
  },

  {
    id: "darshana",
    name: "Darshana",
    role: "Photographer",
    image: "/images/team/senior/Darshana.webp",
  },
  {
    id: "harshita",
    name: "Harshita",
    role: "Photographer & Designer",
    image: "/images/team/senior/Harshita.webp",
  },
  {
    id: "tarpan-saikia",
    name: "Tarpan Saikia",
    role: "Photography & Development",
    image: "/images/team/senior/TARPAN SAIKIA.webp",
  },
  {
    id: "topon-konwar",
    name: "Topon Konwar",
    role: "Photography & Videography",
    image: "/images/team/senior/Topon.webp",
  },
  {
    id: "tushar",
    name: "Tushar",
    role: "Filmmaking & Content Lead",
    image: "/images/team/senior/Tushar.webp",
  },
  {
    id: "dhrup",
    name: "Dhrup",
    role: "Videographer & Creative editor",
    image: "/images/team/senior/Dhrup.webp",
  },
  {
    id: "unnati",
    name: "Unnati",
    role: "Photographer",
    image: "/images/team/senior/Unnati.webp",
  },
  {
    id: "wandeimaia-passah",
    name: "Wandeimaia P Passah",
    role: "Photographer",
    image: "/images/team/senior/WANDEIMAIA P PASSAH.webp",
  },
  {
    id: "yash-gujrani",
    name: "Yash Gujrani",
    role: "Photographer",
    image: "/images/team/senior/Yash Gujrani.webp",
  },
];
