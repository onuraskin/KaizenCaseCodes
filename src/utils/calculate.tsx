export const calculateRemainingDays = (remainingText: string) => {
  const remainingDateParts = remainingText.split('.');
  const remainingDay = parseInt(remainingDateParts[0], 10);
  const remainingMonth = parseInt(remainingDateParts[1], 10);
  const remainingYear = parseInt(remainingDateParts[2], 10);

  // Bugünün tarihini al
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1; // JavaScript'te aylar 0'dan başlar
  const currentYear = today.getFullYear();

  // Kalan günleri hesapla
  let remainingDays = 0;

  if (
    remainingYear > currentYear ||
    (remainingYear === currentYear && remainingMonth > currentMonth) ||
    (remainingYear === currentYear &&
      remainingMonth === currentMonth &&
      remainingDay >= currentDay)
  ) {
    const remainingDate = new Date(
      remainingYear,
      remainingMonth - 1,
      remainingDay,
    ); // JavaScript'te aylar 0'dan başladığı için 1 çıkarıyoruz
    const differenceInTime = remainingDate.getTime() - today.getTime();
    remainingDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }
  return remainingDays > 0 ? `Son ${remainingDays} gün` : 'Expired';
};
