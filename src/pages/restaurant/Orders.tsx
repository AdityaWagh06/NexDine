import React, { useEffect, useState, useRef } from "react";
import {
  Clock,
  Package,
  Phone,
  User,
  MessageSquare,
  Volume2,
  ChefHat,
  Eye,
} from "lucide-react";
import {
  Card,
  Button,
  Badge,
  Modal,
  Textarea,
  Loading,
  Alert,
} from "../../components/ui";
import {
  subscribeToOrders,
  updateOrderStatus,
} from "../../services/restaurantService";
import type { Order } from "../../config/supabase";
import { formatDateTime, formatCurrency, playSound } from "../../utils/helpers";

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("pending");
  const prevOrderCountRef = useRef(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (!user.restaurant_id) return;

    const subscription = subscribeToOrders(user.restaurant_id, (data) => {
      // Audio chime on incoming order
      if (data.length > prevOrderCountRef.current) {
        const newOrders = data.filter(
          (order) =>
            order.status === "pending" && !orders.find((o) => o.id === order.id)
        );
        if (newOrders.length > 0) {
          playSound("notification");
        }
      }
      prevOrderCountRef.current = data.length;
      setOrders(data);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const filteredOrders = orders
    .filter((order) => {
      if (statusFilter === "all") return true;
      if (statusFilter === "accepted") return order.status === "accepted" || order.status === "preparing";
      return order.status === statusFilter;
    })
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    const success = await updateOrderStatus(orderId, newStatus);
    if (!success) {
      alert("Failed to update order status");
    }
  };

  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowDetailsModal(true);
  };

  const getObviousStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return {
          bg: "bg-amber-500 text-white font-extrabold",
          border: "border-l-8 border-l-amber-500 bg-amber-50/30",
          label: "PENDING",
        };
      case "accepted":
      case "preparing":
        return {
          bg: "bg-indigo-600 text-white font-extrabold",
          border: "border-l-8 border-l-indigo-600 bg-indigo-50/20",
          label: "PREPARING",
        };
      case "completed":
      case "ready":
        return {
          bg: "bg-emerald-600 text-white font-extrabold",
          border: "border-l-8 border-l-emerald-500 bg-emerald-50/20",
          label: "COMPLETED",
        };
      case "cancelled":
      case "rejected":
        return {
          bg: "bg-rose-600 text-white font-extrabold",
          border: "border-l-8 border-l-rose-500 bg-slate-50",
          label: "CANCELLED",
        };
      default:
        return {
          bg: "bg-slate-700 text-white font-extrabold",
          border: "border-l-8 border-l-slate-400",
          label: status.toUpperCase(),
        };
    }
  };

  if (loading) {
    return <Loading text="Connecting to Kitchen Order Stream..." />;
  }

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const preparingCount = orders.filter((o) => o.status === "accepted" || o.status === "preparing").length;

  return (
    <div className="space-y-6">
      {/* Top Title & Alert Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <ChefHat className="w-6 h-6 text-indigo-600" />
            Kitchen Live Orders
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Scan order tickets in under 2 seconds. Optimized for high-volume service.
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 text-white font-black text-sm shadow-md animate-pulse">
            <Clock className="w-5 h-5" />
            <span>{pendingCount} PENDING ORDER{pendingCount > 1 ? "S" : ""}</span>
          </div>
        )}
      </div>

      {/* Realtime Stream Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 text-white px-4 py-3 rounded-xl text-xs font-semibold shadow-xs">
        <div className="flex items-center space-x-2.5">
          <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
          <span>Real-time Sync Stream Connected • Audio Chime Active</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-300">
          <Volume2 className="w-4 h-4 text-emerald-400" />
          <span>Kitchen Speakers Ready</span>
        </div>
      </div>

      {/* Large Status Filter Tabs */}
      <div className="flex flex-wrap gap-2 pt-1">
        {[
          { key: "pending", label: "Pending", count: pendingCount },
          { key: "accepted", label: "Preparing", count: preparingCount },
          { key: "completed", label: "Completed" },
          { key: "cancelled", label: "Cancelled" },
          { key: "all", label: "All Orders" },
        ].map((tab) => {
          const isActive = statusFilter === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-black ${
                  isActive ? "bg-amber-400 text-slate-950" : "bg-slate-200 text-slate-800"
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Orders Grid */}
      {filteredOrders.length === 0 ? (
        <Card className="text-center py-16 border-slate-200/80">
          <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">No Orders in Queue</h3>
          <p className="text-xs text-slate-500">
            No active orders matching status filter <strong className="uppercase">{statusFilter}</strong>.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredOrders.map((order) => {
            const statusStyle = getObviousStatusStyle(order.status);

            return (
              <Card
                key={order.id}
                className={`transition-all ${statusStyle.border} p-5 hover:shadow-md`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left Column: Table Number & ID */}
                  <div className="flex items-start space-x-4">
                    {/* Big Table Badge */}
                    <div className="flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-slate-900 text-white flex-shrink-0 shadow-xs">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        {order.table_number ? "TABLE" : "TAKEAWAY"}
                      </span>
                      <span className="text-2xl font-black tracking-tight">
                        {order.table_number ? String(order.table_number).padStart(2, "0") : "TA"}
                      </span>
                    </div>

                    {/* Order Meta Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-black text-slate-900">
                          Order #{order.order_number}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs tracking-wider uppercase ${statusStyle.bg}`}>
                          {statusStyle.label}
                        </span>
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                          {formatDateTime(order.created_at)}
                        </span>
                      </div>

                      {/* Items Brief List */}
                      <div className="bg-white/80 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1 my-2">
                        <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-1.5 mb-1.5">
                          <span>{order.items?.length || 0} Ordered Items</span>
                          <span className="text-indigo-600 font-black text-sm">{formatCurrency(order.total)}</span>
                        </div>
                        {order.items?.map((item: any, idx: number) => (
                          <div key={idx} className="flex justify-between text-slate-700">
                            <span className="font-semibold">
                              <span className="font-black text-slate-900 mr-1">{item.quantity}x</span>
                              {item.name}
                            </span>
                            <span className="text-slate-500">{formatCurrency(item.item_total || item.subtotal || 0)}</span>
                          </div>
                        ))}
                      </div>

                      {/* Customer Info & Notes */}
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                        {order.customer_name && (
                          <span className="flex items-center font-medium">
                            <User className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            {order.customer_name}
                          </span>
                        )}
                        {order.customer_phone && (
                          <span className="flex items-center font-medium">
                            <Phone className="w-3.5 h-3.5 mr-1 text-slate-400" />
                            <a href={`tel:${order.customer_phone}`} className="text-indigo-600 hover:underline font-bold">
                              {order.customer_phone}
                            </a>
                          </span>
                        )}
                      </div>

                      {order.customer_notes && (
                        <div className="flex items-start space-x-2 text-xs bg-amber-50 text-amber-900 p-2.5 rounded-lg border border-amber-200/80 font-medium">
                          <MessageSquare className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold">Note: </span>
                            {order.customer_notes}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Big Touch Staff Action Buttons */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 min-w-[180px] justify-center">
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="primary"
                          size="lg"
                          fullWidth
                          className="!py-3.5 text-sm font-black tracking-wide"
                          onClick={() => handleStatusUpdate(order.id, "accepted")}
                        >
                          ACCEPT ORDER
                        </Button>
                        <Button
                          variant="danger"
                          size="md"
                          fullWidth
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowRejectModal(true);
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}

                    {(order.status === "accepted" || order.status === "preparing") && (
                      <>
                        <Button
                          variant="emerald"
                          size="lg"
                          fullWidth
                          className="!py-3.5 text-sm font-black tracking-wide"
                          onClick={() => handleStatusUpdate(order.id, "completed")}
                        >
                          MARK COMPLETE
                        </Button>
                        <Button
                          variant="danger"
                          size="md"
                          fullWidth
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowRejectModal(true);
                          }}
                        >
                          Cancel Order
                        </Button>
                      </>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      icon={<Eye className="w-4 h-4" />}
                      onClick={() => handleViewDetails(order)}
                    >
                      View Ticket
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Order Ticket Details Modal */}
      <OrderDetailsModal
        isOpen={showDetailsModal}
        order={selectedOrder}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedOrder(null);
        }}
      />

      {/* Cancel Order Modal */}
      <RejectOrderModal
        isOpen={showRejectModal}
        order={selectedOrder}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedOrder(null);
        }}
        onReject={handleStatusUpdate}
      />
    </div>
  );
};

// Order Details Modal
interface OrderDetailsModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({ isOpen, order, onClose }) => {
  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Kitchen Ticket #${order.order_number}`} size="lg">
      <div className="space-y-5">
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Table Location</span>
            <span className="text-xl font-black">
              {order.table_number ? `TABLE ${String(order.table_number).padStart(2, "0")}` : "TAKEAWAY"}
            </span>
          </div>
          <Badge variant="primary" className="uppercase font-extrabold text-sm px-3 py-1">
            {order.status}
          </Badge>
        </div>

        <div>
          <h4 className="font-bold text-xs uppercase text-slate-500 mb-2">Item Breakdown</h4>
          <div className="space-y-2">
            {order.items?.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between p-3 bg-slate-50 rounded-xl border border-slate-200/60 text-xs">
                <div>
                  <p className="font-black text-slate-900 text-sm">{item.quantity}x {item.name}</p>
                  {item.size && <p className="text-slate-500">Size: {item.size}</p>}
                  {item.addons?.length > 0 && <p className="text-slate-500">Addons: {item.addons.join(", ")}</p>}
                </div>
                <p className="font-extrabold text-slate-900 text-sm">
                  {formatCurrency(item.item_total || item.subtotal || 0)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-200 pt-3 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span>{formatCurrency(order.subtotal)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Taxes</span>
            <span>{formatCurrency(order.tax)}</span>
          </div>
          <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total Bill</span>
            <span className="text-indigo-600">{formatCurrency(order.total)}</span>
          </div>
        </div>

        <Button onClick={onClose} fullWidth variant="primary">
          Close Ticket
        </Button>
      </div>
    </Modal>
  );
};

// Cancel Modal
interface RejectOrderModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
  onReject: (orderId: string, status: string, notes?: string) => void;
}

const RejectOrderModal: React.FC<RejectOrderModalProps> = ({ isOpen, order, onClose, onReject }) => {
  const [reason, setReason] = useState("");

  const handleCancel = () => {
    if (!order) return;
    onReject(order.id, "cancelled", reason);
    onClose();
    setReason("");
  };

  if (!order) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Cancel Kitchen Order" size="md">
      <div className="space-y-4">
        <Alert type="warning" message="Confirm order cancellation? Customer status will update live." />
        <Textarea
          label="Reason (Optional)"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Out of stock, kitchen load..."
          rows={3}
        />
        <div className="flex gap-3 pt-2">
          <Button variant="outline" onClick={onClose} fullWidth>
            Keep Active
          </Button>
          <Button variant="danger" onClick={handleCancel} fullWidth>
            Confirm Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default Orders;
