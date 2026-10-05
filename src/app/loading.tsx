export default function Loading() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#faf9f6] px-6">
      <div className="text-center">
        <div
          className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#dce4d5] border-t-[#71816a]"
          aria-hidden="true"
        />

        <p className="mt-5 text-sm text-[#6f756e]">
          Sayfa yükleniyor...
        </p>
      </div>
    </main>
  );
}
    