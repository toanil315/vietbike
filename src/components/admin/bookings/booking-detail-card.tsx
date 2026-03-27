import { Booking } from "@/types";
import { formatDate, formatPrice } from "@/lib/utils";

interface BookingDetailCardProps {
  booking: Booking;
}

export default function BookingDetailCard({ booking }: BookingDetailCardProps) {
  const customerName =
    booking.customerInfo?.fullName ||
    booking.customerSnapshot?.fullName ||
    "--";
  const customerPhone =
    booking.customerInfo?.phone || booking.customerSnapshot?.phone || "--";
  const customerEmail =
    booking.customerInfo?.email || booking.customerSnapshot?.email || "--";
  const extensionInfo = booking.extensionInfo?.trim();
  const documents = booking.documents || [];

  return (
    <div className="space-y-6 rounded-3xl border border-outline-variant/10 bg-white p-6 shadow-sm">
      <div>
        <h1 className="text-3xl font-bold text-on-surface">
          Booking {booking.reference}
        </h1>
        <p className="text-sm text-secondary">
          Thông tin chi tiết theo mã booking.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">
            Tên khách hàng
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {customerName}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">
            Số điện thoại
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {customerPhone}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">Email</p>
          <p className="text-sm font-semibold text-on-surface">
            {customerEmail}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">Nguồn</p>
          <p className="text-sm font-semibold text-on-surface">
            {booking.sourceApp || "manual"}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">Biển số</p>
          <p className="text-sm font-semibold text-on-surface">
            {booking.licensePlate || "--"}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">
            Ngày nhận xe
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {formatDate(booking.pickupDate)}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">
            Ngày trả xe
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {formatDate(booking.dropoffDate)}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">
            Trạng thái
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {booking.status}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">
            Tổng tiền
          </p>
          <p className="text-sm font-semibold text-on-surface">
            {booking.totalAmount}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">Đặt cọc</p>
          <p className="text-sm font-semibold text-on-surface">
            {booking.depositAmount}
          </p>
        </div>

        <div className="space-y-1 rounded-xl bg-surface-container/20 p-4">
          <p className="text-xs font-bold uppercase text-secondary">Tạo lúc</p>
          <p className="text-sm font-semibold text-on-surface">
            {formatDate(booking.createdAt)}
          </p>
        </div>
      </div>

      <div className="space-y-2 rounded-xl bg-surface-container/20 p-4">
        <p className="text-xs font-bold uppercase text-secondary">
          Thông tin gia hạn
        </p>
        <p className="text-sm text-on-surface">{extensionInfo}</p>
      </div>

      <div className="space-y-2 rounded-xl bg-surface-container/20 p-4">
        <p className="text-xs font-bold uppercase text-secondary">
          Ghi chú booking
        </p>
        <p className="text-sm text-on-surface">
          {booking.note || "Không có ghi chú"}
        </p>
      </div>

      <div className="space-y-3 rounded-xl bg-surface-container/20 p-4">
        <p className="text-xs font-bold uppercase text-secondary">
          Tài liệu (tên + đường dẫn)
        </p>
        {documents.length === 0 ? (
          <p className="text-sm text-secondary">Chưa có tài liệu nào.</p>
        ) : (
          <div className="space-y-2">
            {documents.map((document, index) => (
              <div
                key={`${index}-${document.name}-${document.url || ""}`}
                className="grid grid-cols-1 gap-2 rounded-lg border border-outline-variant/20 bg-white/70 p-3 md:grid-cols-[1fr_2fr]"
              >
                <div>
                  <p className="text-xs text-secondary">Tên tài liệu</p>
                  <p className="text-sm font-semibold text-on-surface">
                    {document.name || "--"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-secondary">Đường dẫn</p>
                  {document.url ? (
                    <a
                      href={document.url}
                      target="_blank"
                      rel="noreferrer"
                      className="break-all text-sm font-semibold text-primary hover:underline"
                    >
                      {document.url}
                    </a>
                  ) : (
                    <p className="text-sm font-semibold text-on-surface">--</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
