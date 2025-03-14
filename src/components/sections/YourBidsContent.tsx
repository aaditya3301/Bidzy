"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  IconSearch,
  IconPlus,
  IconChevronRight,
  IconFilter,
  IconCalendar,
  IconTrash,
  IconEdit,
  IconExclamationCircle,
  IconCurrencyDollar, // Add this line
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";

const BottomGradient = () => {
  return (
    <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-30" />
  );
};

type Bid = {
  id: string;
  title: string;
  maxBudget: number;
  requiredDeliveryDate: string;
  status: "published" | "draft" | "active" | "completed" | "expired";
  description: string;
  itemCategory: string;
  responses: number;
  createdAt: string;
};

type FilterStatus =
  | "all"
  | "published"
  | "draft"
  | "active"
  | "completed"
  | "expired";

// Add this sample data after the Bid type definition and before the YourBidsContent component
const sampleBids: Bid[] = [
  // Published Bids
  {
    id: "pub_1",
    title: "Gaming PC Transport to New York",
    maxBudget: 500,
    requiredDeliveryDate: "2024-04-01",
    status: "published",
    description: "Need to transport a gaming PC setup. Fragile items require careful handling.",
    itemCategory: "electronics",
    responses: 0,
    createdAt: "2024-03-01T10:00:00Z"
  },
  {
    id: "pub_2",
    title: "Furniture Delivery to Boston",
    maxBudget: 800,
    requiredDeliveryDate: "2024-04-05",
    status: "published",
    description: "3-piece sofa set needs transportation. Items are new and boxed.",
    itemCategory: "furniture",
    responses: 0,
    createdAt: "2024-03-02T15:30:00Z"
  },
  {
    id: "pub_3",
    title: "Art Pieces to Gallery",
    maxBudget: 1200,
    requiredDeliveryDate: "2024-04-10",
    status: "published",
    description: "5 framed paintings need secure transport to art gallery.",
    itemCategory: "art",
    responses: 0,
    createdAt: "2024-03-03T09:15:00Z"
  },

  // Draft Bids
  {
    id: "draft_1",
    title: "Office Equipment Relocation",
    maxBudget: 1500,
    requiredDeliveryDate: "2024-04-15",
    status: "draft",
    description: "Complete office setup including computers and furniture.",
    itemCategory: "office",
    responses: 0,
    createdAt: "2024-03-01T11:20:00Z"
  },
  {
    id: "draft_2",
    title: "Musical Instruments Transport",
    maxBudget: 600,
    requiredDeliveryDate: "2024-04-20",
    status: "draft",
    description: "Piano and guitar need careful transportation.",
    itemCategory: "music",
    responses: 0,
    createdAt: "2024-03-02T14:45:00Z"
  },
  {
    id: "draft_3",
    title: "Gym Equipment Moving",
    maxBudget: 900,
    requiredDeliveryDate: "2024-04-25",
    status: "draft",
    description: "Heavy gym equipment including treadmill and weights.",
    itemCategory: "fitness",
    responses: 0,
    createdAt: "2024-03-03T16:30:00Z"
  },

  // Active Bids
  {
    id: "active_1",
    title: "Restaurant Equipment Transport",
    maxBudget: 2000,
    requiredDeliveryDate: "2024-04-08",
    status: "active",
    description: "Commercial kitchen equipment needs moving.",
    itemCategory: "commercial",
    responses: 3,
    createdAt: "2024-02-28T08:00:00Z"
  },
  {
    id: "active_2",
    title: "Antique Furniture Delivery",
    maxBudget: 1800,
    requiredDeliveryDate: "2024-04-12",
    status: "active",
    description: "Valuable antique furniture requires expert handling.",
    itemCategory: "antiques",
    responses: 5,
    createdAt: "2024-02-29T13:20:00Z"
  },
  {
    id: "active_3",
    title: "Medical Equipment Relocation",
    maxBudget: 2500,
    requiredDeliveryDate: "2024-04-18",
    status: "active",
    description: "Sensitive medical equipment needs specialized transport.",
    itemCategory: "medical",
    responses: 4,
    createdAt: "2024-03-01T09:45:00Z"
  },

  // Completed Bids
  {
    id: "complete_1",
    title: "Home Moving Service",
    maxBudget: 3000,
    requiredDeliveryDate: "2024-02-15",
    status: "completed",
    description: "Full house move completed successfully.",
    itemCategory: "residential",
    responses: 8,
    createdAt: "2024-02-01T10:00:00Z"
  },
  {
    id: "complete_2",
    title: "Vehicle Transport",
    maxBudget: 1500,
    requiredDeliveryDate: "2024-02-20",
    status: "completed",
    description: "Classic car transported with care.",
    itemCategory: "automotive",
    responses: 6,
    createdAt: "2024-02-05T11:30:00Z"
  },
  {
    id: "complete_3",
    title: "Book Collection Moving",
    maxBudget: 800,
    requiredDeliveryDate: "2024-02-25",
    status: "completed",
    description: "Large book collection moved to new library.",
    itemCategory: "books",
    responses: 4,
    createdAt: "2024-02-10T14:15:00Z"
  },
];

