import React, { useEffect, useState } from "react";
import {
  Search,
  Eye,
  Ban,
  CheckCircle,
  Store as StoreIcon,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Crown,
} from "lucide-react";
import {
  Card,
  Button,
  Input,
  Badge,
  Loading,
  Modal,
  Select,
  Textarea,
} from "../../components/ui";
import {
  subscribeToRestaurants,
  toggleRestaurantStatus,
} from "../../services/adminService";
import type { Restaurant } from "../../config/supabase";
import { formatDateTime } from "../../utils/helpers";
import { APP_CONFIG } from "../../config/config";

const AllRestaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);

  // Real-time subscription
  useEffect(() => {
    const subscription = subscribeToRestaurants((data) => {
      setRestaurants(data);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Filter restaurants
  useEffect(() => {
    let filtered = restaurants;

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(term) ||
          r.owner_name?.toLowerCase().includes(term) ||
          r.phone?.toLowerCase().includes(term) ||
          r.city?.toLowerCase().includes(term)
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((r) => r.status === statusFilter);
    }

    setFilteredRestaurants(filtered);
  }, [restaurants, searchTerm, statusFilter]);

  const handleViewDetails = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowDetailsModal(true);
  };

  const handleToggleBlock = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setShowBlockModal(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "blocked":
        return <Badge variant="error">Blocked</Badge>;
      case "trial":
        return <Badge variant="warning">Trial</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    const planConfig = APP_CONFIG.plans[plan as keyof typeof APP_CONFIG.plans];

    return (
      <Badge
        variant={plan === "pro" ? "primary" : "neutral"}
        className="flex items-center space-x-1"
      >
        {plan === "pro" && <Crown className="w-3 h-3 text-indigo-600" />}
        <span>{planConfig ? planConfig.name : plan}</span>
      </Badge>
    );
  };

  if (loading) {
    return <Loading text="Loading restaurant directory..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Registered Outlets
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Directory of all active and blocked restaurant accounts on NextDine
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="neutral" className="text-xs font-bold px-3 py-1.5">
            {restaurants.length} Outlets Total
          </Badge>
          <Badge variant="success" className="text-xs font-bold px-3 py-1.5">
            {restaurants.filter((r) => r.status === "active").length} Active
          </Badge>
        </div>
      </div>

      {/* Real-time indicator */}
      <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-xl w-fit">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
        <span>Live Sync Active • Directory updates in real-time</span>
      </div>

      {/* Search and Filters */}
      <Card className="!p-4 border-slate-200/80">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by restaurant name, owner, phone, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4 text-slate-400" />}
            />
          </div>
          <div className="sm:w-48">
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: "all", label: "All Statuses" },
                { value: "active", label: "Active" },
                { value: "blocked", label: "Blocked" },
                { value: "trial", label: "Trial" },
              ]}
            />
          </div>
        </div>
      </Card>

      {/* Restaurants List */}
      {filteredRestaurants.length === 0 ? (
        <Card className="text-center py-16 border-slate-200/80">
          <StoreIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No Outlets Found
          </h3>
          <p className="text-xs text-slate-500">
            {searchTerm || statusFilter !== "all"
              ? "No restaurant matches your active search query."
              : "No registered restaurants in the system yet."}
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="hover:shadow-md transition-all border-slate-200/80"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                {/* Restaurant Info */}
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-base font-extrabold text-slate-900">
                          {restaurant.name}
                        </h3>
                        {getStatusBadge(restaurant.status)}
                        {restaurant.subscription_plan &&
                          getPlanBadge(restaurant.subscription_plan)}
                      </div>
                      <p className="text-xs text-slate-500">
                        {restaurant.restaurant_type}
                      </p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs pt-1">
                    {restaurant.owner_name && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <StoreIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-semibold text-slate-900">
                          {restaurant.owner_name}
                        </span>
                      </div>
                    )}
                    {restaurant.phone && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <a
                          href={`tel:${restaurant.phone}`}
                          className="text-indigo-600 font-semibold hover:underline"
                        >
                          {restaurant.phone}
                        </a>
                      </div>
                    )}
                    {restaurant.email && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a
                          href={`mailto:${restaurant.email}`}
                          className="text-indigo-600 font-semibold hover:underline truncate"
                        >
                          {restaurant.email}
                        </a>
                      </div>
                    )}
                    {restaurant.city && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{restaurant.city}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{formatDateTime(restaurant.created_at)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-row md:flex-col gap-2 md:min-w-[140px] justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Eye className="w-3.5 h-3.5" />}
                    onClick={() => handleViewDetails(restaurant)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant={
                      restaurant.status === "blocked" ? "emerald" : "danger"
                    }
                    size="sm"
                    fullWidth
                    icon={
                      restaurant.status === "blocked" ? (
                        <CheckCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Ban className="w-3.5 h-3.5" />
                      )
                    }
                    onClick={() => handleToggleBlock(restaurant)}
                  >
                    {restaurant.status === "blocked" ? "Unblock" : "Block"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Details Modal */}
      <DetailsModal
        isOpen={showDetailsModal}
        restaurant={selectedRestaurant}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedRestaurant(null);
        }}
      />

      {/* Block/Unblock Modal */}
      <BlockModal
        isOpen={showBlockModal}
        restaurant={selectedRestaurant}
        onClose={() => {
          setShowBlockModal(false);
          setSelectedRestaurant(null);
        }}
      />
    </div>
  );
};

