"use client";

import { useMemo, useState } from "react";
import AppointmentActions from "./AppointmentActions";

type Appointment = {
  id: string;
  name: string;
  email: string;
  phone: string;
  appointment_type: string;
  preferred_date: string | null;
  preferred_time: string | null;
  note: string | null;
  status: string;
  created_at: string;
};

type Props = {
  appointments?: Appointment[];
};

const statusOptions = [
  { value: "all", label: "Tüm durumlar" },
  { value: "pending", label: "Bekliyor" },
  { value: "confirmed", label: "Onaylandı" },
  { value: "completed", label: "Tamamlandı" },
  { value: "cancelled", label: "İptal edildi" },
];

function getStatusLabel(status: string) {
  switch (status) {
    case "confirmed":
      return "Onaylandı";
    case "completed":
      return "Tamamlandı";
    case "cancelled":
      return "İptal edildi";
    case "pending":
    default:
      return "Bekliyor";
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case "confirmed":
      return "bg-blue-50 text-blue-700";
    case "completed":
      return "bg-emerald-50 text-emerald-700";
    case "cancelled":
      return "bg-red-50 text-red-700";
    case "pending":
    default:
      return "bg-amber-50 text-amber-700";
  }
}

function formatDate(date: string | null) {
  if (!date) {
    return "Tarih belirtilmedi";
  }

  return new Date(`${date}T00:00:00`).toLocaleDateString(
    "tr-TR",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );
}

function formatTime(time: string | null) {
  if (!time) {
    return "Saat belirtilmedi";
  }

  return time.slice(0, 5);
}

