export interface LeadershipMember {
  id: string;
  category: "fic" | "secretary";
  badge: string;
  name: string;
  designation: string;
  quote: string;
  image: string;
}

export const facultyInCharge: LeadershipMember = {
  id: "fic",
  category: "fic",
  badge: "FACULTY-IN-CHARGE",
  name: "Dr. Sudipta Chakraborty",
  designation: "Faculty-in-Charge, Obiettivo",
  quote: "Photography is not just about capturing light; it's about preserving a moment that is gone forever. At Obiettivo, we nurture this creative spirit to tell stories that transcend time.",
  image: "/images/team/leadership/Dr. Sudipta Chakraborty.webp",
};

export const clubSecretary: LeadershipMember = {
  id: "secretary",
  category: "secretary",
  badge: "CLUB LEADERSHIP",
  name: "Dhritinabh Sarmah",
  designation: "Club Secretary",
  quote: "Leading a club of talented creators has been an incredible journey. Together, we paint the canvas of NIT Silchar with light, shadow, and countless stories. Our club is built on passion, skill-sharing, and creative collaboration.",
  image: "/images/team/leadership/Dhritinabh Sarmah.webp",
};
