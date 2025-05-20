import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function Search() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">Search</Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="fixed top-0 right-0 h-full w-96 bg-transparent border border-white/20 shadow-lg text-white z-50"
      >
        <SheetHeader>
          <SheetTitle>Search Plane</SheetTitle>
          <SheetDescription>Search Plane</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4"></div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