export default function AppointmentFilters({
  appointments = [],
}: Props) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const appointmentTypes = useMemo(() => {
    return Array.from(
      new Set(
        appointments
          .map((appointment) => appointment.appointment_type)
          .filter(Boolean)
      )
    );
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    const searchValue = search
      .trim()
      .toLocaleLowerCase("tr-TR");

    return appointments.filter((appointment) => {
      const matchesSearch =
        !searchValue ||
        appointment.name
          .toLocaleLowerCase("tr-TR")
          .includes(searchValue) ||
        appointment.email
          .toLocaleLowerCase("tr-TR")
          .includes(searchValue) ||
        appointment.phone.includes(searchValue);

      const matchesStatus =
        status === "all" ||
        appointment.status === status;

      const matchesType =
        type === "all" ||
        appointment.appointment_type === type;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType
      );
    });
  }, [appointments, search, status, type]);

  const hasFilters =
    search.trim() !== "" ||
    status !== "all" ||
    type !== "all";

  function clearFilters() {
    setSearch("");
    setStatus("all");
    setType("all");
  }

  return (
    <div className="mt-8">

      {/* FİLTRELER */}

      <div className="rounded-[2rem] bg-white p-5 shadow-sm sm:p-6">

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_auto]">

          {/* ARAMA */}

          <div>
            <label
              htmlFor="appointment-search"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]"
            >
              Ara
            </label>

            <input
              id="appointment-search"
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Ad, e-posta veya telefon..."
              className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 text-sm text-[#26352a] outline-none transition placeholder:text-[#9aa098] focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
            />
          </div>

          {/* DURUM */}

          <div>
            <label
              htmlFor="appointment-status"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]"
            >
              Durum
            </label>

            <select
              id="appointment-status"
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 text-sm text-[#26352a] outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
            >
              {statusOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* GÖRÜŞME TÜRÜ */}

          <div>
            <label
              htmlFor="appointment-type"
              className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]"
            >
              Görüşme
            </label>

            <select
              id="appointment-type"
              value={type}
              onChange={(event) =>
                setType(event.target.value)
              }
              className="w-full rounded-xl border border-[#dfe3dc] bg-[#faf9f6] px-4 py-3 text-sm text-[#26352a] outline-none transition focus:border-[#71816a] focus:ring-2 focus:ring-[#71816a]/10"
            >
              <option value="all">
                Tüm görüşmeler
              </option>

              {appointmentTypes.map((appointmentType) => (
                <option
                  key={appointmentType}
                  value={appointmentType}
                >
                  {appointmentType}
                </option>
              ))}
            </select>
          </div>

          {/* TEMİZLE */}

          <div className="flex items-end">
            <button
              type="button"
              onClick={clearFilters}
              disabled={!hasFilters}
              className="w-full rounded-xl border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#f5f1e9] disabled:cursor-not-allowed disabled:opacity-40 lg:w-auto"
            >
              Temizle
            </button>
          </div>

        </div>

        {/* SONUÇ SAYISI */}

        <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#26352a]/5 pt-5 sm:flex-row sm:items-center">

          <p className="text-sm text-[#6f756e]">
            <span className="font-semibold text-[#26352a]">
              {filteredAppointments.length}
            </span>{" "}
            randevu gösteriliyor

            {filteredAppointments.length !== appointments.length && (
              <>
                {" "}
                / toplam{" "}
                <span className="font-medium">
                  {appointments.length}
                </span>
              </>
            )}
          </p>

          {hasFilters && (
            <p className="text-xs text-[#8a9089]">
              Filtreler aktif
            </p>
          )}

        </div>
      </div>

      {/* RANDEVULAR */}

      <div className="mt-5">

        {filteredAppointments.length === 0 ? (

          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">

            <div className="text-4xl">
              🔎
            </div>

            <h2 className="mt-4 text-xl font-semibold text-[#26352a]">
              Randevu bulunamadı
            </h2>

            <p className="mt-2 text-sm text-[#6f756e]">
              Arama veya filtre kriterlerinize uygun
              bir randevu bulunamadı.
            </p>

            {hasFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-xl bg-[#71816a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#5f6f59]"
              >
                Filtreleri Temizle
              </button>
            )}

          </div>

        ) : (

          <div className="space-y-5">

            {filteredAppointments.map((appointment) => (

              <article
                key={appointment.id}
                className="overflow-hidden rounded-[2rem] bg-white shadow-sm"
              >

                <div className="p-7">

                  {/* ÜST */}

                  <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-start">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-2xl font-semibold text-[#26352a]">
                          {appointment.name}
                        </h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                            appointment.status
                          )}`}
                        >
                          {getStatusLabel(
                            appointment.status
                          )}
                        </span>

                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#6f756e]">

                        <span>
                          📧 {appointment.email}
                        </span>

                        <span>
                          📱 {appointment.phone}
                        </span>

                      </div>

                    </div>

                    {/* TARİH */}

                    <div className="rounded-2xl bg-[#faf9f6] px-5 py-4 lg:min-w-[230px]">

                      <p className="text-xs uppercase tracking-[0.15em] text-[#71816a]">
                        Randevu Tarihi
                      </p>

                      <p className="mt-2 font-semibold text-[#26352a]">
                        {formatDate(
                          appointment.preferred_date
                        )}
                      </p>

                      <p className="mt-1 text-sm text-[#6f756e]">
                        {formatTime(
                          appointment.preferred_time
                        )}
                      </p>

                    </div>

                  </div>

                  {/* DETAYLAR */}

                  <div className="mt-7 grid gap-4 border-t border-[#26352a]/5 pt-7 sm:grid-cols-2 lg:grid-cols-3">

                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#71816a]">
                        Görüşme Türü
                      </p>

                      <p className="mt-2 text-sm font-medium text-[#26352a]">
                        {appointment.appointment_type}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#71816a]">
                        Talep Tarihi
                      </p>

                      <p className="mt-2 text-sm font-medium text-[#26352a]">
                        {new Date(
                          appointment.created_at
                        ).toLocaleDateString(
                          "tr-TR"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-[#71816a]">
                        Randevu Saati
                      </p>

                      <p className="mt-2 text-sm font-medium text-[#26352a]">
                        {formatTime(
                          appointment.preferred_time
                        )}
                      </p>
                    </div>

                  </div>

                  {/* NOT */}

                  {appointment.note && (
                    <div className="mt-6 rounded-2xl bg-[#faf9f6] p-5">

                      <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#71816a]">
                        Danışan Notu
                      </p>

                      <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[#596458]">
                        {appointment.note}
                      </p>

                    </div>
                  )}

                  {/* AKSİYONLAR */}

                  <div className="mt-7 flex flex-wrap gap-3 border-t border-[#26352a]/5 pt-6">

                    <AppointmentActions
                      id={appointment.id}
                      status={appointment.status}
                    />

                    <a
                      href={`mailto:${appointment.email}`}
                      className="rounded-xl border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#f5f1e9]"
                    >
                      E-posta Gönder
                    </a>

                    <a
                      href={`tel:${appointment.phone}`}
                      className="rounded-xl border border-[#dfe3dc] bg-white px-5 py-3 text-sm font-medium text-[#596458] transition hover:bg-[#f5f1e9]"
                    >
                      Ara
                    </a>

                  </div>

                </div>

              </article>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}
