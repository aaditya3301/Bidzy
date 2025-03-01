"use client";

import React from "react";
import { AuthGuard } from "@/components/AuthGuard";
import { SidebarDemo } from "@/components/sections/sidebarsection";
import { YourBidsContent } from "@/components/sections/YourBidsContent";

export default function YourBidsPage() {
  return (
    <AuthGuard>
      <SidebarDemo activeLink="Your Bids">
        <YourBidsContent />
      </SidebarDemo>
    </AuthGuard>
  );
}
