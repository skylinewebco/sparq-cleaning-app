import {
  Home,
  Sparkles,
  KeyRound,
  Building2,
  Sofa,
  Wind,
  Utensils,
  ShowerHead,
  Truck,
  Boxes,
  PaintRoller,
  Flame,
  Refrigerator,
  Shirt,
  Fence,
  WashingMachine,
  type LucideProps,
} from "lucide-react";

const map = {
  Home,
  Sparkles,
  KeyRound,
  Building2,
  Sofa,
  Wind,
  Utensils,
  ShowerHead,
  Truck,
  Boxes,
  PaintRoller,
  Flame,
  Refrigerator,
  Shirt,
  Fence,
  WashingMachine,
} as const;

export type IconName = keyof typeof map;

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = map[name as IconName] ?? Sparkles;
  return <Cmp {...props} />;
}