export function YourBidsContent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<FilterStatus>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "budget" | "deadline">(
    "recent"
  );

  const [bids, setBids] = useState<Bid[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modify the useEffect hook in YourBidsContent to use the sample data
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setBids(sampleBids);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Delete bid function
  const handleDeleteBid = async (id: string) => {
    if (!confirm("Are you sure you want to delete this bid?")) return;

    try {
      const response = await fetch(`/api/bids/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete bid");
      }

      // Remove the deleted bid from the state
      setBids(bids.filter((bid) => bid.id !== id));
    } catch (err) {
      console.error("Error deleting bid:", err);
      alert("Failed to delete bid. Please try again.");
    }
  };

  // Filter function based on active tab and search query
  const filteredBids = bids
    ? bids.filter((bid) => {
        // First filter by status tab
        const statusFilter = activeTab === "all" || bid.status === activeTab;

        // Then filter by search query (case insensitive)
        const matchesSearch =
          searchQuery === "" ||
          bid.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bid.description.toLowerCase().includes(searchQuery.toLowerCase());

        return statusFilter && matchesSearch;
      })
    : [];

  // Sort the filtered bids
  const sortedBids = [...filteredBids].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "budget") {
      return b.maxBudget - a.maxBudget;
    } else {
      // deadline
      return (
        new Date(a.requiredDeliveryDate).getTime() -
        new Date(b.requiredDeliveryDate).getTime()
      );
    }
  });

  // Helper function for status badge styling
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "published":
        return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "draft":
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
      case "active":
        return "bg-green-500/10 text-green-400 border-green-500/20";
      case "completed":
        return "bg-purple-500/10 text-purple-400 border-purple-500/20";
      case "expired":
        return "bg-red-500/10 text-red-400 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-gradient-to-b from-zinc-800 to-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Your Shipping Requests
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Manage your shipping requests and track bids from carriers
            </p>
          </div>

          <Button
            onClick={() => router.push("/create-bid")}
            className="relative inline-flex items-center gap-2 rounded-lg border border-neutral-700/50 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
          >
            <IconPlus size={18} />
            <span>Create Request</span>
            <BottomGradient />
          </Button>
        </div>

        {/* Filters Section */}
        <div className="flex flex-col md:flex-row justify-between gap-4 pb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "all"
                  ? "bg-zinc-700/80 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab("published")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "published"
                  ? "bg-zinc-700/80 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setActiveTab("draft")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "draft"
                  ? "bg-zinc-700/80 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Drafts
            </button>
            <button
              onClick={() => setActiveTab("active")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "active"
                  ? "bg-zinc-700/80 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeTab === "completed"
                  ? "bg-zinc-700/80 text-white"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
              }`}
            >
              Completed
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <IconSearch
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500"
              />
              <Input
                type="text"
                placeholder="Search requests..."
                className="pl-10 pr-4 py-2 bg-zinc-800 border-zinc-700 text-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="relative inline-block text-left">
              <select
                className="bg-zinc-800 border border-zinc-700 text-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-4 py-2 appearance-none pr-8"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="recent">Most Recent</option>
                <option value="budget">Highest Budget</option>
                <option value="deadline">Earliest Deadline</option>
              </select>
              <IconFilter
                size={18}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center">
            <IconExclamationCircle
              size={40}
              className="mx-auto text-red-400 mb-2"
            />
            <h3 className="text-xl font-semibold text-white mb-1">
              Failed to Load Data
            </h3>
            <p className="text-zinc-400">{error}</p>
            <Button
              className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-white"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        ) : (
          <>
            {sortedBids.length === 0 ? (
              <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-lg p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-700/50 flex items-center justify-center">
                  <IconExclamationCircle size={32} className="text-zinc-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No shipping requests found
                </h3>
                <p className="text-zinc-400 max-w-md mx-auto mb-6">
                  {activeTab !== "all"
                    ? `You don't have any ${activeTab} shipping requests yet.`
                    : searchQuery
                    ? "No results match your search query."
                    : "You haven't created any shipping requests yet."}
                </p>
                <Button
                  onClick={() => router.push("/create-bid")}
                  className="relative inline-flex items-center gap-2 rounded-lg border border-neutral-700/50 bg-neutral-800 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-700 transition-colors"
                >
                  <IconPlus size={18} />
                  <span>Create Your First Request</span>
                  <BottomGradient />
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {sortedBids.map((bid) => (
                  <div
                    key={bid.id}
                    className="bg-zinc-800/40 border border-zinc-700/50 rounded-lg p-4 hover:bg-zinc-800/60 transition-colors"
                  >
                    <div className="flex items-start justify-between flex-wrap gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {bid.title}
                          </h3>
                          <Badge
                            className={`${getStatusBadgeClass(
                              bid.status
                            )} capitalize`}
                          >
                            {bid.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400 line-clamp-2">
                          {bid.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                          <div className="flex items-center text-zinc-400">
                            <IconCurrencyDollar
                              size={16}
                              className="mr-1 text-zinc-500"
                            />
                            <span className="font-medium text-zinc-300">
                              ${bid.maxBudget.toFixed(2)}
                            </span>
                          </div>

                          <div className="flex items-center text-zinc-400">
                            <IconCalendar
                              size={16}
                              className="mr-1 text-zinc-500"
                            />
                            <span>
                              Due{" "}
                              {new Date(
                                bid.requiredDeliveryDate
                              ).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center text-zinc-400">
                            <span className="font-medium text-zinc-300">
                              {bid.responses}
                            </span>
                            <span className="ml-1">
                              {bid.responses === 1 ? "response" : "responses"}
                            </span>
                          </div>

                          <div className="flex items-center text-zinc-400">
                            <span>Posted </span>
                            <span className="ml-1">
                              {formatDistance(
                                new Date(bid.createdAt),
                                new Date(),
                                { addSuffix: true }
                              )}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() =>
                            router.push(`your-bid/edit-bid/${bid.id}`)
                          }
                          variant="outline"
                          className="border-zinc-700 text-zinc-300 hover:bg-zinc-700"
                        >
                          <IconEdit size={18} />
                        </Button>

                        <Button
                          onClick={() => handleDeleteBid(bid.id)}
                          variant="outline"
                          className="border-zinc-700 text-red-400 hover:bg-red-950/30 hover:border-red-700/50"
                        >
                          <IconTrash size={18} />
                        </Button>

                        <Button
                          onClick={() => router.push(`/bid/${bid.id}`)}
                          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1"
                        >
                          <span>View</span>
                          <IconChevronRight size={18} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
