import React, { useEffect, useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Store as StoreIcon,
  CheckCircle2,
  X,
  Clock,
  Copy,
} from "lucide-react";
import {
  Card,
  Button,
  Modal,
  Input,
  Select,
  Textarea,
  Alert,
  Badge,
  Loading,
} from "../../components/ui";
import {
  subscribeToPendingRequests,
  createRestaurantAccount,
  rejectRegistrationRequest,
} from "../../services/adminService";
import type { RegistrationRequest } from "../../config/supabase";
import { formatDateTime, copyToClipboard } from "../../utils/helpers";
import { APP_CONFIG } from "../../config/config";

const PendingRequests: React.FC = () => {
  const [requests, setRequests] = useState<RegistrationRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] =
    useState<RegistrationRequest | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [credentials, setCredentials] = useState<any>(null);

  // Real-time subscription
  useEffect(() => {
    const subscription = subscribeToPendingRequests((data) => {
      setRequests(data);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateAccount = (request: RegistrationRequest) => {
    setSelectedRequest(request);
    setShowCreateModal(true);
  };

  const handleReject = (request: RegistrationRequest) => {
    setSelectedRequest(request);
    setShowRejectModal(true);
  };

  if (loading) {
    return <Loading text="Loading pending restaurant applications..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Pending Applications
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Verify restaurant registrations and issue NextDine dashboard access
          </p>
        </div>
        <Badge variant="warning" className="text-xs font-bold px-3 py-1.5">
          {requests.length} Application{requests.length !== 1 ? "s" : ""} Pending
        </Badge>
      </div>

      {/* Real-time indicator */}
      {requests.length > 0 && (
        <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-2 rounded-xl w-fit">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span>Live Queue • Applications sync automatically</span>
        </div>
      )}

      {/* Requests List */}
      {requests.length === 0 ? (
        <Card className="text-center py-16 border-slate-200/80">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            All Applications Processed!
          </h3>
          <p className="text-xs text-slate-500">
            No pending registration requests waiting for approval at this time.
          </p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card
              key={request.id}
              className="hover:shadow-md transition-all border-slate-200/80"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                {/* Details */}
                <div className="flex-1 space-y-3">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900 mb-1">
                        {request.restaurant_name}
                      </h3>
                      <Badge variant="neutral">{request.restaurant_type}</Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 flex items-center justify-end">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {formatDateTime(request.created_at)}
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid sm:grid-cols-2 gap-2 text-xs pt-1">
                    <div className="flex items-center space-x-2 text-slate-600">
                      <StoreIcon className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-900">
                        {request.owner_name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <a
                        href={`tel:${request.phone}`}
                        className="text-indigo-600 font-semibold hover:underline"
                      >
                        {request.phone}
                      </a>
                    </div>
                    {request.email && (
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a
                          href={`mailto:${request.email}`}
                          className="text-indigo-600 font-semibold hover:underline truncate"
                        >
                          {request.email}
                        </a>
                      </div>
                    )}
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {request.city}
                        {request.address && `, ${request.address}`}
                      </span>
                    </div>
                  </div>

                  {/* Notes */}
                  {(request.heard_from || request.notes) && (
                    <div className="bg-slate-50 rounded-xl p-3 text-xs space-y-1 border border-slate-200/60">
                      {request.heard_from && (
                        <p className="text-slate-600">
                          <strong className="text-slate-800">Source:</strong>{" "}
                          {request.heard_from}
                        </p>
                      )}
                      {request.notes && (
                        <p className="text-slate-600">
                          <strong className="text-slate-800">Applicant Notes:</strong>{" "}
                          {request.notes}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex sm:flex-row md:flex-col gap-2 md:min-w-[140px] justify-end">
                  <Button
                    variant="emerald"
                    size="sm"
                    fullWidth
                    icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                    onClick={() => handleCreateAccount(request)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    fullWidth
                    icon={<X className="w-3.5 h-3.5" />}
                    onClick={() => handleReject(request)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Create Account Modal */}
      <CreateAccountModal
        isOpen={showCreateModal}
        request={selectedRequest}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedRequest(null);
        }}
        onSuccess={(creds) => {
          setShowCreateModal(false);
          setCredentials(creds);
          setShowCredentialsModal(true);
        }}
      />

      {/* Reject Modal */}
      <RejectModal
        isOpen={showRejectModal}
        request={selectedRequest}
        onClose={() => {
          setShowRejectModal(false);
          setSelectedRequest(null);
        }}
      />

      {/* Credentials Display Modal */}
      <CredentialsModal
        isOpen={showCredentialsModal}
        credentials={credentials}
        onClose={() => {
          setShowCredentialsModal(false);
          setCredentials(null);
        }}
      />
    </div>
  );
};

// Create Account Modal Component
interface CreateAccountModalProps {
  isOpen: boolean;
  request: RegistrationRequest | null;
  onClose: () => void;
  onSuccess: (credentials: any) => void;
}

const CreateAccountModal: React.FC<CreateAccountModalProps> = ({
  isOpen,
  request,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    subscriptionPlan: "free_trial",
    internalNotes: "",
    sendViaSMS: true,
    sendViaWhatsApp: true,
    sendViaEmail: true,
  });

  useEffect(() => {
    if (request) {
      setFormData((prev) => ({
        ...prev,
        email: request.email || "",
      }));
    }
  }, [request]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email) {
      setError("Email is required");
      return;
    }

    if (!request) return;

    setLoading(true);
    const result = await createRestaurantAccount(request.id, {
      email: formData.email,
      subscriptionPlan: formData.subscriptionPlan,
      internalNotes: formData.internalNotes,
    });

    setLoading(false);

    if (result.success && result.credentials) {
      onSuccess(result.credentials);
    } else {
      setError(result.error || "Failed to create account");
    }
  };

  if (!request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Approve & Provision Account"
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && <Alert type="error" message={error} />}

        {/* Restaurant Summary */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 text-xs space-y-1">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider mb-2">Applicant Summary</h4>
          <p className="text-slate-700">
            <strong>Outlet Name:</strong> {request.restaurant_name}
          </p>
          <p className="text-slate-600">
            <strong>Owner:</strong> {request.owner_name} ({request.phone})
          </p>
          <p className="text-slate-600">
            <strong>City:</strong> {request.city}
          </p>
        </div>

        {/* Login Email */}
        <Input
          label="Dashboard Login Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="owner@restaurant.com"
          required
          helperText="Used by outlet manager to log in"
        />

        <Select
          label="Assigned Subscription Plan"
          value={formData.subscriptionPlan}
          onChange={(e) =>
            setFormData({ ...formData, subscriptionPlan: e.target.value })
          }
          options={Object.keys(APP_CONFIG.plans).map((key) => ({
            value: key,
            label: APP_CONFIG.plans[key as keyof typeof APP_CONFIG.plans].name,
          }))}
        />

        <Textarea
          label="Internal Verification Notes (Optional)"
          value={formData.internalNotes}
          onChange={(e) =>
            setFormData({ ...formData, internalNotes: e.target.value })
          }
          placeholder="Verified phone number via call on..."
          rows={2}
        />

        {/* Checkbox Channels */}
        <div>
          <label className="label mb-2">Notification Channels</label>
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendViaSMS}
                onChange={(e) =>
                  setFormData({ ...formData, sendViaSMS: e.target.checked })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>SMS Notification</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendViaWhatsApp}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    sendViaWhatsApp: e.target.checked,
                  })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>WhatsApp Message</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendViaEmail}
                onChange={(e) =>
                  setFormData({ ...formData, sendViaEmail: e.target.checked })
                }
                className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>Email Welcome Package</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button type="submit" variant="emerald" loading={loading} fullWidth>
            Approve & Issue Credentials
          </Button>
        </div>
      </form>
    </Modal>
  );
};

// Reject Modal Component
interface RejectModalProps {
  isOpen: boolean;
  request: RegistrationRequest | null;
  onClose: () => void;
}

const RejectModal: React.FC<RejectModalProps> = ({
  isOpen,
  request,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleReject = async () => {
    if (!reason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    if (!request) return;

    setLoading(true);
    const success = await rejectRegistrationRequest(request.id, reason);
    setLoading(false);

    if (success) {
      onClose();
      setReason("");
    } else {
      setError("Failed to reject request");
    }
  };

  if (!request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Reject Registration Application"
      size="md"
    >
      <div className="space-y-4">
        {error && <Alert type="error" message={error} />}

        <p className="text-xs text-slate-600 leading-relaxed">
          Are you sure you want to decline registration for{" "}
          <strong className="text-slate-900">{request.restaurant_name}</strong>?
        </p>

        <Textarea
          label="Rejection Reason"
          value={reason}
          onChange={(e) => {
            setReason(e.target.value);
            setError("");
          }}
          placeholder="Reason for declining application..."
          required
          rows={3}
        />

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onClose} fullWidth>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleReject}
            loading={loading}
            fullWidth
          >
            Confirm Rejection
          </Button>
        </div>
      </div>
    </Modal>
  );
};

// Credentials Display Modal
interface CredentialsModalProps {
  isOpen: boolean;
  credentials: any;
  onClose: () => void;
}

const CredentialsModal: React.FC<CredentialsModalProps> = ({
  isOpen,
  credentials,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `NextDine Account Credentials:\n\nEmail: ${credentials?.email}\nPassword: ${credentials?.password}\nLogin URL: ${credentials?.loginUrl}`;
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!credentials) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Account Provisioned Successfully!"
      size="md"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 mb-4">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Restaurant account created. Credentials generated and queued for transmission.
          </p>
        </div>

        {/* Credentials Display Box */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3 font-mono text-xs">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans block">Manager Email</label>
            <p className="text-slate-900 font-bold">{credentials.email}</p>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans block">Temporary Password</label>
            <p className="text-indigo-600 font-bold text-sm">{credentials.password}</p>
          </div>
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-sans block">Portal URL</label>
            <p className="text-slate-600 break-all">{credentials.loginUrl}</p>
          </div>
        </div>

        <Button
          variant="outline"
          fullWidth
          icon={<Copy className="w-4 h-4" />}
          onClick={handleCopy}
        >
          {copied ? "Copied to Clipboard!" : "Copy Account Credentials"}
        </Button>

        <Button onClick={onClose} fullWidth variant="primary">
          Done
        </Button>
      </div>
    </Modal>
  );
};

export default PendingRequests;