// Details Modal Component
interface DetailsModalProps {
  isOpen: boolean;
  restaurant: Restaurant | null;
  onClose: () => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({
  isOpen,
  restaurant,
  onClose,
}) => {
  if (!restaurant) return null;

  const planConfig =
    APP_CONFIG.plans[
      restaurant.subscription_plan as keyof typeof APP_CONFIG.plans
    ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Restaurant Account Details"
      size="lg"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/70">
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              {restaurant.name}
            </h3>
            <div className="flex items-center space-x-2">
              <Badge variant="neutral">{restaurant.restaurant_type}</Badge>
              {restaurant.subscription_plan && planConfig && (
                <Badge variant="primary">{planConfig.name}</Badge>
              )}
            </div>
          </div>
          <div>
            {restaurant.status === "active" ? (
              <Badge variant="success">Active</Badge>
            ) : restaurant.status === "blocked" ? (
              <Badge variant="error">Blocked</Badge>
            ) : (
              <Badge variant="warning">{restaurant.status}</Badge>
            )}
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid sm:grid-cols-2 gap-4 text-xs">
          <InfoItem label="Owner Name" value={restaurant.owner_name} />
          <InfoItem
            label="Phone"
            value={restaurant.phone}
            link={`tel:${restaurant.phone}`}
          />
          <InfoItem
            label="Email"
            value={restaurant.email}
            link={`mailto:${restaurant.email}`}
          />
          <InfoItem label="City" value={restaurant.city} />
          <InfoItem label="Address" value={restaurant.address} fullWidth />
          <InfoItem
            label="Registered On"
            value={formatDateTime(restaurant.created_at)}
          />
          <InfoItem
            label="Last Updated"
            value={formatDateTime(restaurant.updated_at)}
          />
        </div>

        {/* Subscription Details */}
        {planConfig && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 text-xs space-y-1.5">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">
              Subscription Plan
            </h4>
            <p className="text-slate-600">
              <strong className="text-slate-900">Plan Name:</strong> {planConfig.name}{" "}
              (₹{planConfig.price}/{planConfig.duration})
            </p>
            <p className="text-slate-600">
              <strong className="text-slate-900">Features:</strong>{" "}
              {planConfig.features.join(", ")}
            </p>
            {restaurant.trial_ends_at && (
              <p className="text-amber-700 font-semibold">
                <strong>Trial Expiration:</strong>{" "}
                {formatDateTime(restaurant.trial_ends_at)}
              </p>
            )}
          </div>
        )}

        {/* Internal Notes */}
        {restaurant.internal_notes && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 text-xs">
            <h4 className="font-bold text-slate-900 mb-1">Internal Notes</h4>
            <p className="text-slate-600 leading-relaxed">
              {restaurant.internal_notes}
            </p>
          </div>
        )}

        {/* Block Reason (if blocked) */}
        {restaurant.status === "blocked" && restaurant.block_reason && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-xs">
            <h4 className="font-bold text-rose-900 mb-1">Block Reason</h4>
            <p className="text-rose-700">
              {restaurant.block_reason}
            </p>
          </div>
        )}

        <Button onClick={onClose} fullWidth variant="primary">
          Close Details
        </Button>
      </div>
    </Modal>
  );
};

// Block Modal Component
interface BlockModalProps {
  isOpen: boolean;
  restaurant: Restaurant | null;
  onClose: () => void;
}

const BlockModal: React.FC<BlockModalProps> = ({
  isOpen,
  restaurant,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const isBlocked = restaurant?.status === "blocked";

  const handleToggle = async () => {
    if (!isBlocked && !reason.trim()) {
      setError("Please provide a reason for blocking");
      return;
    }

    if (!restaurant) return;

    setLoading(true);
    const success = await toggleRestaurantStatus(
      restaurant.id,
      isBlocked,
      reason
    );
    setLoading(false);

    if (success) {
      onClose();
      setReason("");
    } else {
      setError(`Failed to ${isBlocked ? "unblock" : "block"} restaurant`);
    }
  };

  if (!restaurant) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isBlocked ? "Unblock Restaurant Account" : "Block Restaurant Account"}
      size="md"
    >
      <div className="space-y-4">
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 text-xs text-rose-700">
            {error}
          </div>
        )}

        <p className="text-xs text-slate-600 leading-relaxed">
          {isBlocked ? (
            <>
              Are you sure you want to unblock{" "}
              <strong className="text-slate-900">{restaurant.name}</strong>? They
              will regain full access to their dashboard.
            </>
          ) : (
            <>
              Are you sure you want to block{" "}
              <strong className="text-slate-900">{restaurant.name}</strong>? Their manager login and active QR ordering will be suspended immediately.
            </>
          )}
        </p>

        {!isBlocked && (
          <Textarea
            label="Reason for Blocking"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setError("");
            }}
            placeholder="Specify reason for suspension..."
            required
            rows={3}
          />
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            variant={isBlocked ? "emerald" : "danger"}
            onClick={handleToggle}
            loading={loading}
            fullWidth
          >
            {isBlocked ? "Confirm Unblock" : "Confirm Suspension"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Helper Component
interface InfoItemProps {
  label: string;
  value?: string | null;
  link?: string;
  fullWidth?: boolean;
}

const InfoItem: React.FC<InfoItemProps> = ({
  label,
  value,
  link,
  fullWidth,
}) => {
  if (!value) return null;

  return (
    <div className={fullWidth ? "sm:col-span-2" : ""}>
      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">{label}</label>
      {link ? (
        <a href={link} className="font-semibold text-indigo-600 hover:underline truncate block">
          {value}
        </a>
      ) : (
        <p className="font-semibold text-slate-900">{value}</p>
      )}
    </div>
  );
};

export default AllRestaurants;
