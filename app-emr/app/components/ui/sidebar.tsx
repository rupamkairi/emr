import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Link } from "@remix-run/react";
import {
  BarChartIcon,
  FileTextIcon,
  HomeIcon,
  LayersIcon,
  MenuIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import * as React from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed md:relative top-0 left-0 p-4 md:p-0 z-20">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
      <aside className={cn("hidden md:flex", className)}>
        <SidebarContent />
      </aside>
    </div>
  );
}

function SidebarContent() {
  return (
    <div className="flex w-full p-2 h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link to="/" className="flex items-center space-x-2">
          <LayersIcon className="h-6 w-6" />
          <span className="font-bold">My App</span>
        </Link>
      </div>
      <ScrollArea className="flex-1">
        <nav className="flex flex-col gap-2 p-4">
          <Link to="/">
            <Button variant="ghost" className="w-full justify-start">
              <HomeIcon className="mr-2 h-4 w-4" />
              Home
            </Button>
          </Link>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="analytics">
              <AccordionTrigger className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  <BarChartIcon className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-6">
                  <Link to="/analytics/overview">
                    <Button variant="ghost" className="w-full justify-start">
                      Overview
                    </Button>
                  </Link>
                  <Link to="/analytics/reports">
                    <Button variant="ghost" className="w-full justify-start">
                      Reports
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="content">
              <AccordionTrigger className="py-2">
                <Button variant="ghost" className="w-full justify-start">
                  <FileTextIcon className="mr-2 h-4 w-4" />
                  Content
                </Button>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2 pl-6">
                  <Link to="/content/pages">
                    <Button variant="ghost" className="w-full justify-start">
                      Pages
                    </Button>
                  </Link>
                  <Link to="/content/posts">
                    <Button variant="ghost" className="w-full justify-start">
                      Posts
                    </Button>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link to="/users">
            <Button variant="ghost" className="w-full justify-start">
              <UserIcon className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className="w-full justify-start">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </ScrollArea>
    </div>
  );
}
